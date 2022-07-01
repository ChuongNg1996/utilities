# Data Structure and Algorithms

## [Tutorialspoint](https://www.tutorialspoint.com/data_structures_algorithms/index.htm)

* [tutorialspoint-DSA-Home](https://www.tutorialspoint.com/data_structures_algorithms/index.htm): **Problems?** (1) Speed and (2) Multiple Request **Application?** `Search, Sort, Insert, Update, Delete` (e.g, Fibonacci number series, Knapsack problem, Tower of Hanoi, All pair shortest path by Floyd-Warshall, Shortest path by Dijkstra, Project scheduling)
* [tutorialspoint-DSA-Overview](https://www.tutorialspoint.com/data_structures_algorithms/data_structure_overview.htm):

  Foundation Terms: **Interface** is *set of operations* with *type of parameters* and *return type*, **Implementation** provides *internal representation* of a data structure* and *definition of the algorithms* used in the operations of the data structure.
  
  Characteristics: **Correctness, Time Complexity** (execution time), **Space Complexity** (memory usage).
  
  Terminology: **Data** (set of values), **Data Item** (single unit of values), **Group Items** (Data items that are divided into sub items), **Elementary Items** (Data items that cannot be divided further), **Attribute and Entity** (An entity contains certain attributes or properties), **Entity Set** (Entities of similar attributes), **Field** (single elementary unit of information representing an attribute of an entity), **Record** (a collection of field values of a given entity), **File** (a collection of records of the entities in a given entity set). 

* [tutorialspoint-DSA-Algorithms-Basics](https://www.tutorialspoint.com/data_structures_algorithms/algorithms_basics.htm): ... **Space Complexity** = fixed/constant part + variable part. **Time Complexity**  can be defined as a numerical function T(n), where T(n) can be measured as the *number of steps*, provided each step consumes *constant time*; or number of *key operations*.

* [tutorialspoint-DSA-Asymptotic-Analysis](https://www.tutorialspoint.com/data_structures_algorithms/asymptotic_analysis.htm): **Big O** - Worst Case - express the upper bound of an algorithm's running time; **Big Omega** - Best Case -  express the lower bound of an algorithm's running time; **Big Theta** Average Case - express both the lower bound and the upper bound of an algorithm's running time. [Big O table](https://www.tutorialspoint.com/data_structures_algorithms/asymptotic_analysis.htm#_adr_abp_container_7) *(To link to a part of the page with URL -> Inspect the part -> [Look for id](https://stackoverflow.com/questions/2835140/how-do-i-link-to-part-of-a-page-hash))*.

### Algorithms

* [**Greedy Algorithms**](https://www.tutorialspoint.com/data_structures_algorithms/greedy_algorithms.htm): Most networking algorithms use the greedy approach. Here is a list of few of them − *Travelling Salesman Problem, Prim's Minimal Spanning Tree Algorithm, Kruskal's Minimal Spanning Tree Algorithm, Dijkstra's Minimal Spanning Tree Algorithm, Graph - Map Coloring, Graph - Vertex Cover, Knapsack Problem, Job Scheduling Problem*. [**Divide and Conquer**](https://www.tutorialspoint.com/data_structures_algorithms/divide_and_conquer.htm): The following computer algorithms are based on divide-and-conquer programming approach − *Merge Sort, Quick Sort, Binary Search, Strassen's Matrix Multiplication, Closest pair (points)*. [**Dynamic Programming**](https://www.tutorialspoint.com/data_structures_algorithms/dynamic_programming.htm): unlike divide and conquer, the sub-problems are not solved independently. Rather, results of smaller sub-problems are remembered and used for similar or overlapping sub-problems. In contrast to greedy algorithms, where local optimization is addressed, dynamic algorithms are motivated for an overall optimization of the problem. The following computer problems can be solved using dynamic programming approach − *Fibonacci number series, Knapsack problem, Tower of Hanoi, All pair shortest path by Floyd-Warshall, Shortest path by Dijkstra, Project scheduling*.

### Data Structures
* The particular data structure chosen largely depends on the *frequency of the operation* that needs to be performed on the data structure (e.g. `Traversing, Searching, Insertion, Deletion, Sorting, Merging`). 

### Linked List

* [**Linked List**](https://www.tutorialspoint.com/data_structures_algorithms/linked_list_algorithms.htm): second most-used after array. Types: **Simple Linked List, Doubly Linked List, Circular Linked List**.

### Stack & Queque
* [**Stack**](https://www.tutorialspoint.com/data_structures_algorithms/stack_algorithm.htm): an Abstract Data Type (ADT), LIFO (Last-in-first-out), insertion operation is PUSH(), removal operation is POP().

* [**Queqe**](https://www.tutorialspoint.com/data_structures_algorithms/dsa_queue.htm): an Abstract Data Type (ADT), FIFO (First-in-first-out), 

### Search
* [Search Techniques](https://www.tutorialspoint.com/data_structures_algorithms/linear_search_algorithm.htm): **Linear search** (Every item is checked and if a match is found then that item is returned, otherwise the search continues *till the end*), **Binary Search** (should be in the *sorted form*, comparing the middle most item of the collection. If a match occurs, then the index of item is returned. If the middle item is greater than the item, then the item is searched in the sub-array to the left of the middle item. Otherwise, the item is searched for in the sub-array to the right) **Interpolation Search** (*my interpretation: similar to Binary search, need ordered items, but the mid aimed towards the item X, via the formula:*)

  ```sh
  probe_pos = low_end + RATIO(transform_from_VALUE_to_INDEX) * VALUE(distance_from_low_to_X) 
  RATIO(transform_from_VALUE_to_INDEX) = INDEX(high_end - low_end)/VALUE(high_end - low_end)
  VALUE(distance_from_low_to_X) = VALUE(X) - VALUE(low_end)
  
  -> probe_pos = low_end + INDEX(high_end - low_end)/VALUE(high_end - low_end) * (VALUE(X) - VALUE(low_end))
  ```
  where `probe_pos`, `low_end` and `high_end` are INDEX.
  
  **Hash Table** (data is stored in an array format, where each data value has its own unique index value. *Access of data becomes very fast* if we know the index of the desired data - data are stored in an *associative manner* by *Key*)

### Sorting

* [Sorting Techniques](https://www.tutorialspoint.com/data_structures_algorithms/sorting_algorithms.htm): **in-place sorting**: requires some extra spaces but mostly operates at the *same space* **VS. not-in-place sorting**: requires equal or more spaces . **stable sorting**: does not change the sequence of similar/equal content **VS. un-stable sorting** changes the sequence of similar/equal content. **adaptive sorting**: if the source list has some element already sorted, adaptive algorithms will take this into account and will *try not to re-order them*. **VS. non-adaptive sorting**: try to force every single element to be *re-ordered*. **Terms**: Increasing Order (only greater than), Decreasing Order (only less than), Non-Increasing Order (has less or equal), Non-Decreasing Order (has greater or equal).
  
* [**Bubble Sort**](https://www.tutorialspoint.com/data_structures_algorithms/bubble_sort_algorithm.htm): O(n^2), in-place sorting (slow but save memory space), check *pair of adjacent elements* and swap if they are not in order. After *final iteration*, the data is sorted. Also, after an iteration, the first values may not correct but the *final values (depend on which iteration) are 100% correct* because essentially we are pushing the largest values to the last, not pushing the smallest value to the first (going to first to last). Thus, based of which iteration, we can omitted the obvious ordered last values.

* [**Insertion Sort**](https://www.tutorialspoint.com/data_structures_algorithms/insertion_sort_algorithm.htm): O(n^2), in-place sorting (slow but save memory space),  check *pair of adjacent elements* and swap if they are not in order. But instead of going forward, it goes backward if there is a swap. If there is not swap - natural order, it moves forward. 

* [**Selection Sort**](https://www.tutorialspoint.com/data_structures_algorithms/selection_sort_algorithm.htm):  O(n^2), in-place sorting (slow but save memory space). Firstly, *find the smallest element* in the unsorted data, *swap it with the first element* (on the left). Next,find the smallest element in the unsorted data, swap it with the element next to the first element and so on. Can do the same with largest and to the right?

* [**Merge Sort Algorithm**](https://www.tutorialspoint.com/data_structures_algorithms/merge_sort_algorithm.htm): O(n log n), not-in-place sorting. Divide the data into atomic, then merge them to create many small arrays and eventually the full array, each small merged array need to be sorted. *This sounds awful lot like Selection Sort with extra steps, then why is it faster? [Because](https://www.quora.com/Why-is-merge-sort-algorithm-so-much-faster-than-insertion-sort-algorithm-when-they-seem-to-be-doing-the-same-thing-getting-elements-and-inserting-them-in-the-correct-place) it embeds the merged array into a completely need space, no need to perform additional operations to move & replace the whole array, like Selection Sort. Thus it's downgrade is using more space.*
