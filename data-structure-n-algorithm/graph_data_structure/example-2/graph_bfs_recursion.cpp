// A simple representation of graph using STL
#include <bits/stdc++.h>
#include <stack> 
using namespace std;
 

/*
0 <-> 1,2,3,4
1 <-> 0,5
2 <-> 0,5
3 <-> 0,6
4 <-> 0,6,7
5 <-> 1,2,6,7
6 <-> 3,4,5,7
7 <-> 5,6
*/ 
// A utility function to add an edge in an
// undirected graph.
void addEdge(vector<int> adj[], int u, int v)
{
    adj[u].push_back(v); // Append edge to node v on vertex u
    adj[v].push_back(u); // Append edge to node u on vertex v
}
 
// A utility function to print the adjacency list
// representation of graph
void printGraph(vector<int> adj[], int V)
{
    for (int v = 0; v < V; ++v) {
        cout << "\n Adjacency list of vertex " << v
             << "\n head ";
        for (auto x : adj[v])
            cout << "-> " << x;
        printf("\n");
    }
}

/*
Depth First Tranversal
* At adj[0] -> visited -> Add to visited node
* adj[n] has at least one adj node? Check a visited list/array
    -> YES,
        -> Check visited for all adj nodes: move to first/last node (preference)
*/

vector<int> visitedNode;        // Store seen/adj nodes of the current node
vector<int> exploredNode;       // Store current nodes. 
void dft(vector<int> adj[], int V, int i)
{
    visitedNode.push_back(i);
    exploredNode.push_back(i);
    for (auto x : adj[i])
    {
        // If checked adj nodes is unvisited,
        if (!(find(visitedNode.begin(), visitedNode.end(), x) != visitedNode.end()))
        {
            visitedNode.push_back(x);
        }
    }
    for (auto x : visitedNode)
    {
        if (!(find(exploredNode.begin(), exploredNode.end(), x) != exploredNode.end()))
        {
            dft(adj,V,x);
        }
    }

}

// Driver code
int main()
{
    int V = 8;
    vector<int> adj[V]; // Decide size first or else no memory is allocated to append egde and vertex

    // Node 0
    addEdge(adj, 0, 1);
    addEdge(adj, 0, 2);
    addEdge(adj, 0, 3);
    addEdge(adj, 0, 4);

    // Node 1
    addEdge(adj, 1, 5);

    // Node 2
    addEdge(adj, 2, 5);

    // Node 3
    addEdge(adj, 3, 6);

    // Node 4
    addEdge(adj, 4, 6);
    addEdge(adj, 4, 7);

    // Node 5
    addEdge(adj, 5, 6);
    addEdge(adj, 5, 7);

    // Node 6
    addEdge(adj, 6, 7);

    printGraph(adj, V);
    dft(adj,V,0);
    cout << "\nSequence of visiting nodes: ";
    for (auto x : exploredNode) cout << " " << x;
    cout << "Check the sequence if it fits bfs\n";
    system("pause");
    return 0;
}

/*
Source:             https://www.geeksforgeeks.org/graph-and-its-representations/ 
Stack:              https://www.geeksforgeeks.org/stack-in-cpp-stl/ 
Search in vector:   https://www.techiedelight.com/check-vector-contains-given-element-cpp/

When to use recursive? 
* A repetitive problem with unconstant/varied parameters. In other words, repetitive task but 
the parameter changes.
* You are not sure when it ends.
* You treat the solution at each node like its own function
* Other method like While Loop is complicated to write, especially if there are "step backs" on the tree
*/
