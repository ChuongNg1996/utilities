/*
Linear search: Every item is checked and if a match is found then that item is returned, 
otherwise the search continues till the end.
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
    int num; // variable for input value
    
    // ---------------------------------------------------------- //
    // ---------        Algorithm Variables             --------- //
    // ---------------------------------------------------------- //
    vector<int> storage;    // only C++
    int max = 0;
    int key;
    int index;
    bool found = 0;
    cout << "Number to search for: ";
    cin >> key;
    // ---------------------------------------------------------- //
    // ---------         Open & Store Unsorted Data     --------- //
    // ---------------------------------------------------------- //
    indata.open("sorted_dataset.txt"); // opens the file
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
    // ---------         Searching Algorrithm           --------- //
    // --------------------------------------------------------- //

    int lower = 0;
    int mid;
    int upper = max - 1;
    while (1)
    {
        if (upper < lower) 
        {
            break;
        }
        mid = lower + ((upper - lower)/(storage[upper]-storage[lower]))*(key - storage[lower]);
        if (storage[mid] < key) lower = mid + 1;
        else if (storage[mid] > key) upper = mid - 1;
        else 
        {
            index = mid;
            found = 1;
            break;
        }
    }


    if (found) cout << "Found " << key << " at location " << index << endl;
    else cout << key << " is not found" <<endl;

    system("pause");
    return 0;
}
/*
Read File:          https://www.bgsu.edu/arts-and-sciences/computer-science/cs-documentation/reading-data-from-files-using-c-plus-plus.html 
vector:             https://cplusplus.com/reference/vector/vector/ 
*/