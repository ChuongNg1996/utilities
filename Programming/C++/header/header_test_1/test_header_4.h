#pragma once // INCLUDE GUARD type 2 to avoid multiple re-definition of test_header_4 

# include <iostream>
using namespace std;

static int divide (float num_1, float num_2) // static to avoid multiple defintion of function
{
    cout << num_1/num_2 << endl;
    return 0;
}



/*
GUARD:  https://kipalog.com/posts/Include-guard-trong-C-va-C- 
        https://docs.microsoft.com/en-us/cpp/cpp/header-files-cpp?view=msvc-170
static: https://www.geeksforgeeks.org/what-are-static-functions-in-c/ 
*/