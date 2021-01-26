let deleteRow;
const tableBlock = document.querySelector('.table-responsive');
const signOutBtn = document.querySelector('.out-link');
const sidebarSignOutBtn = document.querySelector('.sidebar-heading');


/* Создание кнопки scroll вверх */

const createToTopBtn = () => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.classList.add('btn-secondary');
    btn.innerHTML = 'Вернуться к началу страницы';
    tableBlock.appendChild(btn);
    btn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });
}


/* Статистика из таблицы */

const showClient = (data) => {
    const client = document.querySelector('.client-info');
    let man = 0;
    let woman = 0;
    let result = [];
    data.forEach(item => {
        let money = item.balance.split('');
        money.splice(0, 1);
        money.splice(money.indexOf(','), 1);
        result.push(+money.join(''));
        if (item.gender === 'female') {
            woman++;
        } else {
            man++;
        }
    });
    client.innerHTML += `
        <div class="client-info-item"><p class="statistic">${man}</p><p class="text">Количество мужчин</p></div>
        <div class="client-info-item"><p class="statistic">${woman}</p><p class="text">Количество женщин</p></div>
        <div class="client-info-item"><p class="statistic">$${Math.max(...result)}</p><p class="text">Лучший баланс</p></div>
    `;

}

/* Объект для получения таблицы */

const clientTableConfig = [{
        header: 'Имя',
        key: 'name'
    },
    {
        header: 'Компания',
        key: 'company'
    },
    {
        header: 'Email',
        key: 'email'
    },
    {
        header: 'Телефон',
        key: 'phone'
    },
    {
        header: 'Баланс',
        key: 'balance'
    },
    {
        header: 'Дата регистрации',
        key: 'registered'
    }
];


/* Создание headers */

const getTableHeader = () => {
    const tHead = document.createElement('thead');
    clientTableConfig.forEach(item => {
        const th = document.createElement('th');
        th.innerHTML = item.header;
        tHead.appendChild(th);
    });
    tHead.lastChild.setAttribute('colspan', 2);
    return tHead;
}


/* Создание таблицы */

const createClientTable = (data) => {
    const table = document.createElement('table');
    table.classList.add('table');
    const tHead = getTableHeader();
    table.appendChild(tHead);
    const tBody = document.createElement('tbody');
    if (data) {
        data.forEach(item => {
            const tr = document.createElement('tr');
            if (item.isActive) {
                tr.classList.add('table-info');
            } else {
                tr.classList.add('table-warning');
            }
            clientTableConfig.forEach(cell => {
                const td = document.createElement('td');
                td.innerHTML = item[cell.key];
                tr.appendChild(td);
            });
            const btn = document.createElement('td');
            btn.classList.add('delete-btn');
            btn.setAttribute('data-modal', 'modal');
            btn.innerHTML = 'X';
            tr.appendChild(btn);
            tBody.appendChild(tr);

        });
        table.appendChild(tBody);
        tableBlock.appendChild(table);
        createToTopBtn();

        document.querySelectorAll('.delete-btn').forEach(item => {
            item.addEventListener('click', () => {
                deleteRow = item;
            });
        });
    }
    /* else {
           preloader.style.display = 'block';
       } */

}


/* Получение данных с сервера */

const getClientTable = () => {

    const users = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json';

    fetch(users)
        .then(resp => { return resp.json() })
        .then(resp => {
            createClientTable(resp);
            showClient(resp);

        })
        .catch(err => { createClientTable() });

}


/* Удаление поля из таблицы */

const deleteClient = () => {
    deleteRow.parentNode.remove();
}


/* Закрытие модального окна */

const closeModal = (modal) => {
    const closeBtn = modal.querySelector('.close');
    const acceptBtn = modal.querySelector('.yes');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            deleteClient();
            modal.classList.remove('active');
            hiddenPush();
        });
    }
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            modal.classList.remove('active');
        }
    });
}


/* Открытие модального */

const openModal = (modal) => {
    modal.classList.add('active');
}


/* Получение модального окно */

const getModal = (event) => {
    const clickElement = event.target.closest('[data-modal]');
    if (clickElement) {
        let target = clickElement.dataset.modal;
        let modalContainer = document.querySelector(`[id="${target}"]`);
        openModal(modalContainer);
        closeModal(modalContainer);
    }
}


/* Уведомление */

const hiddenPush = () => {
    const push = document.querySelector('.push');
    setTimeout(() => {
        push.classList.remove('active');
    }, 5000);
}



/* Google Maps */


const addMarker = (marker, text) => {

    const info = new google.maps.InfoWindow({
        content: `<h3>${text}</h3><p>Простое описание места</p>`
    });

    marker.addListener('click', function() {
        info.open(marker.get('map'), marker);
    });

}

const initMap = () => {

    let options = {
        center: { lat: 53.908974135200616, lng: 27.54828561914526 },
        zoom: 12
    };

    let myMap = new google.maps.Map(document.getElementById('map'), options);

    const message = [{
            text: 'Галерея Минск',
            pos: { lat: 53.908974135200616, lng: 27.54828561914526 }
        },
        {
            text: 'Корона Замок',
            pos: { lat: 53.926720953441226, lng: 27.51770570389915 }
        },
        {
            text: 'Минск Арена',
            pos: { lat: 53.93621714629537, lng: 27.481623840106863 }
        },
        {
            text: 'Футбольный манеж',
            pos: { lat: 53.93333332359918, lng: 27.50795976894175 }
        },
        {
            text: 'Отель Виктория',
            pos: { lat: 53.9219563235819, lng: 27.526806268941293 }
        },
        {
            text: 'Курсы',
            pos: { lat: 53.8975301373703, lng: 27.529059840105322 }
        },
        {
            text: 'Академия связи',
            pos: { lat: 53.92429485232546, lng: 27.666829097776315 }
        },
        {
            text: 'Корона',
            pos: { lat: 53.906689989871175, lng: 27.524429995930696 }
        }
    ];

    message.forEach(item => {
        let lat = item.pos.lat;
        let lng = item.pos.lng;
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map: myMap,
            title: item.text,
        });
        addMarker(marker, item.text);
    });

}

/* Информация об устройстве */

const getDevices = () => {
    const homeHead = document.querySelector('.user');
    const mobileDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i;
    if (mobileDevices.test(navigator.userAgent)) {
        homeHead.innerHTML = 'Добро пожаловать. Вы используете мобильное устройство';
    } else {
        homeHead.innerHTML = 'Добро пожаловать. Вы используете компьютер';
    }
}


/* Получение токена */

const getToken = () => {

    const token = localStorage.getItem('token');
    const tokens = JSON.parse(localStorage.getItem('tokens')) || [];

    if (!token && !tokens.find(item => item === token)) {
        window.location = window.location.origin + '../index.html';
    }

}


/* Выход */

const signOut = () => {
    localStorage.setItem('token', token = []);
    location.reload();

}


document.addEventListener('DOMContentLoaded', () => {


    getToken();

    getDevices();
    getClientTable();
    document.addEventListener('click', getModal);

    signOutBtn.addEventListener('click', signOut);
    sidebarSignOutBtn.addEventListener('click', signOut);


    window.addEventListener('scroll', () => {
        let scrollDistance = pageYOffset;
        let nav = document.querySelector('.nav');
        let link = document.querySelectorAll('.nav a');
        let section = document.querySelectorAll('section');
        section.forEach((item, i) => {
            if (item.offsetTop - nav.clientHeight <= scrollDistance) {
                link.forEach(item => {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });
                document.querySelectorAll('.nav li')[i].querySelector('a').classList.add('active');
            }
        });
    });



    initMap();


});