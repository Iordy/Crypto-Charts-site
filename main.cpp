#include <iostream>
#include <fstream>


using namespace std;

fstream f("crusu.txt");


int freq_letter[26];
int most_found_letters[5];

int no_chr = 11000 * 5;


void sort(int *array[]){

for (int i = 0; i < 26; i++)
for(int j = 1; j < 26; j++){
    if(*array[i] > *array[j])
    {
        aux = *array[i];
        *array[i] = *array[j];
        *array[j] = aux;
    }

}
    
}


void change_arrays(int *freq_letter[], int *temp[]){


for(int i = 0; i < 26; i++)
{
    *temp[i] = *freq_letter[i];
}


}


void compute_prob(int *temp[]){


for(int i = 0; i < 26; i++)

{
    *temp[i] = *temp[i]/no_chr;
}

}

void find_letters(int *temp[], int *freq_letter[]){

sort(temp);

for(int i = 0; i < 26; i++){
    for(int j = 1; j < 26; j++)
    
}


}


int main(){


char t;


while(f>>t){

freq_letter[int(t)-97]++;

}


    return 0;
}
