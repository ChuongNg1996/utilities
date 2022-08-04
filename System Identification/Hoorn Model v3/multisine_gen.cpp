#include <iostream>
#include <fstream>
#include <random>

#define PI 3.14159265

using namespace std;
/*
Multisine: 
    u(t) = SUM(A_i*sin(omega_i*t + phi_i))
    + Typically the amplitudes A_i are selected identically.
    + frequencies are chosen as multiples of a fundamental frequency omega_i = omega_0 * i,  i = 1,..., s.
    + ... achieved by a clever combination of the phases phi_i so that the sine waves are as much out of phase as possible, e.g., so-called Schroeder phases

    // + Since the frequency is defined in MATLAB, no need to define Frequency or Period of the data.
*/
int main () {
    
    // int frequency = 100;
    // double period = 0.001;

    typedef double DataType; 
    DataType omega_0 = 0.1;
    DataType time = 0;
    DataType timestep = 0.01;
    DataType endtime = 100;
    DataType phi = 0;
    DataType amplitude = 4;
    DataType datapoint = 0;

    const int wave_component_num = 7;
    int frequency_multiplier [wave_component_num] = {1,3,5,7,9,4,6};
    DataType phi_array[wave_component_num];
    DataType phi_step = 2*PI / wave_component_num;

    for (auto i = 0; i < wave_component_num; i++)
    {
        phi_array[i] = phi;
        phi = phi + phi_step;
    }
    
    // -------------- FILE MODIFIER VARIABLES -------------- //
    ofstream myfile;
    myfile.open ("multisine_gen.txt");
    
    // ------------ INITIALIZE THE FIRST DATUM ------------- //

    while (time <= endtime)
    {
        time = time + timestep;
        datapoint = 0;
        for (auto i = 0; i < wave_component_num; i++)
        {
            datapoint = datapoint + sin(omega_0*frequency_multiplier[i]*time +  phi_array[i]);
        }
        datapoint = amplitude*datapoint;
        myfile << datapoint << "\n";
    }
    
    // ------------------- CLOSE THE FILE ----------------- //
    myfile.close();
    return 0;
}