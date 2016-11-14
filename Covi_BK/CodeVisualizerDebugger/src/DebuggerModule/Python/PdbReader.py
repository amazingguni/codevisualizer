from PyQt4.QtCore import QThread, QMutex, QSemaphore, pyqtSignal
from collections import deque

from .pdbOutput import PdbOutput
from PdbParser import PdbParser
from collections import deque
import sys

class PdbReader(QThread):
    #asyncRecordReceived = pyqtSignal('PyQt_PyObject')
    #consoleRecordReceived = pyqtSignal('PyQt_PyObject')
    
    def __init__(self, pdbConnector):
        QThread.__init__(self)
        
        self.resultRecordQueue=deque()
        self.resultRecordMutex = QMutex()
        self.resultRecordSem = QSemaphore(0)
      
        self.resultConsoleQueue=deque()
        self.resultConsoleMutex = QMutex()
        self.resultConsoleSem = QSemaphore(0)
          
        self.parser = PdbParser(pdbConnector, self)
        self.pdbConnector = pdbConnector
        
    def startReading(self, stdout, pdb):
        self.stdout = stdout
        self.pdb = pdb
        self.start()
        
    def run(self):
        self.listener()
        
    def listener(self):
        lines = []
        while True:
            line = self.stdout.readline()
            sys.stdout.flush()
            if line.startswith("(Pydb)"):
                self.parser.startParser(lines, self.pdb)
                lines = []
                
            else:
                lines.append(line)
"""               
    def forwardResult(self, res):
        ""Forwards the result from the pydb output according to its type""
        type_ = res.type_
        if type_ == PdbOutput.RESULT_RECORD:
            self.enqueueResult(res)
        elif type_ == PdbOutput.CONSOLE_STREAM or \
             type_ == PdbOutput.TARGET_STREAM or \
             type_ == PdbOutput.LOG_STREAM:
            self.enqueueConsole(res)
        ""else:
            raise helpers.excep.GdbError("Illegal type_!")""
        
    def enqueueResult(self, result):
        type_=result.type_
        assert(type_ == PdbOutput.RESULT_RECORD)
        q = self.resultRecordQueue
        m = self.resultRecordMutex
        s = self.resultRecordSem

        m.lock()
        q.append(result)
        m.unlock()
        s.release()
        
        self.resultRecordQueue.append(result)
                
    def getResult(self, type_):
        assert(type_ == PdbOutput.RESULT_RECORD)
        q = self.resultRecordQueue
        m = self.resultRecordMutex
        s = self.resultRecordSem

        s.acquire()
        m.lock()
        res = q.popleft()
        m.unlock()
        return res
    
    def enqueueConsole(self, result):
        type_=result.type_
        assert(type_ == PdbOutput.CONSOLE_STREAM)
        q = self.resultConsoleQueue
        m = self.resultConsoleMutex
        s = self.resultConsoleSem

        m.lock()
        q.append(result)
        m.unlock()
        s.release()
        
        self.resultConsoleQueue.append(result)
                
    def getConsole(self, type_):
        assert(type_ == PdbOutput.CONSOLE_STREAM)
        q = self.resultConsoleQueue
        m = self.resultConsoleMutex
        s = self.resultConsoleSem

        s.acquire()
        m.lock()
        res = q.popleft()
        m.unlock()
        return res
 """    