/*
...
*/
#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

int partitionFunc (int left,int right, int pivot, vector<int>& data)
{
    int leftPointer = left;
    int rightPointer = right - 1;
    while (1)
    {
        while (data[++leftPointer] < pivot);
        while ((rightPointer > 0) && (data[--rightPointer] > pivot));
        if (leftPointer >= rightPointer) break;
        else swap(data[leftPointer],data[rightPointer]);
    }
    leftPointer = right;
    return leftPointer;
}

void quickSort(int left, int right, vector<int>& data)
{
    if (right - left <= 0) return;
    else
    {
        int pivot = data[right];
        int partition = partitionFunc (left,right,pivot,data);
        quickSort(left,partition-1,data);
        quickSort(partition+1,right,data); 
    }
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

    quickSort(0,max-1,storage);

    // ---------------------------------------------------------- //
    // ---------         Store the Sorted Data          --------- //
    // ---------------------------------------------------------- //

    result.open ("quick_sort_result.txt");
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