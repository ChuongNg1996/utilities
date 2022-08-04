%% Utilities 
%{
Generate time-domain data for input signal: 
https://www.mathworks.com/help/slcontrol/ug/generatetimeseries.html


%}



%% PRBS (Pseudorandom binary sequence input signal)
% PRBS Link: https://www.mathworks.com/help/slcontrol/ug/frest.prbs.html 

% Generate PRBS from frest.PRBS object (which is not usable for Simulink's 
% FromWorkspace block)
% The Time Duration MUST MATCH with Stop Time in Simulink, else the data
% automatically go to infinity.
% The Sampling Time of Simulink MUST BE EQUAL OR HIGHER so that correct 
% input is captured.
% prbs_input = frest.PRBS('Order',5,'NumPeriods',1,'Amplitude',0.3,'Ts',4);

%{ 
'Amplitude': 
    * If too large -> deviate too far from the operating point
    * Too small -> indistinguishable from noise and ripples in your model.

'Ts':
    Signal sample time in (seconds) (As a starting point, specify the PRBS
    sample time to match the sample time of your model).

'Order': 
    The maximum length of the PRBS signal is 2n–1, where n is the signal 
    order. 

'NumPeriods':
    Number of periods in the PRBS signal, specified as a positive integer. 
    For most frequency response estimation applications, use the default 
    value of 1. Using a single period produces a flat frequency profile 
    across the input signal frequency range.

For CALCULATION, let's say:
    * In Simulink: we want Stop Time of X (seconds)
    * For PRBS, we want 'Ts' of Y (seconds)
    -> Thus the required length is X/Y = Z 
        -> We define 'Order' such that: [2^('Order') - 1] >= 2 

Example:
    * In Simulink: we want Stop Time of 100 (seconds)
    * For PRBS, we want 'Ts' of 4 (seconds)
    -> Thus the required length is 100/4 = 25 
        -> We define 'Order' = 5 such that: [2^(5) - 1] >= 25 

%}
plot(prbs_input);
%xlim([0 4])

% Transform to time series so that FromWorkspace block can use the data.
prbs_input_ts = generateTimeseries(prbs_input); 
%plot(prbs_input_ts);

