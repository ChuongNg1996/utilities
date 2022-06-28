#include <iostream> 

int main()
{
    // https://www.w3schools.com/cpp/cpp_exceptions.asp

    int a = 3;
    int b = 0;
    int c;
    try
    {
        if (b != 0)
        {
            c = a/b;
            std::cout << c << std::endl;
        }
        else
        {
            throw a, b;
        }
        
    }
    catch (...)
    {
        std::cout << "Invalid b = " << b << " (a = " << a <<")" << std::endl;
    }
    return 0;
}