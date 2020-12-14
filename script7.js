function sayhello (name) {if (name === 'Mark'){console.log('Hi, Mark!');}
                        else { console.log('Hello, ' + name + '!');}};
sayhello('Oleg');
sayhello('Viktor');
sayhello('Mark');


let min = (a,b) => {if (a>b){return(b);}
                    else {return(a);}};
console.log(min(2, 5));
console.log(min(3, -1));
console.log(min(1, 1));


let pow = (x, n) => {if (n>=1){let p = 1; 
                                for (let i = 1; i <= n; i++) 
                                {p = p * x;};
                                return(p);
                                }
                     };
console.log(pow(3, 2));
console.log(pow(3, 3));
console.log(pow(1, 100));


let isEven = (n) => {if (n % 2 == 0){return('true')}
                        else {return('false')}};
console.log(isEven(4));
console.log(isEven(5));



let convertFloor = (n) => {if (n<=13 && n>=0){return(n+1);}
                            else {return(n);}};
console.log(convertFloor(-1));
console.log(convertFloor(0));
console.log(convertFloor(2));
console.log(convertFloor(7));
console.log(convertFloor(8));
console.log(convertFloor(10));
console.log(convertFloor(12));
console.log(convertFloor(14));
console.log(convertFloor(16));



let func = (n) => {if (n>10) {let arr = valueof(n);
                                arr.forEach(e => sum = sum + e);
                            console.log(sum);}
                    }
console.log(func(123));