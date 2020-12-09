let number = [3];
for (let i = 1; i<6; i++){
    number[i] = number[i-1]+5;
    console.log(number[i]); 
}

alert(number[number.length - 1]);

number[number.length - 2] = 'предпоследний элемент';
for (let i = 1; i<6; i++){
    console.log(number[i]); 
}

let styles = ['Джаз', 'Блюз'];
styles.splice(styles.length, 0, 'Рок-н-Ролл');
styles.splice(styles.length-2, 1, 'Классика');
removed = styles.splice(0, 1);
alert(removed);
styles.splice(0,0, 'Реп', 'Регги');
alert(styles);
console.log(styles);