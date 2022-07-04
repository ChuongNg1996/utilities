/*
...
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

    int interval = 0;
    int valueToInsert;
    int inner;

    /* calculate interval*/
    while (interval < max/3) interval = interval * 3 + 1;

    while (interval > 0)
    {
        /* Insertion Sort */
        for (int outer = 0; outer < max; outer++)
        {
            valueToInsert = storage[outer];
            inner = outer;

            /*shift element towards right*/
            while ((inner > interval -1) && (storage[inner - interval] >= valueToInsert))
            {
                swap(storage[inner],storage[inner - interval]);
                inner = inner - interval;
            }
        /* insert the number at hole position */
        storage[inner] = valueToInsert;

        }
        /* calculate interval*/
        interval = (interval -1)/3;	
    }



    // ---------------------------------------------------------- //
    // ---------         Store the Sorted Data          --------- //
    // ---------------------------------------------------------- //

    result.open ("shell_sort_result.txt");
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