import sys
import bdb

def spam():
    print 'in spam'
    c = A()
    b =A()
    egg()

def egg():
    print 'in egg'
    d=B()
    f=B()
    

def test(n):
    print 'in test'
    egg(n)
    print 'out test'
    
class A:
    def __init__(self):
        self.a = 10
        self.b = 3
        self.c = 3
        self.d = None
        
class B:
    def __init__(self):
        self.a = 4
        self.b = 5
        self.c = 7
        self.d = None
        
    
    
if __name__ == '__main__':
    a=1
    g = (A(), A())
    z = {A():1,1:A()}
    y = [A(), 1, A()]
    w = set([A(), 1, 3, B()])
    c = A()
    c.d = A()
    c.d.d = A()
    c.d.d.d = B()
    spam()
    c.a = 102
    c.b = 'dakdakdakd'
    print "->end"
        
