
import subprocess
from DebuggerModule.Python.PdbConnector import PdbConnector
import sys
from DebuggerModule.c.GdbConnector import GdbConnector


def main(pidNum, userID, Projectfile):
    CorPython = 'python';
    
    if CorPython=='python':
    
        print "connect and create debugger : PID("+str(pidNum)+"), ID("+userID+")"
        DebuggerModule = "/home/ssm/Documents/AptanaWorkspace/CodeVisualizerDebugger/src/DebuggerModule/Python/pydb/pydb.py"
        #Projectfile = "/home/ssm/Documents/AptanaWorkspace/CodeVisualizerDebugger/src/ExampleCode/Python/bdb-example-1.py"

        Debugger = PdbConnector()
        Debugger.start(["python", DebuggerModule, Projectfile])
        Debugger.execute("set annotate 3\n")
        Debugger.execute("s\n")
        #
        while True:  
            command = sys.stdin.readline()
            Debugger.execute(command)
            
    else:
        
        #print "connect and create debugger : PID(1), ID(nygzzang)"
        makefile = "/home/junbum/helloworld"
        Projectfile =  "/home/junbum/helloworld.c"
        Cdebugger = GdbConnector()
        Cdebugger.start(["gdb",'-g', makefile, '-o' , Projectfile])
   
        #
        while True:
            command = sys.stdin.readline()
            Cdebugger.execute(command)
            #sys.exit(0);
            
if __name__ == "__main__":
    """pidNum = sys.stdin.readline();
    pidNum =pidNum[:-1]
    userID = sys.stdin.readline();
    userID =userID[:-1]
    Projectfile = sys.stdin.readline();
    Projectfile =Projectfile[:-1]"""
    pidNum='l'
    Projectfile ='2'
    userID='u'
    main(pidNum, userID, Projectfile)
    