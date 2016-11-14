import sys
import bdb

def spam():
    print 'in spam'
    a=3
    b=4
    c=6
    d=A()
    e=4
    
class A:
    def __init__(self):
        self.a = 10
        self.b = 3
        self.c = 3
        self.d = None
        
    
if __name__ == '__main__':
    a=5
    b=6
    c=3
    spam()
    print "->end"
        
