
from DebuggerModule.Python.PdbConnector import PdbConnector
import sys

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
        DebuggerModule = "./DebuggerModule/Python/pydb/pydb.py"
        Projectfile = "./ExampleCode/Python/bdb-example-1.py"
        Debugger = PdbConnector()
        Debugger.start(["python",DebuggerModule, Projectfile])
   
        #
        while True:
            command = sys.stdin.readline()
            Debugger.execute(command)
            #sys.exit(0);
            
if __name__ == "__main__":
    #pidNum = (int)(sys.argv[1]);
    #userID = (sys.argv[2]);
    pidNum = 5;
    userID = 'test';
    Projectfile = (sys.argv[1]);
    main(pidNum, userID, Projectfile)
    