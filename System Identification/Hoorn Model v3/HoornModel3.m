function [sys,x0,str,ts] = HoornModel2(t,x,u,flag)

% Modelling, System Idenfication from the Free Running Model Test of Hoorn
% Version 1.3 (23/05/2017)
% Made by Yuanyuan Wang and Hung Nguyen in 2016

switch flag
   
case 0,
   [sys,x0,str,ts] = mdlInitializeSizes;
  
case 1,
    sys=mdlDerivatives(t,x,u);
    
%case 2
%   [sys,x0,str,ts] = mdlUpdate(t,x,u,lambda,P,xi);

case 3,
   sys = mdlOutputs(t,x,u);

case {2, 4, 9},
   sys = [];
   
otherwise
   error(['Unhandled flag = ',num2str(flag)]);
end

function [sys,x0,str,ts] = mdlInitializeSizes

sizes = simsizes;
sizes.NumContStates = 11;
sizes.NumDiscStates = 0;
sizes.NumOutputs = 11;
sizes.NumInputs = -1;
sizes.DirFeedthrough = 1;
sizes.NumSampleTimes = 1;
sys = simsizes(sizes);

% Initial values of state vector:
x0 = [1 0 0 0 0 0 0 0 0 1 -1]';
%x = [ u v r x y psi p phi delta n1 n2]'
str = [];
ts = [0 0];

% end of mdlInitializeSizes

%function [xdot,U] = ContainerModel(x,ui)

function sys=mdlDerivatives(t,x,u)

% [xdot,U] = container(x,ui) returns the speed U in m/s (optionally) and the 
% time derivative of the state vector: x = [ u v r x y psi p phi delta n ]'  for
% a free running model Hoorn L = 2.47 m, where
%
% u     = surge velocity          (m/s)
% v     = sway velocity           (m/s)
% r     = yaw velocity            (rad/s)
% x     = position in x-direction (m)
% y     = position in y-direction (m)
% psi   = yaw angle               (rad)
% p     = roll velocity           (rad/s)
% phi   = roll angle              (rad)
% delta = actual rudder angle     (rad)
% n1     = propeller 1   (rpm)
% n2     = propeller 2   (rpm)
%
% The input vector is :
% ui      = [ delta_c n_c ]'  where
% delta_c = commanded rudder angle   (rad)
% n_c     = commanded shaft velocity (rpm)  

% Check of input and state dimensions
if (length(x) ~= 11),error('x-vector must have dimension 11 !');end
if (length(u) ~= 3),error('u-vector must have dimension  3 !');end

% Normalization variables
L = 2.47;                     % length of ship (m)
U = sqrt(x(1)^2 + x(2)^2);   % service speed (m/s)

% Check service speed
%if U <= 0,error('The ship must have speed greater than zero');end
%if x(10) <= 0,error('The propeller rpm must be greater than zero');end

delta_max  = 30;             % max rudder angle (deg)
Ddelta_max = 20;              % max rudder rate (deg/s)
Nc_max     = 1000;

% Non-dimensional states and inputs
delta_c = u(1); 
n1_c    = u(2);
n2_c    = u(3);

u1    = x(1)/U;   v   = x(2)/U;  
p     = x(7)*L/U; r   = x(3)*L/U; 
phi   = x(8);     psi = x(6); 
delta = x(9);     
n1   = x(10);%in RPM and do not need nondimensional as the Drag force estimation used
n2   = x(11);
 
% Parameters, hydrodynamic derivatives and main dimensions
m = 0.0084;     mx = 0.00031514;   my = 0.0075;
alphay = 0.05;  lx = 0.0313;      ly = 0.0313;     
Ix = 0.000077279;  Iz = 0.0020;
Jx = 0.000015456;  Jz = 0.0020;   xG = 0;

B = 0.32; g = 9.81;  d  = 0.12; Cb = 0.69;   
weights = 63.4; AR = 0.0006; rho   = 1000;
D = 0.06; GM = 0.00875/L;
 
W     = weights*g/(rho*L^2*U^2/2);

Xuu      = -0.0019;    Xvr    = -0.0023;   Xvv    = 0.0088;
Xrr      = 0.0058;    Xphiphi  = 0.0171;

Yv = -0.0492; Yr = 0; Yp = 0;
Yphi = 0; Yvvv = 0.02394; Yrrr = 0;
Yvvr = -0.2422; Yvrr = -0.1299; Yvvphi = -0.0148;
Yvphiphi = 0; Yrrphi = 0; Yrphiphi = 0;

Kv =  0.00089; Kr =  0.00013; Kp = -0.000062;
Kphi = 0; Kvvv = -0.0264; Krrr =0;
Kvvr = -0.0080; Kvrr =0.0096; Kvvphi = -0.0103;
Kvphiphi =0; Krrphi = -0.00159; Krphiphi = 0;
 
Nv       = -0.0095;  Nr     = -0.00455;    Np =0;
Nphi = 0; Nvvv   = 0.0034;   Nrrr     = 0.0017; 
Nvvr     = -0.0216;     Nvrr   =  0.0011;    Nvvphi = -0.0191;
Nvphiphi = -0.0058; Nrrphi = -0.0033; Nrphiphi = 0.0024;

% Masses and moments of inertia
m11 = (m+mx);
m22 = (m+my);
m32 = -my*ly;
m42 = my*alphay;
m33 = (Ix+Jx);
m44 = (Iz+Jz);

% Rudder saturation and dynamics
if abs(delta_c) >= delta_max*pi/180,
   delta_c = sign(delta_c)*delta_max*pi/180;
end

delta_dot = delta_c - delta;

if abs(delta_dot) >= Ddelta_max*pi/180,
   delta_dot = sign(delta_dot)*Ddelta_max*pi/180;
end

%n_dot = 0;


n1_dot = n1_c - n1;
n2_dot = n2_c - n2;

if abs(n1_dot) >= Nc_max,
   n1_dot = sign(n1_dot)*Nc_max;
end
if abs(n2_dot) >= Nc_max,
   n2_dot = sign(n2_dot)*Nc_max;
end


% Calculation of state derivatives
T = (n1^2*sign(n1)-n2^2*sign(n2))*6.3545*10^(-6)/(0.5*L^2*U^2*1000)*1; %Drag force of propellers when 5V is applied;
Npropeller = (n1^2*sign(n1)+n2^2*sign(n2))*6.3545*10^(-6)*0.059/(0.5*L^3*U^2*1000)*1;%Yaw moments generated from propellers

%Calculation of Rudder force
%first parameter generated from flow affected by hull:
%coefficient 0.68*Cb-0.25+0.18 = 0.3992
%krudder1 = 0.3610;%(1-0.3992)^2
%Flow speed affected by propeller: Deltap = 8*T/(density*pi*krudder1*U^2*D^2)
deltap = 10.4569/U^2;
%second parameter krudder2 = 1+(Dpropeller/hrudder)*deltap
krudder2 = 1 + 0.6*deltap;
%third parameter for unbalance rudder
%krudder3 = 1;
%nondimensional FN = Ar*k1*k2*k3*(6.13*1.67/(2.25+1.67))*sin(delta)/L^2
FN = -0.006*0.3610*krudder2*(6.13*1.67/(2.25+1.67))/L^2*sin(delta)*1;


aH = 0.237;xR = -0.5;xH = -0.45;zR = 0.033;cRX = 0.6175;
% Forces and moments
% surge
  X    = Xuu*u1^2 + T + Xvr*v*r + Xvv*v^2 + Xrr*r^2 + Xphiphi*phi^2 + ...
         cRX*FN*sin(delta) + (m + my)*v*r;
% sway  
  Y    = Yv*v + Yr*r + Yp*p + Yphi*phi + Yvvv*v^3 + Yrrr*r^3 + Yvvr*v^2*r + ...
         Yvrr*v*r^2 + Yvvphi*v^2*phi + Yvphiphi*v*phi^2 + Yrrphi*r^2*phi + ...
         Yrphiphi*r*phi^2 + (1 + aH)*FN*cos(delta) - (m + mx)*u1*r;
% roll
  K    = Kv*v + Kr*r + Kp*p + Kphi*phi + Kvvv*v^3 + Krrr*r^3 + Kvvr*v^2*r + ...
         Kvrr*v*r^2 + Kvvphi*v^2*phi + Kvphiphi*v*phi^2 + Krrphi*r^2*phi + ...
         Krphiphi*r*phi^2 - (1 + aH)*zR*FN*cos(delta) + mx*lx*u1*r - W*GM*phi;
% yaw
  N    = Nv*v + Nr*r + Np*p + Nphi*phi + Nvvv*v^3 + Nrrr*r^3 + Nvvr*v^2*r + ...
         Nvrr*v*r^2 + Nvvphi*v^2*phi + Nvphiphi*v*phi^2 + Nrrphi*r^2*phi + ...
         Nrphiphi*r*phi^2 + (xR + aH*xH)*FN*cos(delta)+Npropeller;
% Dimensional state derivatives  xdot = [ u v r x y psi p phi delta n ]'
detM = m22*m33*m44-m32^2*m44-m42^2*m33;

xdot =[                      X*(U^2/L)/m11
          -((-m33*m44*Y+m32*m44*K+m42*m33*N)/detM)*(U^2/L)
           ((-m42*m33*Y+m32*m42*K+N*m22*m33-N*m32^2)/detM)*(U^2/L^2)
                   (cos(psi)*u1-sin(psi)*cos(phi)*v)*U
                   (sin(psi)*u1+cos(psi)*cos(phi)*v)*U 
                              cos(phi)*r*(U/L)                
           ((-m32*m44*Y+K*m22*m44-K*m42^2+m32*m42*N)/detM)*(U^2/L^2)
                                p*(U/L)
                              delta_dot 
                                n1_dot                 
                                n2_dot];

% Return values for S-function: 

sys = xdot;

% End of mdlDerivatives

function sys = mdlOutputs(t,x,u)

sys = x;
         
% End of function mdlOutputs


