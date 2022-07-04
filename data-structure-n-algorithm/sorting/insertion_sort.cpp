/*
O(n^2), in-place sorting (slow but save memory space), check pair of adjacent elements 
and swap if they are not in order. But instead of going forward, it goes backward if 
there is a swap. If there is not swap - natural order, it moves forward.
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

    int holePosition;
    int valueToInsert;
    for (int i = 0; i < max; i++)
    {  
        valueToInsert = storage[i];
        holePosition = i;
        while( (holePosition > 0) && (storage[holePosition - 1]) > valueToInsert)
        {
            swap(storage[holePosition],storage[holePosition - 1]);
            holePosition = holePosition - 1;
        }
        storage[holePosition] = valueToInsert;
    }
    // ---------------------------------------------------------- //
    // ---------         Store the Sorted Data          --------- //
    // ---------------------------------------------------------- //

    result.open ("insertion_sort_result.txt");
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