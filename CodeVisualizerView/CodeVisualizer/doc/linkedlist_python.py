class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

def init_list():
    global node1
    node1 = Node(1)


def delete_node(del_data):
    global node1
    pre_node = node1
    next_node = pre_node.next

    if pre_node.data == del_data:
        node1 = next_node
        del pre_node
        return
    
    while next_node:
        if next_node.data == del_data:
            pre_node.next = next_node.next
            del next_node
            break
        pre_node = next_node
        next_node = next_node.next
 
def insert_node(ins_data):
    global node1
    new_node = Node(ins_data)
    new_node.next = node1
    node1 = new_node
 
def print_list():
    global node1
    node = node1
    while node:
        print node.data,
        node = node.next
    print
 
def Main():
    init_list()
    insert_node("new")
    insert_node("new1")

Main()
