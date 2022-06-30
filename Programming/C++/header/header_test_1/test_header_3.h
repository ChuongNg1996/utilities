#ifndef  TEST_HEADER_3 // INCLUDE GUARD type 1 to avoid multiple re-definition of test_header_3 
#define  TEST_HEADER_3

# include <iostream>
using namespace std;

static int product (int num_1, int num_2) // static to avoid multiple defintion of function
{
    cout << num_1*num_2 << endl;
    return 0;
}

#endif

/*
GUARD:  https://kipalog.com/posts/Include-guard-trong-C-va-C- 
        https://docs.microsoft.com/en-us/cpp/cpp/header-files-cpp?view=msvc-170
static: https://www.geeksforgeeks.org/what-are-static-functions-in-c/ 
*/