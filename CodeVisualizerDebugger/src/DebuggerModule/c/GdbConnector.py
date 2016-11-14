import subprocess
import logging
from GdbReader import GdbReader
import sys


class GdbConnector:
    def __init__(self):
        self.Gdb = None
        self.reader = GdbReader(self)
        
        
    def start(self, command):          
        try:
            self.Gdb = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
            
        except OSError as e:
            logging.critical("Could not start pdb. Error Message: %s", e)
        self.reader.startReading(self.Gdb.stdout , self.Gdb.stdin)
        
    def execute(self, cmd, error_msg=None):
        logging.debug("Running command %s", cmd)
        if cmd == 's\n':
            
            self.Gdb.stdin.write(cmd+'\n')
            self.Gdb.stdin.write('info stack\n')
            self.getLocals()
        
        elif cmd == 'c\n':
            
            self.Gdb.stdin.write(cmd+'\n')
            self.Gdb.stdin.write('info stack\n')
            self.getLocals()
        
        elif cmd == 'n\n':
            
            self.Gdb.stdin.write(cmd+'\n')
            self.Gdb.stdin.write('info stack\n')
            self.getLocals()
                                    
        else:
            self.Gdb.stdin.write(cmd+'\n')
    
    def executeAndRaiseIfFailed(self, cmd, error_msg=None):
        res = self.execute(cmd, error_msg)
        
        return res
    
    def openFile(self, filename):
        self.executeAndRaiseIfFailed("-file-exec-and-symbols " + filename, \
                "Could not open file!")
        
    def mainBreakpoint(self):
        self.executeAndRaiseIfFailed("-break-insert main", \
                "Could not create breakpoint .")
    def run(self):
        return self.executeAndRaiseIfFailed("-exec-run", \
                "Could not run the program.")
        
    def getLocals(self):
        self.executeAndRaiseIfFailed("-stack-list-variables --all-values")

    def step(self):
        return self.executeAndRaiseIfFailed("-exec-step")
        

