const array = [];
const Arrays = () => {
let value = +prompt('Введи число');
if ( value === 15 ){
    array.push(value);
    alert(array.reduce( (sum,item) => {return sum + item ;}, 0));
} else {
    array.push(value);
    Arrays();
}
}
Arrays();