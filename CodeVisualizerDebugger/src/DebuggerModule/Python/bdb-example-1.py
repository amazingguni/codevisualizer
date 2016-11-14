import sys
import bdb


x=1

class abc:
    def __init__(self):
        self.c  = 3
        self.b = 5
        self.d = 3

def func(a):
    a=3
    b=4
    c=5
    d=6
    f= abc()

    return a+x

func(1)

def func2(a):
    x=2
    k=3
    p=2
    o=3
    func(1)
    
    for i in range(5):
        print(i)

    return a+x

func2(1)

x