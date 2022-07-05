
#include <stdio.h>
#include <stdlib.h>
 
// Define the maximum number of vertices in the graph
#define N 6
 
// Data structure to store a graph object
struct Graph
{
    // An array of pointers to Node to represent an adjacency list
    struct Node* head[N];
};
 
// Data structure to store adjacency list nodes of the graph
struct Node
{
    int dest, weight;
    struct Node* next;
};
 
// Data structure to store a graph edge
struct Edge {
    int src, dest, weight;
};
 
// Function to create an adjacency list from specified edges
struct Graph* createGraph(struct Edge edges[], int n)
{
    // allocate storage for the graph data structure
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
 
    // initialize head pointer for all vertices
    for (int i = 0; i < N; i++) {
        graph->head[i] = NULL;
    }
 
    // add edges to the directed graph one by one
    for (int i = 0; i < n; i++)
    {
        // get the source and destination vertex
        int src = edges[i].src;
        int dest = edges[i].dest;
        int weight = edges[i].weight;
 
        // allocate a new node of adjacency list from src to dest
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->dest = dest;
        newNode->weight = weight;
 
        // point new node to the current head
        newNode->next = graph->head[src];
 
        // point head pointer to the new node
        graph->head[src] = newNode;
    }
 
    return graph;
}
 
// Function to print adjacency list representation of a graph
void printGraph(struct Graph* graph)
{
    for (int i = 0; i < N; i++)
    {
        // print current vertex and all its neighbors
        struct Node* ptr = graph->head[i];
        while (ptr != NULL)
        {
            printf("%d —> %d (%d)\t", i, ptr->dest, ptr->weight);
            ptr = ptr->next;
        }
 
        printf("\n");
    }
}
 
// Weighted Directed graph implementation in C
int main(void)
{
    // input array containing edges of the graph (as per the above diagram)
    // (x, y, w) tuple represents an edge from x to y having weight `w`
    struct Edge edges[] =
    {
        {0, 1, 6}, {1, 2, 7}, {2, 0, 5}, {2, 1, 4}, {3, 2, 10}, {4, 5, 1}, {5, 4, 3}
    };
 
    // calculate the total number of edges
    int n = sizeof(edges)/sizeof(edges[0]);
 
    // construct a graph from the given edges
    struct Graph *graph = createGraph(edges, n);
 
    // Function to print adjacency list representation of a graph
    printGraph(graph);
    system("pause");
    return 0;
}

/*
Source:         https://www.techiedelight.com/implement-graph-data-structure-c/ 

*/