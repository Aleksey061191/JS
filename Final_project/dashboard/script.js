const signUp = document.querySelector('.signup');
const signIn = document.querySelector('.sigin');
const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;


/* Регистрация, автоизация */

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
        window.location = window.location.origin + '/dashboard/';
    } else {
        window.location = window.location.origin + '/index.html';
    }

}

/* Получение токена */

const getToken = () => {

    const token = localStorage.getItem('token');
    const tokens = JSON.parse(localStorage.getItem('tokens')) || [];

    if (token && !!tokens.find(item => item === token)) {
        window.location = window.location.origin + '/dashboard/';
    }

}





const authUser = (Form) => {

    const form = document.querySelector(Form);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = e.target.email;
            const password = e.target.password;

            document.querySelectorAll('.invalid-feedback').forEach(item => {
                item.remove();
            });

            if (!email.value) {
                generateError(email, 'Введите email');
            } else if (!reg.test(email.value)) {
                generateError(email, 'Введите корректный email');
            }

            if (!password.value) {
                generateError(password, 'Введите пароль');
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];

            let { email: userEmail, password: userPassword } = users.find(item => item.email === email.value) || [];


            if (email.value && email.value != userEmail) {
                generateError(email, 'Такой почты не существует');
            } else if (password.value && password.value != userPassword) {
                generateError(password, 'Неправильный пароль');
            }



            if (document.querySelectorAll('.invalid-feedback').length === 0) {
                setToken();
                form.reset();
            }
        });
    }

}







const regUser = (Form) => {

    const form = document.querySelector(Form);

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
            } else if (!reg.test(email.value)) {
                generateError(email, 'Введите корректный email');
            }

            if (!password.value) {
                generateError(password, 'Введите пароль');
            } else if (password.value.length < 8 || password.value.length > 15) {
                generateError(password, 'Пароль должен быть не меньше 8 и не больше 15 символов');
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
    authUser('.signin');
    regUser('.signup');
    getToken();
});