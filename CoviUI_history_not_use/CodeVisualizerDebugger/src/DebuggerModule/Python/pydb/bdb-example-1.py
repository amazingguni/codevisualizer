import sys
import bdb

def spam(n):
    print 'in spam'
    j = 0

    for i in range(n):
        j = j+i
    return n

def egg(n):
    print 'in egg'
    spam(n)
    spam(n)
    spam(n)
    spam(n)
    

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
        
        
    
    
if __name__ == '__main__':
    spam(1)
    a=1
    g = (A(), A())
    z = {A():1,1:A()}
    y = [A(), 1, A()]
    w = set([A(), 1, 3, A()])
    c = A()
    c.d = A()
    c.d.d = A()
    c.d.d.d = A()
    spam(2)
    c.a = 102
    c.b = 'dakdakdakd'
    print "->end"
        