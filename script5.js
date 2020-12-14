const array = [1, 4, 2, 67, 34, 2, 50, 23, 11, 10, 5, 4, 9, 21];
const array2 = array.filter(item =>  item > 10);
console.log(array2);

const arr = ['vasia', 'kolia'];
const arr2 = arr.forEach(item => {arr.toString()});
console.log(arr2);

arr3 = ['Anna', 12, 'Sam', 9, 'Kate', 10, 'Ron', 9];
arr3.forEach(item => {if ( typeof item === 'string'){console.log(item + ' - string value');}
                     else {console.log(item + ' - number value');}
                    }
            );