from pdbOutput import PdbOutput
import simplejson as json
from collections import OrderedDict



Banlocalview = [
        "debugger",
        "pydb",
        "exception_hook",
        "help'",
        "pm",
        "__all__",
        "__title__",
        "post_mortem",
        "run",
        "runcall",
        "runeval",
        "runl",
        "runv",
        "set_trace",
        "__package__",
        "__version__",
        "__doc__",
        "__file__",
        "old_handler",
        "__name__",
        "module",
        "__builtins__",
        "uncaught_exception",
        "BdbQuit",
        "help",
        "module",
        "class",
        "function",
        "__exception__",
        "__return__",
        "self"]

Banprintview =[
        "__return",
        "The program finished and will be restarted",
        "connect and created debugger : PID(1)",
        "parser_________",
        "--Call",
         "):",
         "Return from level"
               ]


FrameDict={}
objectDict={}
debuggingend=[0, ]

class PdbParser:
    def __init__(self, pdbConnector, pdbReader):
        print("parser_____________________-")
        self.pdbConnector = pdbConnector
        self.pdbReader = pdbReader
        
    def parseObjectAttributes(self, objectName):
        self.pdbConnector.execute("pp vars("+objectName+")")
        ret_value = self.pdbReader.getResult(PdbOutput.RESULT_RECORD)
        return ret_value.string

    
    def startParser(self, lines, command=""):
        return self.parseAnnotate(lines)
        
        
    def parseAnnotate(self, lines):
        
        localParserline = []
        objectParserline = []
        localsView =False
        stackView =False
        printView =True
        objectView = False
        printlist = []
        FrameList=[]
        stacklinelist =[]
        
        for line in lines:

            for ban in Banprintview:         
                if line.count(ban):
                    printView = False
            
            if printView == True:
                printlist.append(line[:-1])
                

            if line.count("stack"):
                stackView =True
                
        
            if stackView:
                stacklinelist.append(line)
               
                    
            if line.count("locals"):
                localsView=True
                stackView =False
                FrameList = self.stackParserVariable(stacklinelist)
                        
            linePrint = True
                    
            if localsView:
                for ban in Banlocalview:
                    if line.count(ban):
                        linePrint = False
                                    
                if linePrint:
                    localParserline.append(line)
                    
            if line.count("objects"):
                localsView = False
                objectView= True
                
            if objectView:
                if line != "objects":
                    objectParserline.append(line)
                
        self.localParserVariable(localParserline, FrameList)
        
        objectDict.clear()
        self.objectParserVariable(objectParserline)
        
        self.deleteFrameDict(FrameList)
            
        jsonDict = OrderedDict() 

        jsonDict['FrameDict']= FrameDict
        jsonDict['objDict'] = objectDict
        jsonDict['FrameList'] = FrameList
        jsonDict['printList'] = printlist
        data_string = json.dumps(jsonDict)
        
        print data_string
        
        if debuggingend[0] ==1:
            print 'The end'    
            
       
        
        
    def localParserVariable(self, parserLine,FrameList):
        FrameListinfoSplit= []
        FrameInfoList=[]
        Name = ''
        FileAddress =0
        LineNumber =0
        for parser in parserLine:
            if parser.count("11111222223333344444"):
                
                if Name !='' :
                    FrameDict[Name]=FrameInfoList[:]
                FrameInfoList =[]
                FrameListinfo = FrameList.pop(0)
                FrameListinfoSplit = FrameListinfo.split('@')
                Name = FrameListinfoSplit.pop(0)
                FileAddress = FrameListinfoSplit.pop(0)
                LineNumber = FrameListinfoSplit.pop(0)
                FrameInfoList.append(FileAddress)
                FrameInfoList.append(Name)
                FrameInfoList.append(LineNumber)
                FrameList.append(Name)
               

            NumChar = parser.find('=')
            if NumChar != -1:
                valueName = parser[:NumChar-1]
                value = parser[NumChar+2:-1]                   
                FrameInfoList.append(valueName)
                FrameInfoList.append(value)
            
        if Name !='' :
            FrameDict[Name]=FrameInfoList[:]
    
    def objectParserVariable(self, parserLine):
        
        for parser in parserLine:
            objAddress = parser[:parser.find('')]
            objName = parser[parser.find('')+1:parser.rfind("")]
            
            objValue = parser[parser.rfind("")+1:-1]
            
            if objAddress !='':
                objectDict[objAddress+""+objName] = objValue
                
    def stackParserVariable(self, parserLine):
        stackFrameList =[]
        for parser in parserLine:
            lineNumber = -1
            FileAddress = ''
            stackline =parser[:]
            stacklist =[]
            if parser.count("->"):
                stacklist =stackline.split()
                if stackline.count("instance at")==True:
                    FrameAdderess = stacklist[5][2:stacklist[5].find('>')]
                    FrameName = stacklist[2][stacklist[2].find('.')+1:]
                    FrameName = FrameAdderess +'' +FrameName
                else:
                    if stacklist[2] !='<module>':
                        FrameName = stacklist[2][:stacklist[2].find('(')]
                    else:
                        FrameName = stacklist[3]
                        if FrameName=='execfile()':
                            FrameName = 'execfile'
                        if FrameName =='execfile()->None':
                            debuggingend[0] =1
                lineNumber = stacklist[len(stacklist)-1]
                FileAddress = stacklist[len(stacklist)-4]
                Frameinfo = FrameName +'@' + FileAddress +'@'+lineNumber
                stackFrameList.append(Frameinfo)
                  
            if parser.count("##"):
                if (stackline.count("run(self")==False) and (stackline.count("exec()")==False) and (stackline.count("->None")==False):
                    stacklist = stackline.split()
                    if stackline.count("instance at"):
                        FrameAddress =  stacklist[5][2:stacklist[5].find('>')]
                        FrameName = stacklist[2][stacklist[2].find('.')+1:]
                        FrameName = FrameAddress + ""+FrameName
                    else:
                        if stacklist[2] !='<module>':
                            FrameName = stacklist[2][:stacklist[2].find('(')]
                        else:
                            FrameName = stacklist[3]
                            if FrameName=='execfile()':
                                FrameName = 'execfile'
                            if FrameName =='execfile()->None':
                                debuggingend[0] =1
                            
                    lineNumber = stacklist[len(stacklist)-1]
                    FileAddress = stacklist[len(stacklist)-4]
                    Frameinfo = FrameName +'@' + FileAddress +'@'+lineNumber
                    stackFrameList.append(Frameinfo)                         

        return stackFrameList
    
    def deleteFrameDict(self, FrameList):
        for key in FrameDict.keys():
            keycount =0
            for Framelist in FrameList:
                if Framelist ==key:
                    keycount = 1
            if keycount==0:
                if key.count("")==False:
                    del FrameDict[key]
            
