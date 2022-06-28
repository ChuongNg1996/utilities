#include <iostream>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <stdio.h>
#include <string.h>
#include <chrono>
#include <thread>

using namespace std;
using namespace std::this_thread; // sleep_for, sleep_until
using namespace std::chrono; // nanoseconds, system_clock, seconds 

int main()
{
    // ftok to generate unique key
    key_t key = ftok("shmfile",65);
    
    // shmget returns an identifier in shmid
    int shmid = shmget(key,1024,0666|IPC_CREAT);
    printf("%d\n",shmid);
    // shmat to attach to shared memory
    
    char *stra = (char*) shmat(shmid,(void*)0,0);
    
    

    // while(strlen(stra) == 0) 
    // {
    //     printf ("Length = %u %s, Waiting for data ... \n", (unsigned)strlen(stra),stra) ;

    // }
    printf("Data read from memory: %s\n",stra);
    //sleep_for(nanoseconds(000000000));
    //detach from shared memory 
    shmdt(stra);
    
    // destroy the shared memory
    shmctl(shmid,IPC_RMID,NULL);
     
    return 0;
}