#include <iostream>
#include <fstream>
#include <random>

using namespace std;
/*
APRBS: 
    + At each timestep, input ranges from -A to +A, where A is amplitude.    
    + Since the frequency is defined in MATLAB, no need to define Frequency or Period of the data.
*/
int main () {
    
    // int frequency = 100;
    // double period = 0.001;

    /*
    To calculate num_datapoint, let's say:
        * In Simulink: we want Stop Time of X (seconds).
        * In Matlab: we want a period to be Y (seconds).
        -> Thus, the required data point (num_datapoint) is (or larger than): X/Y
    */

    // ------------- DATA GENERATION VARIABLES ------------- //
    const int num_datapoint = 100; 
    typedef double DataType;
    DataType amplitude = 0.5;
    //DataType datapoint;                                         // Store current data value
    DataType dataset[num_datapoint];
    
    int hold_period = 2;                                        // The minimal period (in terms of time step, not time) a "new" value is hold
    int hold_count = 0;                                         // Count the number of period that the value is hold

    // --------- RANDOM NUMBER GENERATION VARIABLES -------- //
    typedef double RandNumType;
    default_random_engine generator;
    uniform_real_distribution<RandNumType> distribution(-amplitude,amplitude);
    RandNumType number = 0;                                     // Random number

    // -------------- FILE MODIFIER VARIABLES -------------- //
    ofstream myfile;
    myfile.open ("aprbs_gen.txt");
    
    // ------------ INITIALIZE THE FIRST DATUM ------------- //
    // Gen random number
    number = distribution(generator);                           
    // Increase the count 
    hold_count++;
    // Write the datum to file
    myfile << number << "\n";

    // ----------- CONTINOUSLY WRITE DATA TO FILE ----------- //
    for (int i = 0; i< num_datapoint - 1; i++)
    {
        // If the hold is complete then write new value ... 
        if (hold_count >= hold_period)
        {
            // Reset the hold
            hold_count = 0;
            // Gen random number
            number = distribution(generator);
            // Increase the count 
            hold_count++;
        }
        // Else increase the hold count
        else hold_count++;
        // Write the datum to file
        myfile << number << "\n";
    }

    // ------------------- CLOSE THE FILE ----------------- //
    myfile.close();
    return 0;
}