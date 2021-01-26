const OutBtn = document.querySelector('.out');



// const fields = ['name', 'company', 'email', 'phone', 'balance', 'registered']; 
// TODO: расширить tableConfig
const tableConfig = [
    {
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
  
  const getTHead = () => {
    const tHead = document.createElement('thead');
    tableConfig.forEach((cell) => {
      const cellHead = document.createElement('th');
      cellHead.innerHTML = cell.header;
      tHead.appendChild(cellHead);
    })
    tHead.lastChild.setAttribute('colspan', 2);
    return tHead;
  }
  const createTable = (data) => {
    const table = document.createElement('table');
    const tHead = getTHead();
   // tHead.style.border = 1 + 'px' + ' solid' + ' black';
    table.appendChild(tHead);
    const tBody = document.createElement('tbody');
    if (data) {
      let id = 0 ;
      data.forEach(item => {
        id++;
        const tr = document.createElement('tr');
        tr.id="'row-'+ id";
        const but = document.createElement('button');
        but.classList.add('delete-btn');
        but.id = "'row-' + id + '-delete'";
        but.setAttribute('data-modal', 'modal');
        
        but.style.height = 30 + 'px';
        but.style.width = 30 + 'px';
        tableConfig.forEach((cell) => {
          const td = document.createElement('td');
          td.innerHTML = item[cell.key];
          td.style.padding = 15 + 'px';

          tr.appendChild(td);
          
        });
        
        tBody.appendChild(tr);
        tr.appendChild(but);
        but.innerHTML= 'X';
        but.style.borderRadius = 50 + '%';
        but.style.background ='red';
        

        
      })
    }
    table.appendChild(tBody);
    table.style.width = 100+ '%';
    table.style.borderCollapse = 'collapse';
    table.style.border = 1 + 'px' + ' solid' + ' black';
    document.body.appendChild(table);

    document.querySelectorAll('.delete-btn').forEach(item => {
      item.addEventListener('click', () => {
          deleteRow = item;
      });
    });
    
  };
  
  

  const getTable = () => {
    const url = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json';
    fetch(url)
      .then(response => response.json())
      .then(response => createTable(response))
      .catch(error => createTable());
  }
  
  


  const deleteClient = () => {
    deleteRow.parentNode.remove();
}

const openModal = (modal) => {
  modal.classList.add('active');
}


const getModal = (event) => {
  const clickElement = event.target.closest('[data-modal]');
  if (clickElement) {
      let target = clickElement.dataset.modal;
      let modalContainer = document.querySelector(`[id="${target}"]`);
      openModal(modalContainer);
      closeModal(modalContainer);
  }
}
  
  but.addeventlistnet('click', deleteDialog());
  const deleteDialog = (e) => {
    
    const id = e?.target?.id?.split('-')[1];
    const div = document.createElement('div');
    div.id = 'dialog';
    div.style.zIndex = 80;
    div.style.width = 300 +'px';
    div.style.height= 100 + 'px';
    const butcancel = document.createElement('button');
    const butdelete = document.createElement('button');
    body.appendChild(div);
    div.appendChild(butcancel);
    butcancel.addEventListener('click', closedialog());

    const closedialog = () => {
      const dialog = document.getElementById('dialog');
      dialog.remove();

    }
  }


  
 

  document.addEventListener('click', getModal);


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




const getToken = () => {

  const token = localStorage.getItem('token');
  const tokens = JSON.parse(localStorage.getItem('tokens')) || [];

  if (!token && !tokens.find(item => item === token)) {
      window.location = window.location.origin + '../index.html';
  }

}

const signOut = () => {
  localStorage.setItem('token', token = []);
  location.reload();

}

document.addEventListener('DOMContentLoaded', () => {


  getToken();

  
  getTable();
 // document.addEventListener('click', getModal());

  OutBtn.addEventListener('click', signOut());

});

/* Открытие модального */

/*const openModal = (modal) => {
    modal.classList.add('active');
}


/* Получение модального окно */

/*const getModal = (event) => {
    const clickElement = event.target.closest('[data-modal]');
    if (clickElement) {
        let target = clickElement.dataset.modal;
        let modalContainer = document.querySelector(`[id="${target}"]`);
        openModal(modalContainer);
        closeModal(modalContainer);
    }
}



const hiddenPush = () => {
    const push = document.querySelector('.push');
    setTimeout(() => {
        push.classList.remove('active');
    }, 5000);
}*/
