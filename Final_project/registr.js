
const cartreg = document.querySelector('.cartreg');
const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

// const validitEmail = (e) => {
    //  const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //  if (!regex.test(email.value)){
       
    //   generateError(email, 'Введите корректный email')
    //  }
// }

const generateError = (elem, text) => {
    const span = document.createElement('span');
    span.classList.add('invalid-feedback');
    span.style.display = 'block';
    span.innerHTML = text;
    elem.after(span);
}

const setToken = () => {
    const symbolArr = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        let index = Math.floor(Math.random() * symbolArr.length);
        randomString += symbolArr[index];
    }
    const token = `${randomString}${(+new Date()).toString(16)}`;
    const tokens = JSON.parse(localStorage.getItem('tokens')) || [];
    tokens.push(token);
    localStorage.setItem('tokens', JSON.stringify(tokens)); //Back
    localStorage.setItem('token', token);


    if (token && !!tokens.find(item => item === token)) {
        window.location = window.location.origin + '/dashboard/dashboard.html';
    } else {
        window.location = window.location.origin + '/index.html';
    }

}


const getToken = () => {

    const token = localStorage.getItem('token');
    const tokens = JSON.parse(localStorage.getItem('tokens')) || [];

    if (token && !!tokens.find(item => item === token)) {
        window.location = window.location.origin + '/dashboard/dashboard.html';
    }

}


const regUser = (Form) => {

    const form = document.querySelector('.cartreg');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = e.target.email;
            const password = e.target.password;
            const confPassword = e.target.confPassword;

            document.querySelectorAll('.invalid-feedback').forEach(item => {
                item.remove();
            });

            if (!email.value) {
                generateError(email, 'Введите email');
            }  else if (!reg.test(email.value)) {
                generateError(email, 'Введите корректный email');
            }
            

            if (!password.value) {
                generateError(password, 'Введите пароль');
            
            } else if (!confPassword.value) {
                generateError(confPassword, 'Повторите пароль');
            } else if (password.value != confPassword.value) {
                generateError(confPassword, 'Пароли не совпадают');
            }


            if (document.querySelectorAll('.invalid-feedback').length === 0) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.push({ email: email.value, password: password.value });
                localStorage.setItem('users', JSON.stringify(users));
                setToken();
                form.reset();
            }

        });
    }

}


document.addEventListener('DOMContentLoaded', () => {
    
    regUser('.cartreg');
    getToken();
});
