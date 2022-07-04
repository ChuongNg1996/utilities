/*
O(n^2), in-place sorting (slow but save memory space). Firstly, find the smallest element 
in the unsorted data, swap it with the first element (on the left). Next,find the smallest 
element in the unsorted data, swap it with the element next to the first element and so 
on. Can do the same with largest and to the right?
*/
#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

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