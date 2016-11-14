# -*- encoding: utf-8 -*-

import sys

def stdout(a):
  sys.stdout.write(str(a) + " ")

def fib(n):
  if n == 0:
    return 0
  elif n == 1:
    return 1
  else:
    a = fib(n-1)
    stdout(a)
    b = fib(n-2)
    stdout(b)
    return a + b

if __name__ == "__main__":
  a = (int)(sys.argv[1])
  stdout(fib(a))
  sys.exit(0)