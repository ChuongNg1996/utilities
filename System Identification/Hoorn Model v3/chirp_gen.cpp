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


Chirp:
    + For a wave i, if t_i >= 2*PI/omega_i
    + Reset t_i = 0, scale down (or up) both omega_i and time_step.
    + Continue until maximum time is reached.

*/
int main () {
    
    // int frequency = 100;
    // double period = 0.001;

    typedef double DataType; 
    DataType omega = 5;
    DataType time = 0;
    DataType time_i = 0;
    DataType timestep = 0.01;
    DataType endtime = 10000;
    DataType phi = 0;
    DataType amplitude = 4;
    DataType datapoint = 0;
    DataType chirp_scale = 1.5;

    
    // -------------- FILE MODIFIER VARIABLES -------------- //
    ofstream myfile;
    myfile.open ("chirp_gen.txt");
    
    // ------------ INITIALIZE THE FIRST DATUM ------------- //

    while (time <= endtime)
    {
        time = time + timestep;
        time_i = time_i + timestep;
        if (time_i >= (2*PI/omega)) 
        {
            time_i = 0;
            omega = omega/chirp_scale;
            //timestep = timestep*chirp_scale;
            // omega = omega*chirp_scale;
            // timestep = timestep/chirp_scale;
            // cout<< omega << endl;
        }
        datapoint = amplitude*sin(omega*time_i+phi);
        //cout<< omega << endl;

        //datapoint = amplitude*datapoint;
        myfile << datapoint << "\n";
    }
    
    // ------------------- CLOSE THE FILE ----------------- //
    myfile.close();
    return 0;
}