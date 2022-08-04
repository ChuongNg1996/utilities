%% Utilities 
%{
Timetable: https://www.mathworks.com/help/matlab/matlab_prog/create-timetables.html
Path: C:\Work(Lite)\OneDrive_1_3-8-2022\MATLAB\System Identification\Hoorn Model v3
%}

ts_common = 1;

%% PRBS (Pseudorandom binary sequence input signal)
ts_prbs = ts_common;
prbs_input_ts = timetable(prbsgen,'SampleRate', ts_prbs); 
figure(1)
plot(prbsgen);

%% APRBS (amplitude modulated Pseudorandom binary sequence input signal)
ts_aprbs = ts_common;
aprbs_input_ts = timetable(aprbsgen,'SampleRate', ts_aprbs); 
figure(2)
plot(aprbsgen);

%% Multisine
ts_multisine = ts_common;
multisineinput_ts = timetable(multisinegen,'SampleRate', ts_multisine); 
figure(3)
plot(multisinegen);

%% Chirp
ts_chirp = ts_common;
chirpinput_ts = timetable(chirpgen,'SampleRate', ts_chirp); 
figure(4)
plot(chirpgen);