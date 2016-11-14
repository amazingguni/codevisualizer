from DebuggerModule.c.GdbConnector import GdbConnector
from DebuggerModule.Python.PdbConnector import PdbConnector
import sys
import subprocess
import time


def main(pidNum, userID, Projectfile):
    
    CorPython = "python.py"
    
    if CorPython.count('.py'):
        
        print "connect and create debugger : PID("+str(pidNum)+"), ID("+userID+")"

        
        DebuggerModule = "../CodeVisualizerDebugger/src/DebuggerModule/Python/pydb/pydb.py"
        
        #Projectfile = "/home/ssm/Documents/AptanaWorkspace/CodeVisualizerDebugger/src/ExampleCode/Python/bdb-example-1.py"
        Debugger = PdbConnector()
        Debugger.start(["python", DebuggerModule, Projectfile])
        Debugger.execute("set annotate 3\n")
        
        #
        while True:  
            command = sys.stdin.readline()
            Debugger.execute(command)
            
    elif CorPython.count('.c'):
        
        Debugger = GdbConnector()
        exfile =Projectfile[:-2]
                
        subprocess.Popen(['gcc','-o',exfile,'-g', Projectfile], stdin=subprocess.PIPE, stdout=subprocess.PIPE)
        time.sleep(0.5)
        Debugger.start(['gdb', '-i', 'mi', '-q'])
        Debugger.openFile(exfile)
        Debugger.mainBreakpoint()
        Debugger.run()
        Debugger.execute("set annotate 1")
       
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
    