/*
O(n log n), not-in-place sorting. Divide the data into atomic, then merge them to 
create many small arrays and eventually the full array, each small merged array 
need to be sorted. This sounds awful lot like Selection Sort with extra steps, then 
why is it faster? Because it embeds the merged array into a completely new space, 
no need to perform additional operations to move & replace the whole array, like 
Selection Sort. Thus it's downgrade is using more space.
*/
#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

vector<int> merge (vector<int> a, vector<int> b)
{

}


vector<int> mergesort (vector<int> a)
{

}


int main () {
    // ---------------------------------------------------------- //
    // ---------        File Variables                  --------- //
    // ---------------------------------------------------------- //
    ifstream indata; // indata is like cin
    ofstream result;
    int num; // variable for input value
    
    // ---------------------------------------------------------- //
    // ---------        Algorithm Variables             --------- //
    // ---------------------------------------------------------- //
    vector<int> storage;    // only C++
    int max = 0;

    // ---------------------------------------------------------- //
    // ---------         Open & Store Unsorted Data     --------- //
    // ---------------------------------------------------------- //
    indata.open("dataset.txt"); // opens the file
    if(!indata) { // file couldn't be opened
        cerr << "Error: file could not be opened" << endl;
        exit(1);
    }
    indata >> num;
    while ( !indata.eof() ) { // keep reading until end-of-file
        storage.push_back(num);
        max++;
        indata >> num; // sets EOF flag if no value found
    }
    indata.close();

    // ---------------------------------------------------------- //
    // ---------         Sort the Unsorted Data         --------- //
    // ---------------------------------------------------------- //

    int min_index;
    for (int i = 0; i < max - 1; i++)
    {  
        /* set current index as minimum*/
        min_index = i;

        /* check the index to be minimum */
        for (int j = i+1; j < max; j++)
        {
            if (storage[j] < storage[min_index]) swap(storage[j],storage[min_index]);
        }
    }
    // ---------------------------------------------------------- //
    // ---------         Store the Sorted Data          --------- //
    // ---------------------------------------------------------- //

    result.open ("selection_sort_result.txt");
    for (int i = 0; i < max; i++)
    {    
        result << storage[i] << "\n";
    }
    
    result.close();

    return 0;
}
/*
Read File:          https://www.bgsu.edu/arts-and-sciences/computer-science/cs-documentation/reading-data-from-files-using-c-plus-plus.html 
vector:             https://cplusplus.com/reference/vector/vector/ 
*/