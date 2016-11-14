
import simplejson as json
from collections import OrderedDict
import sys

compareStackNumber =0

nameandvaluelist =[]
localvalue=[]
FrameDict ={}
stacklist=[]
Framelist =[]
Frameinfolist=[]
FrameValueDict={}
objDict={}


class GdbParser:
    def __init__(self, GdbConnector, GdbReader):
        print("parser_____________________-")
        self.GdbConnector = GdbConnector
        self.GdbReader = GdbReader

    def startParser(self, lines, command=""):
        
        return self.parseAnnotate(lines)
         
    
    def parseAnnotate(self, lines):
        global compareStackNumber
        
        stackview =False
        ptypeview =False
        printview =False
        
        ptypeValueName ='' 
        ptypeValueType =''
        ptypeAddress =''

        for line in lines:
            
            sys.stdout.flush()
            if line.count('&"info stack'):
                stackview =True
            
            if stackview==True:
                
                if line.count('~"#'):
                    stackNumber = line[line.find('~"#')+3:line.find('~"#')+4]
                    if stackNumber =='0':
                        stackname = line[line.find('~"#0')+6:line.find('(')-1]
                    else:
                        stackname = line[line.find(' in ')+4:line.find('(')-1]
                    
                    filename = line[line.find(') at ')+6:line.find('.c:')+2]
                    linenumber = line[line.find('.c:')+3:line.find('\\n"\n')]
                    
                    compareStackNumber= int(stackNumber)
                    
                    Framelist.append(stackname)
                    
                    Frameinfolist.append(filename)
                    Frameinfolist.append(stackname)
                    Frameinfolist.append(linenumber)
                    
            if line.count('variables=['):
                
                count = line.count('name="')
                k=1
                valuelist =[]
                if line.count('name="') ==False:
                    
                    if compareStackNumber != 0:
                        self.GdbConnector.execute("hyojincode")
                        self.GdbConnector.execute("up 1")
                        self.GdbConnector.execute("-stack-list-variables --all-values")
                        compareStackNumber = compareStackNumber-1
                    else:
                        self.GdbConnector.execute("junbumcode")
                else:
                    for n in range(count):
                        if count-1 ==n:
                            valuelist.append(line[line.find('name', k):line.find('}]', k)])
                            k = line.find('},',k) + 1
                        else:
                            valuelist.append(line[line.find('name', k):line.find('},', k)])
                            k = line.find('},',k) + 1
                         
                    for valueline in valuelist:
                        valuelineName= valueline[valueline.find('name="')+6:valueline.find('",value="')]
                        valuelineValue = valueline[valueline.find(',value="')+8:-1]
                        self.GdbConnector.execute("ptype "+valuelineName)
                        self.GdbConnector.execute("print &"+valuelineName)
                        FrameValueDict[valuelineName] = valuelineValue         
                    
                 
                    if compareStackNumber != 0:
                        self.GdbConnector.execute("hyojincode")
                        self.GdbConnector.execute("up 1")
                        self.GdbConnector.execute("-stack-list-variables --all-values")
                        compareStackNumber = compareStackNumber -1
                    else:
                        self.GdbConnector.execute("junbumcode")
                    
            if line.count('&"ptype'):
                ptypeview = True
                ptypeValueName=''
                ptypeValueType=''
              
            if ptypeview==True:
                if line.count('&"ptype'):
                    ptypeValueName = line[line.find('&"ptype')+8:line.find('\n"')-3]
                if line.count('~"type'):
                    ptypeValueType = line[line.find(' = ')+3:line.find("\\")]
                    if ptypeValueType.count('struct'):
                        ptypeValueType = ptypeValueType[:-2]
                    else:
                        ptyValue = FrameValueDict.get(ptypeValueName)
                        localvalue.append(ptypeValueName)
                        localvalue.append(ptypeValueType)
                        localvalue.append(ptyValue)
                        #FrameValueDict[ptypeValueName] = ptypeValueType + '' + ptyValue
            
            if line.count('&"print'):
                printview =True
                    
            if printview==True:
                if line.count('&"print'):
                    ptypeValueName = line[line.find('&"print &')+9:line.find('\\n')]
                if line.count('struct'):
                    ptypeAddress = line[line.find('*)')+2:line.find('\\n')]
                    ptypeStructName = line[line.find('struct')+7:line.find('*)')-1]
                    ptyValue = FrameValueDict.get(ptypeValueName)
                    localvalue.append(ptypeValueName)
                    localvalue.append('struct')
                    localvalue.append("<__main__."+ptypeStructName+" instance at " +ptypeAddress+">")
                    #FrameValueDict[ptypeValueName] = 'struct'+"<__main__."+ptypeStructName+" instance at " +ptypeAddress+">"
                    ptypeStructName = ptypeAddress[3:]+''+ptypeStructName
                    
                    objDict[ptypeStructName] = ptyValue  
                    
            if line.count('error') and line.count('hyojincode'):
                
                FileName = Frameinfolist.pop(0)
                FrameName = Frameinfolist.pop(0)
                lineNumber = Frameinfolist.pop(0)
                
                infoFrame =[]
                infoFrame.append(FileName)
                infoFrame.append(FrameName)
                infoFrame.append(lineNumber)
                
                for local in localvalue:
                    infoFrame.append(local)
                    
                FrameDict[FrameName]  = infoFrame[:]
                localvalue[:] =[]
                
            if line.count('error') and line.count('junbumcode'):
            
              
                FileName = Frameinfolist.pop(0)
                FrameName = Frameinfolist.pop(0)
                lineNumber = Frameinfolist.pop(0)
                
                infoFrame =[]
                printlist=[]
                infoFrame.append(FileName)
                infoFrame.append(FrameName)
                infoFrame.append(lineNumber)
   
                
                for local in localvalue:
                    infoFrame.append(local)
                
                FrameDict[FrameName]  = infoFrame[:]                 
                    
                jsonDict = OrderedDict() 

                jsonDict['FrameDict']= FrameDict
                jsonDict['objDict'] = objDict
                jsonDict['FrameList'] = Framelist
                jsonDict['printList'] = printlist
                data_string = json.dumps(jsonDict)
                
                Frameinfolist[:] =[]
                localvalue[:] =[]
                
                Framelist[:] =[] 
                objDict.clear() 
                FrameDict.clear()
                
                print data_string 
                sys.stdout.flush()