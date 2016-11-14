#include <malloc.h>
#include <stdio.h>


struct day{

    int phone_num;
    int mom;		
};

struct node{
	int data;
	struct node *next;
};

void addNode(struct node* parent, int _data){
	struct node* temp = (struct node*)malloc(sizeof(struct node));
	temp->data = _data;
	struct node* parent_copy = parent;
	while(parent_copy->next !=NULL){	
		parent_copy=parent_copy->next;	
	}
	parent_copy->next = temp;
}


void printNodes(struct node* parent){
	struct node* parent_copy = parent;
	printf("print start\n");
	while(parent_copy != NULL){
		printf("%d ", parent_copy->data);
		parent_copy = parent_copy->next;	
	}
	printf("print end\n");
}


void function1()
{
    printf("Hello World...Function1\n");
    int d=5;
    int c=7;
}
 
void function2()
{
    printf("Hello Wolrd...Function2\n");
    function1();
}
 
int main() 
{
    struct node *linkedlist = (struct node*)malloc(sizeof(struct node));
    linkedlist->data = -1;
    int i = 0;
    for(i = 0 ; i!= 5; i++){
        addNode(linkedlist, i);
    }
    printNodes(linkedlist);
    int a =3;
    int b =22;
    char d[20] ="gdgdd";
    struct day *student1 = (struct day*)malloc(sizeof(struct day));
    //student1->phone_num =7;			
    function1();
    function2();
    return 0;
}
