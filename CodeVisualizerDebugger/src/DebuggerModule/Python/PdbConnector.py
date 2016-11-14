import subprocess
import logging
from PdbReader import PdbReader
from pdbOutput import PdbOutput

class PdbConnector:
    def __init__(self):
        self.pdb = None
        self.reader = PdbReader(self)
        
    def start(self, command):
        try:
            self.pdb = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
        except OSError as e:
            logging.critical("Could not start pdb. Error Message: %s", e)
        self.reader.startReading(self.pdb.stdout)
        
    def execute(self, cmd, error_msg=None):
        logging.debug("Running command %s", cmd)
        self.pdb.stdin.write(cmd)
     