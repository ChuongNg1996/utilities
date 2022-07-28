# Meta Programming
* [How was C made? How were the very first compilers made (before C)?](https://www.quora.com/How-was-C-made-How-were-the-very-first-compilers-made-before-C-For-writing-the-code-in-C-they-require-IDE-On-which-language-was-that-IDE-during-the-development-of-C-made-from): **(#1 Answer)** The very *first compilers* were written in **assembly language**. On the old PDP-8 we had a quite reasonable *FORTRAN compiler* that was less than 3,000 lines of assembly language. Using the old compiler to compile a newer one, then eventually having it *compile itself*. **(#2 Answer)** Before C was developed, the Unix Operating system was written in assembly, a language that was assembled by using an **assembler**. C was developed to make code portable between different machines back then. **(#3 Answer)** If there is *no compiler or assembler* for the target machine, then you will need to fall back to **machine code**. There used be times when computer magazines printed **machine code listings**, as the *typical audience would not have a compiler or assembler* on their system.

* [If you create a new language and want to write a compiler, how do you compile the compiler for the first time without any existing compiler?](https://www.quora.com/How-was-C-made-How-were-the-very-first-compilers-made-before-C-For-writing-the-code-in-C-they-require-IDE-On-which-language-was-that-IDE-during-the-development-of-C-made-from): Write your compiler in your own new language on *paper*. Then *assemble it by hand*. Of course try to write the minimal compiler you need for bootstrapping. After that, *convert the assembly to binary by hand*, and finally use a Hex tool or anything to *enter the binary code into an exe/bin file*.

<p align="center">
  <img src="https://qph.cf2.quoracdn.net/main-qimg-f7d3982d3ccf23769e067da61bacc738-pjlq">
</p>


# Programming Paradigm

## Object-Oriented Programming (OOP)

### OOP vs Procedural Programming
[Source 1](https://teamtreehouse.com/community/when-to-use-oop-over-procedural-coding)

# Header
* In `header_test_1`, `test_header_1.h` is the first header file, includes `test_header_2.h` `test_header_3.h` `test_header_4.h`. Next, `test_header_2.h` includes `test_header_3.h` and `test_header_4.h`. Next, `test_header_3.h` and `test_header_4.h` shows two different types of INCLUDE GUARD.
  ```sh
  g++ test_header_1.cpp test_header_2.cpp test_header_main.cpp -o test_header_main
  ./test_header_main
  ```
  
# OTHERS

* [Incompatibilities Between ISO C and ISO C++](http://david.tribble.com/text/cdiffs.htm)
* [Linux vs. Windows Extension](https://askubuntu.com/questions/156392/what-is-the-equivalent-of-an-exe-file)

<p align="center">
  <img src="/images/linux-windows-extension.jpeg">
</p>
