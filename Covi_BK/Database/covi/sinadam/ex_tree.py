class TreeNode:
    def __init__(self, data, right=None,left=None):
        self.data = data
        self.right = right
        self.left = left

def AddLeftNode(a, b):
    a.left = b

def AddRightNode(a,b):
    a.right = b
    

n1 = TreeNode(3)
n2 = TreeNode(4)
n3 = TreeNode(9)
n4 = TreeNode(5)
n5 = TreeNode(6)
n6 = TreeNode(7)
n7 = TreeNode(8)
    
AddLeftNode(n1, n2)
AddRightNode(n1,n3)
AddLeftNode(n2, n4)
AddRightNode(n2,n5)
AddLeftNode(n3, n6)
AddRightNode(n3,n7)
    

