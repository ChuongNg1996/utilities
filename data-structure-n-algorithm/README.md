# utilities
My Basic Utilities

## Contents
* Inter-process Communication (for OS): [Wiki](https://en.wikipedia.org/wiki/Inter-process_communication#Approaches).

## CLassical Physics
* For constant acceleration `a_c`, for each time step:

  ```sh
  p_f = p_i + v_i*delta_t + (1/2)*a_c*(delta_t)^2 ( = p_i + v_f*delta_t - (1/2)*a_c*(delta_t)^2 = p_i + v_a*delta_t )
  v_f = v_i + a_c*delta_t ( -> v_f*delta_t = v_i*delta_t + a_c*(delta_t)^2 -> v_i*delta_t = v_f*delta_t - a_c*(delta_t)^2 )
  v_a = (v_f - v_i)/2
  ```
  
  where `p_i` and `p_f` are initial and final position; `v_i` `v_f` `v_a` are initial, final and average velocity.
