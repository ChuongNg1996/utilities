clc
clear
%% Data
% Set 1
% GG map gives distance = 76.26 (m)
% Method 1 gives: 77.6544 (m), 8.0960 (deg)
% Method 2 gives: 76.3076 (m), 8.2427 (deg)
% Method 3 gives: 76.3076 (m)

% lat1 = 10.797316067500354; 
% lon1 = 106.70769776616707;
% 
% lat2 = 10.797413458655363; 
% lon2 = 106.70838965919522;


% Set 2
% GG map gives distance = 102.17 (m)
% Method 1 gives: 103.7088 (m), -36.5773 (deg)
% Method 2 gives: 102.3576 (m), 37.3466 (deg)
% Method 3 gives: 102.3576 (m)

% lat1 = 10.79773880694745;
% lon1 = 106.7077917752949;
% 
% lat2 = 10.797261276337963;
% lon2 = 106.70859347569117;

% Set 3
% GG map gives distance = 145.61(m)
% Method 1 gives: 148.4535 (m), -0.1696 (deg)
% Method 2 gives: 145.8272 (m)
% Method 3 gives: 145.8272 (m)

% lat1 = 10.797533287384647;
% lon1 = 106.70748938147992;
% 
% lat2 = 10.797529335302665;
% lon2 = 106.70882512156516;

% Set 4
% GG map gives distance = 4129170(m)
% Method 1 gives: 4.4086e+06 (m), -33.7587 (deg)
% Method 2 gives: 4.0908e+06 (m), 37.9043 (deg)
% Method 3 gives: 4.1201e+06(m)

% lat1 = 32.373201268526145;
% lon1 = 73.80791873308938;
% 
% lat2 = 13.111665725964551;
% lon2 = 108.48541241960913;

% Set 5
% GG map gives distance = 6917600(m)
% Method 1 gives: 6.9418e+06 (m), -9.0046e+01 + 1.9151e+02i (deg)
% Method 2 gives: 6.9288e+06 (m), 9.0046e+01 - 2.3157e+02i (deg)
% Method 3 gives: 6.9297e+06(m)

% lat1 = 75.3092342269345;
% lon1 = 104.06056738513831;
% 
% lat2 = 13.004307180552189;
% lon2 = 108.4670881401039;

% Set 5
% GG map gives distance = 6917600(m)
% Method 1 gives: 6.9418e+06 (m), -9.0046e+01 + 1.9151e+02i (deg)
% Method 2 gives: 6.9288e+06 (m), 9.0046e+01 - 2.3157e+02i (deg)
% Method 3 gives: 6.9297e+06(m)

% lat1 = 75.3092342269345;
% lon1 = 104.06056738513831;
% 
% lat2 = 13.004307180552189;
% lon2 = 108.4670881401039;

% Set 6
% GG map gives distance = 19.42(m)
% Method 1 gives: 19.5346 (m), 9.0046e+01 - 1.2295e+02i (deg)
% Method 2 gives: 19.5172 (m), 9.0046e+01 - 1.2400e+02i (deg)
% Method 3 gives: 19.5172(m)

lat1 = 10.797459324648827;
lon1 = 106.70850603813479;

lat2 = 10.797288067673136;
lon2 = 106.70846647555193;

% In conclusion, the smaller the distance, the closer all result converge
% to each other. Given that the ship runs very slow, method 1 will give
% best computational result while outputing decent estimate of relative x
% and y (since the consecutive GPS points are assumed to be very close,
% <1.0 m), method 2 can be best all around with more accurate relative
% position.

%% Method 1
disp("METHOD 1")
% Just pure linear distance on each direction. Remember to align origin of
% robot to this. Applicable for short distance

len_deg = 111139; 
% src: https://sciencing.com/convert-distances-degrees-meters-7858322.html
lat_del = (lat2 - lat1)*len_deg 
lon_del = (lon2 - lon1)*len_deg
dist = sqrt(lat_del^2 + lon_del^2)
angle = asin(lat_del/lon_del)*180/3.14


%% Method 2
disp("METHOD 2")
% src: http://www.movable-type.co.uk/scripts/latlong.html?
% Only consider lat direction, keep lon same
R = 6371e3;
lon2_temp = lon1;
theta_1 = lat1*3.14/180;
theta_2 = lat2*3.14/180;
del_theta = (lat2-lat1)*3.14/180;
del_lamb = (lon2_temp-lon1)*3.14/180;

a = sin(del_theta/2)*sin(del_theta/2)+cos(theta_1)*cos(theta_2)*sin(del_lamb/2)*sin(del_lamb/2);
c = 2*atan2(sqrt(a),sqrt(1-a));
lat_del = R*c

lat2_temp = lat1;
theta_1 = lat1*3.14/180;
theta_2 = lat2*3.14/180;
del_theta = (lat2_temp-lat1)*3.14/180;
del_lamb = (lon2-lon1)*3.14/180;

a = sin(del_theta/2)*sin(del_theta/2)+cos(theta_1)*cos(theta_2)*sin(del_lamb/2)*sin(del_lamb/2);
c = 2*atan2(sqrt(a),sqrt(1-a));
lon_del = R*c

d = sqrt(lat_del^2 + lon_del^2)
angle = asin(lat_del/lon_del)*180/3.14

%% Method 3
disp("METHOD 3")
R = 6371e3;
theta_1 = lat1*3.14/180;
theta_2 = lat2*3.14/180;
del_theta = (lat2-lat1)*3.14/180;
del_lamb = (lon2-lon1)*3.14/180;

a = sin(del_theta/2)*sin(del_theta/2)+cos(theta_1)*cos(theta_2)*sin(del_lamb/2)*sin(del_lamb/2);
c = 2*atan2(sqrt(a),sqrt(1-a));
d = R*c
