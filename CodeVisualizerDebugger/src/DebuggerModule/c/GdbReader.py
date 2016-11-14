from PyQt4.QtCore import QThread, QMutex, QSemaphore, pyqtSignal
from collections import deque

from GdbParser import GdbParser
from collections import deque

import sys

class GdbReader(QThread):
    #asyncRecordReceived = pyqtSignal('PyQt_PyObject')
    #consoleRecordReceived = pyqtSignal('PyQt_PyObject')
    
    def __init__(self, GdbConnector):
        QThread.__init__(self)
        
        self.resultRecordQueue=deque()
        self.resultRecordMutex = QMutex()
        self.resultRecordSem = QSemaphore(0)
      
        self.resultConsoleQueue=deque()
        self.resultConsoleMutex = QMutex()
        self.resultConsoleSem = QSemaphore(0)
          
        self.parser = GdbParser(GdbConnector, self)
        self.GdbConnector = GdbConnector
        
    def startReading(self, stdout, stdin):
        self.stdout = stdout
        self.stdin = stdin
        self.start()
        
    def run(self):
        self.listener()
        
    def listener(self):
        lines = []
        while True:
            line = self.stdout.readline()
            if line.startswith("(gdb)"):
                self.stdout.flush()
                self.parser.startParser(lines, self.stdin)
                lines = []
                
            else:
                lines.append(line)
            

     