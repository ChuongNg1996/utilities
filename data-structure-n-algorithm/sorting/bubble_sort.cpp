/*
Bubble Sort: O(n^2), in-place sorting (slow but save memory space), check pair of adjacent 
elements and swap if they are not in order. After final iteration, the data is sorted. Also, 
after an iteration, the first values may not correct but the final values (depend on which 
iteration) are 100% correct because essentially we are pushing the largest values to the last, 
not pushing the smallest value to the first (going to first to last). Thus, based of which 
iteration, we can omitted the obvious ordered last values.
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
    // ---------         Store the Sorted Data          --------- //
    // ---------------------------------------------------------- //

    int z = max;
    // - Number of sorting loop that need to be performed, stay CONSTANT -//
    for (int x = 0; x < max; x++)   
    {   
        //- Number of elements that need to be checked, decreased gradually -//
        //- The limit z - 1 needs to be accurate or else out-of-scope number,
        // 0 in this case, at the end, will be swapped with largest number
        // and we get redudant initial values.
        for (int y = 0; y < z-1; y++) 
        {
            if (storage[y] > storage[y+1]) swap(storage[y],storage[y+1]); 
        }

        //- With bubblesort, largest elements are set in their correct place after each loop
        // Hence, decrease the element to be checked after each iteration above to save time -//
        z--;    
    }

    // ---------------------------------------------------------- //
    // ---------         Store the Sorted Data          --------- //
    // ---------------------------------------------------------- //

    result.open ("bubble_sort_result.txt");
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