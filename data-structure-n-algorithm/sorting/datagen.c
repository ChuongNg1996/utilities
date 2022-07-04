#include <iostream>
#include <fstream>
#include <random>
using namespace std;
int main () {
    long loop;
    cout << "Number of elements: ";
    cin >> loop;
    long max = 100000;
    default_random_engine generator;
    uniform_int_distribution<int> distribution(0,max);
    ofstream myfile;
    myfile.open ("dataset.txt");
    for (int i = 0; i< loop; i++)
    {
        int number = distribution(generator);
        myfile << number << "\n";
    }
    myfile.close();
    return 0;
}

/*
File R/W: https://cplusplus.com/doc/tutorial/files/
Random Number Gen:  https://cplusplus.com/reference/random/uniform_int_distribution/
                    https://cplusplus.com/reference/cstdlib/rand/ 
                    https://stackoverflow.com/questions/37396278/how-to-generate-very-large-random-number-in-c 

User Input:         https://www.w3schools.com/cpp/cpp_user_input.asp 
*/