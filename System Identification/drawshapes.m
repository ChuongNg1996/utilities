
%% CIRCLE GIVEN LINEAR VELOCITY v (m/s) & ANGULAR VELOCITY omega (rad/s)
v = 1.49189;
omega = 0.015;
% Find radius r (m)
r = v/omega;


x = 5.2267;
y = 98.4692;

hold on

th = 0:pi/10000:2*pi;
xunit = r * cos(th) + x;
yunit = r * sin(th) + y;
plot(xunit , yunit);

%% SPIRAL

% xplot = zeros(1);
% yplot = zeros(1);
% 
% hold on
% grid on
% 
% v = 1.49189;
% omega = 0.015;
% 
% % Find radius r (m)
% r = v/omega;
% 
% x = 5.2267;
% y = 98.4692;
% 
% th = 0:pi/10000:2*pi;
% xunit = r * cos(th) + x;
% yunit = r * sin(th) + y;
% 
% stop1 = max(yunit);
% 
% array_size = (size(yunit)-1)/4;
% offset = 166;
% plot(xunit (1:array_size(2)+offset), yunit (1:array_size(2)+offset),'r-.','linewidth',2.05);
% plot(xunit (array_size(2)*3-offset:array_size(2)*4), yunit (array_size(2)*3-offset:array_size(2)*4),'r-.','linewidth',2.05);
% 
% % xplot = xunit(1:array_size(2)+offset);
% % xplot = [xplot xunit(array_size(2)*3-offset:array_size(2)*4)];
% % 
% % yplot = yunit(1:array_size(2)+offset);
% % yplot = [yplot yunit(array_size(2)*3-offset:array_size(2)*4)];
% 
% % Segment 2
% v = 1.49189;
% omega = 0.012;
% 
% % Find radius r (m)
% r = v/omega;
% 
% th = 0:pi/10000:2*pi;
% xunit = r * cos(th) + x;
% yunit = r * sin(th) + y;
% 
% stop2 = max(yunit);
% yunit = yunit - abs(stop2 - stop1);
% stop3 = min(yunit);
% y = y + abs(stop2 - stop1);
% 
% array_size = (size(yunit)-1)/4;
% plot(xunit (array_size(2):array_size(2)*2), yunit (array_size(2):array_size(2)*2 ),'r-.','linewidth',2.05);
% plot(xunit (array_size(2)*2:array_size(2)*3), yunit (array_size(2)*2:array_size(2)*3 ),'r-.','linewidth',2.05);
% 
% 
% % Segment 3
% v = 1.49189;
% omega = 0.009;
% 
% % Find radius r (m)
% r = v/omega;
% 
% th = 0:pi/10000:2*pi;
% xunit = r * cos(th) + x;
% yunit = r * sin(th) + y;
% 
% stop4 = min(yunit);
% yunit = yunit - abs(stop4 - stop3);
% stop5 = max(yunit);
% y = y - abs(stop4 - stop3);
% 
% offset = 150;
% array_size = (size(yunit)-1)/4;
% plot(xunit (1:array_size(2)+offset), yunit (1:array_size(2)+offset),'r-.','linewidth',2.05);
% plot(xunit (array_size(2)*3-offset:array_size(2)*4), yunit (array_size(2)*3-offset:array_size(2)*4),'r-.','linewidth',2.05);
% 
% plot(state_feedback(1:82500,7),state_feedback(1:82500,8),'b','linewidth',1.05);
% ylabel('y-positions[m]')
% xlabel('x-positions[m]')
% legend('Reference','Response');
% 
% % % Segment 4
% % v = 1.49189;
% % omega = 0.006;
% % 
% % % Find radius r (m)
% % r = v/omega;
% % 
% % th = 0:pi/10000:2*pi;
% % xunit = r * cos(th) + x;
% % yunit = r * sin(th) + y;
% % 
% % stop6 = max(yunit);
% % yunit = yunit - abs(stop6 - stop5);
% % stop7 = min(yunit);
% % y = y + abs(stop6 - stop5);
% % offset = 2000;
% % array_size = (size(yunit)-1)/4;
% % plot(xunit (array_size(2):array_size(2)*2), yunit (array_size(2):array_size(2)*2),'b');
% % plot(xunit (array_size(2)*2:array_size(2)*3 - offset), yunit (array_size(2)*2:array_size(2)*3-offset),'b');
% 
% hold off