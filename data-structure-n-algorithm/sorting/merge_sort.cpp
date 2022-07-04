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
    vector<int> c;
    // cout << "a size: " << a.size() << "\n";
    // cout << "b size: " << b.size() << "\n";
    while ((a.size() > 0) && (b.size() > 0))
    {
        if (a.front() > b.front())
        {
            c.push_back(b.front());
            b.erase(b.begin());
        }
        else
        {
            c.push_back(a.front());
            a.erase(a.begin());
        }
    }
    while (a.size() > 0)
    {
        c.push_back(a.front());
        a.erase(a.begin());
    }
    while (b.size() > 0)
    {
        c.push_back(b.front());
        b.erase(b.begin());
    }

    // for (int i = 0; i < a.size() ; i++) cout << "a: " << a[i] << "\n";
    // for (int i = 0; i < b.size() ; i++) cout << "b: " << b[i] << "\n";
    // for (int i = 0; i < c.size() ; i++) cout << "c: "<< c[i] << "\n";

    return c;
}


vector<int> mergesort (vector<int> a)
{
    if(a.size() == 1) return a;
    else
    {
        int n;
        vector<int> l1;
        vector<int> l2;
        n = a.size()/2;
        l1.assign(a.begin(),a.begin()+n);
        l2.assign(a.begin()+n,a.end());
        l1 = mergesort(l1);
        l2 = mergesort(l2);
        return merge(l1,l2);
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

    storage = mergesort(storage);

    // ---------------------------------------------------------- //
    // ---------         Store the Sorted Data          --------- //
    // ---------------------------------------------------------- //

    result.open ("merge_sort_result.txt");
    for (int i = 0; i < max; i++)
    {    
        result << storage[i] << "\n";
    }
    
    result.close();

    //system("pause");
    return 0;
}
/*
Read File:          https://www.bgsu.edu/arts-and-sciences/computer-science/cs-documentation/reading-data-from-files-using-c-plus-plus.html 
vector:             https://cplusplus.com/reference/vector/vector/ 
*/