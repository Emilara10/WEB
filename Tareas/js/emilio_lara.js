/*
 * Example functions to practice JavaScript
 *
 * José Emilio Lara Posada
 * 2026 - 04 - 09
 */

"use strict";

//Finds the first character in a string that does not repeat.
function firstNonRepeating(string){
    const letters = [];
    for (let i=0; i<string.length; i++){
        let found = false;
        
        for (let item of letters){
            if (item.char === string[i]){
                item.count++;
                found = true;
                break;
            }
        }
        if (!found){
            letters.push({char: string[i], count : 1})
        }
    }
    for(let index in letters){
        if (letters[index].count ===1){
            return letters[index].char        
        }
    }

    return undefined;
}

//Sorts an array of numbers using the bubble sort algorithm.
function bubbleSort(A){
    for (let i = 0; i < A.length; i++){
        for (let j = 0; j < A.length -1; j++){
            if (A[j] > A[j + 1]){
                let temp = A[j];
                A[j] = A[j+1];
                A[j+1] = temp;
            }
        }
    }
    return A;
}

//Returns a new array with the elements in reverse order without using .reverse().
function invertArray(A){
    let invertido = [];
    let j = 0;
    for (let i = A.length - 1; i >= 0; i--){
        invertido[j] = A[i];
        j ++;
    }
    return invertido;
}

//Reverses the elements of the input array directly in memory (in-place).
function invertArrayInplace(A){
    for (let i = 0; i < A.length / 2; i++){
        let temp = A[i];
        A[i] = A[A.length - 1 - i];
        A[A.length - 1 - i] = temp;
    }
    return A;
}

//Capitalizes the first letter of each word in a given string.
function capitalize(texto){
    let resultado = "";

    for(let i = 0; i < texto.length; i++){
        if (i === 0 || texto [i - 1] === " "){
            resultado += texto[i].toUpperCase();
        }
        else{
            resultado += texto[i];
        }
    }
    return resultado;
}

//Calculates the Greatest Common Divisor (mcd) of two numbers.
function mcd(a ,b){
    while (b !== 0){
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

//Converts a string into 'Hacker Speak' by replacing specific letters with numbers.
function hackerSpeak(text){
    let hacker = "";
    for(let i = 0; i < text.length; i++){
        if (text[i] == "a" || text[i] == "A"){
            hacker += 4;
        }
        else if (text[i] == "e" || text[i] == "E"){
            hacker += 3;
        }
        else if (text[i] == "i" || text[i] == "I"){
            hacker += 1;
        }
        else if (text[i] == "o" || text[i] == "O"){
            hacker += 0;
        }
        else if (text[i] == "s" || text[i] == "S"){
            hacker += 5;
        }
        else{
            hacker += text[i];
        }
    }
    return hacker;

}

//Returns an array containing all the divisors (factors) of a given number.
function factorize(n){
    let res = []
    let j = 0;
    for(let i = 1; i <= n; i++){
        if (n % i === 0){
            res[j] = i;
            j++
        }
    }
    return res;
}

//Removes all duplicate elements from an array and returns the unique values.
function deduplicate(B){
    let res = [];
    let j = 0;
    for(let i = 0; i < B.length; i++){
        let found = false;

        for (let k = 0; k < i; k++){
            if (B[i] === B[k]){
                found = true;
            }
        }
        if (found === false){
            res[j] = B[i];
            j ++;
        }
    }
    return res;
}

//Returns the length of the shortest string within a list of strings.
function findShortestString(s){
    if (s.length == 0){
        return 0;
    }
    else{
        let len = s[0].length;
        for(let i = 0; i < s.length; i++){
            if (len > s[i].length){
                len = s[i].length;
            }
        }
        return len;
    }
}

//Checks if a given string reads the same forwards and backwards.
function isPalindrome(A){
    if (A.length === 0){
        return true;
    }
    else {
        for (let i = 0; i < A.length/2; i++){
            if (A[i]  != A[A.length - 1 - i]){
                return false;
            }
        }
    }
    return true;
}

//Returns a new list of strings sorted in alphabetical order.
function sortStrings(A) {
    let res = [];
    for (let i = 0; i < A.length; i++) {
        res[i] = A[i];
    }
    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res.length - 1; j++) {
            if (res[j] > res[j + 1]) {
                let temp = res[j];
                res[j] = res[j + 1];
                res[j + 1] = temp;
            }
        }
    }
    return res;
}

//Calculates the average (mean) and the most frequent value (mode) of a numeric list.
function stats(N){
    if (N.length === 0){
        return [0, 0];
    }
    let suma = 0;
    let moda = N[0];
    let maxreps = 0;

    for(let i = 0; i < N.length; i ++){
        suma = suma + N[i]; 
        let veces = 0;

        for (let j = 0; j < N.length; j++) {
            if (N[i] === N[j]) {
                veces++;
            }
        }
        if (veces > maxreps) {
            maxreps = veces;
            moda = N[i];
        }
    }
    let promedio = suma / N.length;
    return [promedio, moda];
}

//Identifies and returns the most frequently occurring string in a list.
function popularString(B){
    if (B.length === 0) {
        return "";
    }
    let favorita = B[0];
    let max = 0;
    for (let i = 0; i < B.length; i++) {
        let act = 0;
        for (let j = 0; j < B.length; j++) {
            if (B[i] === B[j]) {
                act++;
            }
        }
        if (act > max) {
            max = act;
            favorita = B[i];
        }
    }
    return favorita;
}

//Determines if a given number is a mathematical power of two.
function isPowerOf2(n){
    if (n <= 0){
        return false;
    }
    while (n % 2 === 0){
        n = n/2
    }
    if ( n === 1){
        return true;
    }
    else{
        return false;
    }
}

//Sorts a list of numbers in descending order and returns it as a new array.
function sortDescending(A) {
    let res = [];
    for (let i = 0; i < A.length; i++) {
        res[i] = A[i];
    }
    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res.length - 1; j++) {
            if (res[j] < res[j + 1]) {
                let temp = res[j];
                res[j] = res[j + 1];
                res[j + 1] = temp;
            }
        }
    }
    return res;
}
export {
    firstNonRepeating, 
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
    sortDescending,
};
