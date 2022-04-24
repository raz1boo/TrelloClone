// верстка
document.body.innerHTML = `
<div id='bg-image-color'></div>
<header>
<a href="#" class="logo"></a>
<div class="header_tools">
    <input type="text" placeholder="Search.." id='search' autocomplete="off">
    <button id='settings-button'><img src="../assets/icons/gear.png"></button>
</div>
</header>
<main>
<div class="wrapper">
    <div class="list-wrapper todo">
        <div class="head-box">ToDo</div>
        <button id="add-todo-button">✚</button>
        <div id="description-box">
            <select id='point-select' class='point' name='points'>
                <option value="#0079bf" class='blue'></option>
                <option value="#f2d600" class='yellow'></option>
                <option value="#61bd4f" class='green'></option>
                <option value="#eb5a46" class='red'></option>
            </select>
            <input type="text" placeholder="Title..." id="description_title_input" maxlength='25'>
            <textarea type="text" id="todo-description" placeholder="Description..." maxlength='1000'></textarea>
            <select name="users" id="user-select" class="user"></select>
            <button id="confirm-form">✚</button>
            <button id="close-form">✖</button>
        </div>
        <div id="add" class='footer-box'></div>
    </div>
    <div class="list-wrapper inprogress">
        <div class="head-box">In Progress</div>
        <div class="footer-box" id='inprogress'></div>
    </div>
    <div class="list-wrapper done">
        <div class="head-box">Done<button id="delete-all-button"><img src="../assets/icons/delete.png"></button>
        </div>
        <div class="footer-box" id='done'></div>
    </div>
</div>
</main>
<div id="quick-card-editor">
<div id='quick-card-editor-close-card'></div>
<div id="quick-card-editor-card">
    <div id="quick-card-newCard">
        <select id='quick-card-point'>
            <option value="#0079bf" class='blue'></option>
            <option value="#f2d600" class='yellow'></option>
            <option value="#61bd4f" class='green'></option>
            <option value="#eb5a46" class='red'></option>
        </select>
        <input class="quick-card-title" id='title-description' maxlength='25'
            autocomplete="off"></input>
        <textarea type='text' class='todo-value quick-card-text' id='card-text' maxlength='1000'></textarea>
        <div class='card-footer'>
            <select id='quick-card-user'></select>
            <div id='quick-card-date'></div>
        </div>
    </div>
</div>
<span id="quick-card-editor-close-icon"></span>
</div>
<div id="board-menu-wrapper">
<div class="board-menu-header">
    Settings
    <button id='close-button-board-menu'>✖</button>
</div>
<hr class="board-menu-header-divider">
<div class="board-menu-list">
    <div id="board-menu-box">
        <div id="mini-display-bg"></div>
        <p>Change background..</p>
    </div>
    <div id="background-preview-scroll-box">
        <div class="bg-scroll-box-head">
            <div id="bg-scroll-box-head_image-box"><img src="./assets/images/board-preview.svg"></div>
        </div>
        <div id="bg-scroll-box-purpose">
            <p>Background</p>
            <div id="background-images-purpose"></div>
            <div id="background-colors-purpose">
                <div id='bg-work-place-colors-purpose'>
                    <div class="color-purpose-box yellow" id='#f2d600'></div>
                    <div class="color-purpose-box green" id='#61bd4f'></div>
                    <div class="color-purpose-box purple" id='#89609E'></div>
                </div>
                <div id="three-dots"><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill="currentColor"></path></svg></div>
            </div>
        </div>
    </div>
    <div id="background-scroll-box">
        <div class="background-image-box">
            <div id="background-image-small-box" class='small-box'></div>
            <p>Photos</p>
        </div>
        <div class="background-color-box">
            <div id="background-color-small-box" class='small-box'></div>
            <p>Colors</p>
        </div>
    </div>
    <div id="background-images-scroll-box"></div>
    <div id="background-colors-scroll-box">
        <div class="blue small-box" id='#0079bf'></div>
        <div class="yellow small-box" id='#f2d600'></div>
        <div class="green small-box" id='#61bd4f'></div>
        <div class="red small-box" id='#eb5a46'></div>
        <div class="purple small-box" id='#89609E'></div>
        <div class="pink small-box" id='#cd5a91'></div>
    </div>
</div>
</div>
`
// объявляем переменные
const input = document.getElementById('todo-description');
const titleText = document.getElementById('description_title_input');
const addFooter = document.getElementById('add');
const inprogressFooter = document.getElementById('inprogress');
const doneFooter = document.getElementById('done');
let todoItemsElems = [];
// Генерация даты
let date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
let id = 0;
let cardArray = [];
let previousCardArray = [];
let backgroundColor = JSON.parse(localStorage.getItem('bg')) || "#0079bf";
// при перезагрузке страницы задает бэкграунды
document.getElementById('bg-image-color').style.backgroundColor = `${backgroundColor}`;
document.getElementById('bg-image-color').style.backgroundImage = `${backgroundColor}`;
document.getElementById('bg-scroll-box-head_image-box').style.backgroundImage = `${backgroundColor}`;
document.getElementById('bg-scroll-box-head_image-box').style.backgroundColor = `${backgroundColor}`;
document.getElementById('mini-display-bg').style.backgroundImage = `${backgroundColor}`;
document.getElementById('mini-display-bg').style.backgroundColor = `${backgroundColor}`;
// при обновлении страницы обнуляет массив и записывает его заново
async function getData() {
    await fetch('https://62585363e4e0b731428afe6e.mockapi.io/tms/users/array')
        .then(response => response.json())
        .then(json => {
            cardArray = [];
            json.forEach(i => {
                cardArray.push(i);
            })
            htmlText();
        })
}
// Создание объекта с нужными значениями
function todo(val, id, tit, us, point) {
    this.objectId = id;
    this.date = date;
    this.title = tit;
    this.text = val;
    this.user = us;
    this.point = point;
    this.position = 'add';
}
// Создает блок и задает значения для него и для дочерних элементов
const createTemplate = (inp, index) => {
    return `
    <div class='newCard' id='newCard-${index}' draggable="true" >
        <div id='point-${index}' class='point' style='background-color:${inp.point}'></div>
        <div class='card-header'>
            <div class="title-description">${inp.title}</div>
            <div class='title-header-buttons'>
                <button onclick='editTask(${index})' class='button'><img src='../assets/icons/edit.png'></button>
                <button onclick='deleteTask(${index})' class='button'>✖</button>
            </div>
        </div>
        <div class='todo-value'>${inp.text}</div>
        <div class='card-footer'>
            <div id="user-${index}" class='card-user'>${inp.user}</div>
            <div id='date-${index}' class='card-date'>${inp.date}</div>
        </div>
    </div>
`
}
// перезаписывает информацию на сервере
const localUpdate = async (flag) => {
    let condition = flag ? previousCardArray.length : cardArray.length;

    for (let i = 1; i <= condition; i++) {
        await fetch(`https://62585363e4e0b731428afe6e.mockapi.io/tms/users/array/${i}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
    }

    for (let i = 0; i < cardArray.length; i++) {
        await fetch('https://62585363e4e0b731428afe6e.mockapi.io/tms/users/array', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(cardArray[i])
        })
    }
};
// вставляет пользователей в select
function printUsers(json) {
    json.forEach(i => {
        document.getElementById('user-select').innerHTML += `<option>${i.name}</option>`
        document.getElementById('quick-card-user').innerHTML += `<option>${i.name}</option>`
    })
}
// вставляет в блок принятые фотки
function printBgs(json) {
    json.forEach(i => {
        document.getElementById('background-images-scroll-box').innerHTML += `<div class='small-box' style='background-image: url(${i.download_url})'></div>`;
    })
    document.getElementById('background-images-purpose').innerHTML += `<div class='image-purpose-box' style='background-image: url(${json[Math.floor(Math.random() * 100) + 1].download_url})'></div>`
    document.getElementById('background-images-purpose').innerHTML += `<div class='image-purpose-box' style='background-image: url(${json[Math.floor(Math.random() * 100) + 1].download_url})'></div>`
    document.getElementById('background-images-purpose').innerHTML += `<div class='image-purpose-box' style='background-image: url(${json[Math.floor(Math.random() * 100) + 1].download_url})'></div>`
    document.getElementById('background-images-purpose').innerHTML += `<div class='image-purpose-box' style='background-image: url(${json[Math.floor(Math.random() * 100) + 1].download_url})'></div>`
}
// запрашивает на сервере пользователей и фотки
function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users/')
        .then(response => response.json())
        .then(json => {
            printUsers(json)
        })
    fetch(`https://picsum.photos/v2/list?page=2&limit=100`)
        .then(response => response.json())
        .then(json => {
            printBgs(json)
        })

}
// Функция сохраняет значения в localStorage и задает текст блоков(при перезагрузке страницы и не только)
// проверяет наличие 'блока' в массиве и выводит его(заново прорисовывает все блоки из массива, при удалении, при добавлении)
const htmlText = (flag) => {
    addFooter.innerText = '';
    inprogressFooter.innerText = '';
    doneFooter.innerText = '';
    if (cardArray.length > 0) {
        cardArray.forEach((item, index) => {
            if (cardArray[index].position == 'add') addFooter.innerHTML += createTemplate(item, index);
            if (cardArray[index].position == 'inprogress') inprogressFooter.innerHTML += createTemplate(item, index);
            if (cardArray[index].position == 'done') doneFooter.innerHTML += createTemplate(item, index);
        });
        todoItemsElems = document.querySelectorAll('.newCard');
    }
    localUpdate(flag);
    dragNdrop();
}
getData();
getUsers();
// Функция проверяет наличие текста в инпуте, далее записывает значение в объект из которого берется значение
// обнуляет инпут
document.getElementById('confirm-form').addEventListener('click', () => {
    if (input.value == '' || titleText.value == '') {
        input.placeholder = 'Write a description..';
        titleText.placeholder = 'Write a title..';
        return
    } else {
        id++
        cardArray.push(new todo(input.value, id, titleText.value, document.getElementById('user-select').value, document.getElementById('point-select').value));
        input.value = '';
        input.placeholder = 'Description..'
        titleText.value = '';
        titleText.placeholder = 'Title..';
        input.style.height = '60px'
    }
    htmlText();
})
// нажатие на + 
document.getElementById('add-todo-button').addEventListener('click', () => {
    document.getElementById('description-box').style.display = 'block';
    document.getElementById('add-todo-button').style.display = 'none';
})
// нажатие на close
document.getElementById('close-form').addEventListener('click', (e) => {
    document.getElementById('description-box').style.display = 'none';
    titleText.value = '';
    input.value = '';
    input.style.height = '60px';
    document.getElementById('add-todo-button').style.display = 'block';
})
// изменение высоты блока ввода описания
document.querySelector('textarea').addEventListener('input', function () {
    this.style.cssText = 'height:' + this.scrollHeight + 'px';
})
// функция удаляет блок
const deleteTask = index => {
    previousCardArray = [...cardArray];
    cardArrplit('')(index, 1);
    htmlText('delete');
}
// вычесление координат элемента
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: Math.round(box.top + pageYOffset),
        left: Math.round(box.left + pageXOffset)
    };
}
// изменение блока
const editTask = index => {
    // выставляет блок эдита по координатам блока-родителя(который мы пытаемся изменить)
    document.getElementById('quick-card-editor-card').style.top = `${getCoords([...todoItemsElems].find(i=>i.id == `newCard-${index}`)).top - 15}px`;
    document.getElementById('quick-card-editor-card').style.left = `${getCoords([...todoItemsElems].find(i=>i.id == `newCard-${index}`)).left}px`;
    if (document.getElementById('card-editor-button-confirm')) {
        document.getElementById('card-editor-button-confirm').remove()
    }
    document.getElementById('quick-card-editor-card').innerHTML += `<button id="card-editor-button-confirm" onclick='confirmChangesCard(${index})'>Confirm</button>`
    document.getElementById('title-description').value = `${cardArray[index].title}`;
    document.getElementById('card-text').value = `${cardArray[index].text}`;
    document.getElementById('quick-card-user').value = `${cardArray[index].user}`;
    document.getElementById('quick-card-date').innerText = `${cardArray[index].date}`;
    document.getElementById('quick-card-newCard').style.boxShadow = 'none';
    document.getElementById('quick-card-point').style.backgroundColor = `${cardArray[index].point}`;
    document.getElementById('quick-card-point').value = `${cardArray[index].point}`;
    document.getElementById('quick-card-point').addEventListener('change', function () {
        if (this.value == '#f2d600') {
            this.style.cssText = 'background-color: #f2d600;';
        } else if (this.value == '#0079bf') {
            this.style.cssText = 'background-color: #0079bf;'
        } else if (this.value == '#eb5a46') {
            this.style.cssText = 'background-color: #eb5a46;'
        } else if (this.value == '#61bd4f') {
            this.style.cssText = 'background-color: #61bd4f;'
        }
    })
    document.getElementById('quick-card-editor').style.display = 'block';
}
// закрывает окно редактирования
document.getElementById('quick-card-editor-close-icon').addEventListener('click', () => {
    document.getElementById('quick-card-editor').style.display = 'none';
})
// при рандомном клике по экрану закрывает окно редактирования
document.getElementById('quick-card-editor-close-card').addEventListener('click', () => {
    document.getElementById('quick-card-editor').style.display = 'none';
})
// вписывает в массив новые данные и закрывает окно редактирования
const confirmChangesCard = index => {
        cardArray[index].title = document.getElementById(`title-description`).value;
        cardArray[index].text = document.getElementById(`card-text`).value;
        cardArray[index].user = document.getElementById('quick-card-user').value;
        cardArray[index].point = document.getElementById('quick-card-point').value;
        document.getElementById('quick-card-editor').style.display = 'none';
        htmlText();
}
document.getElementById('point-select').addEventListener('change', function () {
    if (this.value == '#f2d600') {
        this.style.cssText = 'background-color: #f2d600;'
    } else if (this.value == '#0079bf') {
        this.style.cssText = 'background-color: #0079bf;'
    } else if (this.value == '#eb5a46') {
        this.style.cssText = 'background-color: #eb5a46;'
    } else if (this.value == '#61bd4f') {
        this.style.cssText = 'background-color: #61bd4f;'
    }
})
// прекращает работу TAB(от багов)
document.addEventListener('keydown', function (e) {
    if (e.which == 9) {
        e.preventDefault();
    }
});
// dragNdrop
let draggedItem = null;

function dragNdrop() {
    const items = document.querySelectorAll('.newCard');
    const lists = document.querySelectorAll('.footer-box');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.addEventListener('mousedown', () => {
            draggedItem = item;

        })
        item.addEventListener('mouseup', () => {
            draggedItem = null;
        })
        for (let l = 0; l < lists.length; l++) {
            const list = lists[l];
            list.addEventListener('dragover', e => e.preventDefault())
            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.borderColor = '#091e4214';
            })
            list.addEventListener('dragleave', function (e) {
                e.preventDefault();
                this.style.borderColor = 'transparent';
            })
            list.addEventListener('drop', function (e) {
                e.preventDefault();
                this.style.borderColor = 'transparent';
                this.append(draggedItem);
                if (this.id == 'inprogress') {
                    if (item === draggedItem) {
                        cardArray[item.plit('')(8)].position = `${this.id}`;
                        localUpdate();
                        return
                    }
                }
                if (this.id == 'done') {
                    if (item === draggedItem) {
                        cardArray[item.id.slice(8)].position = `${this.id}`;
                        localUpdate();
                        return
                    }
                }
                if (this.id == 'add') {
                    if (item === draggedItem) {
                        cardArray[item.id.slice(8)].position = `${this.id}`;
                        localUpdate();
                        return
                    }
                }
            })
        }
    }
}

// удаление всех блоков в done, очищение массива
document.getElementById('delete-all-button').addEventListener('click', () => {
    previousCardArray = [...cardArray];
    cardArray = cardArray.filter(item => item.position !== 'done');
    htmlText('delete all');
})
// поиск
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        for (let i = 0; i < cardArray.length; i++) {
            if (cardArray[i].title[0] == document.getElementById('search').value || cardArray[i].title[1] == document.getElementById('search').value || cardArray[i].title[2] == document.getElementById('search').value || cardArray[i].title == document.getElementById('search').value || cardArray[i].title[0]+cardArray[i].title[1] == document.getElementById('search').value) {
                [...todoItemsElems].find(item=>item.id == `newCard-${i}`).classList.add('block');
                [...todoItemsElems].find(item=>item.id == `newCard-${i}`).classList.remove('none');
            } else {
                [...todoItemsElems].find(item=>item.id == `newCard-${i}`).classList.add('none');
                [...todoItemsElems].find(item=>item.id == `newCard-${i}`).classList.remove('block');
            }
        }
    }
})
document.getElementById('search').addEventListener('input', () => {
    for (let i = 0; i < cardArray.length; i++) {
        if (document.getElementById('search').value == '') {
            todoItemsElems[i].classList.add('block');
            todoItemsElems[i].classList.remove('none');
        }
    }
})
// модальное окно для смены фона
document.getElementById('settings-button').addEventListener('click', () => {
    document.getElementById('board-menu-wrapper').style.transform = 'translateX(0rem)';
    document.getElementById('board-menu-box').style.display = 'flex';
    document.getElementById('background-preview-scroll-box').style.transform = 'translateX(20rem)';
    document.getElementById('background-scroll-box').style.transform = 'translateX(20rem)';
    document.getElementById('background-images-scroll-box').style.display = 'flex';
    document.getElementById('background-colors-scroll-box').style.display = 'flex';
    document.getElementById('background-preview-scroll-box').style.display = 'flex';
    document.getElementById('background-scroll-box').style.display = 'flex';
    document.getElementById('background-colors-scroll-box').style.transform = 'translateX(20rem)';
    document.getElementById('background-images-scroll-box').style.transform = 'translateX(20rem)';
})
document.getElementById('close-button-board-menu').addEventListener('click', () => {
    document.getElementById('board-menu-wrapper').style.transform = 'translateX(20rem)';
})
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 27) {
        document.getElementById('quick-card-editor').style.display = 'none';
        document.getElementById('board-menu-wrapper').style.transform = 'translateX(20rem)';
    };
})
document.getElementById('board-menu-box').addEventListener('click', () => {
    document.getElementById('background-preview-scroll-box').style.transform = 'translateX(0rem)';
    document.getElementById('board-menu-box').style.display = 'none'
})

document.getElementById('background-color-small-box').addEventListener('click', () => {
    document.getElementById('background-scroll-box').style.display = 'none';
    document.getElementById('background-images-scroll-box').style.display = 'none';
    document.getElementById('background-colors-scroll-box').style.transform = 'translateX(0rem)';
})

document.getElementById('background-image-small-box').addEventListener('click', () => {
    document.getElementById('background-scroll-box').style.display = 'none';
    document.getElementById('background-colors-scroll-box').style.display = 'none';
    document.getElementById('background-images-scroll-box').style.transform = 'translateX(0rem)';
})

document.getElementById('background-colors-scroll-box').addEventListener('click', function (e) {
    document.getElementById('bg-image-color').style.backgroundImage = 'none';
    document.getElementById('bg-image-color').style.backgroundColor = `${e.target.id}`;
    document.getElementById('mini-display-bg').style.backgroundImage = 'none';
    document.getElementById('mini-display-bg').style.backgroundColor = `${e.target.id}`;
    backgroundColor = [JSON.stringify(e.target.id)];
    document.getElementById('board-menu-wrapper').style.transform = 'translateX(20rem)';
    localStorage.setItem('bg', backgroundColor)
})
document.getElementById('background-images-scroll-box').addEventListener('click', function (e) {
    document.getElementById('bg-image-color').style.backgroundImage = `${e.target.style.backgroundImage}`;
    backgroundColor = [JSON.stringify(e.target.style.backgroundImage)];
    document.getElementById('board-menu-wrapper').style.transform = 'translateX(20rem)';
    document.getElementById('mini-display-bg').style.backgroundImage = `${e.target.style.backgroundImage}`;
    localStorage.setItem('bg', backgroundColor)
})

document.getElementById('three-dots').addEventListener('click', () => {
    document.getElementById('background-preview-scroll-box').style.display = 'none';
    document.getElementById('background-scroll-box').style.transform = 'translateX(0rem)';
})

document.getElementById('bg-work-place-colors-purpose').addEventListener('click', function (e) {
    document.getElementById('bg-image-color').style.backgroundImage = 'none';
    document.getElementById('mini-display-bg').style.backgroundImage = 'none';
    document.getElementById('mini-display-bg').style.backgroundColor = `${e.target.id}`;
    document.getElementById('bg-image-color').style.backgroundColor = `${e.target.id}`;
    backgroundColor = [JSON.stringify(e.target.id)];
    document.getElementById('board-menu-wrapper').style.transform = 'translateX(20rem)';
    localStorage.setItem('bg', backgroundColor)
})
document.getElementById('background-images-purpose').addEventListener('click', function (e) {
    document.getElementById('bg-image-color').style.backgroundImage = `${e.target.style.backgroundImage}`;
    document.getElementById('mini-display-bg').style.backgroundImage = `${e.target.style.backgroundImage}`;
    backgroundColor = [JSON.stringify(e.target.style.backgroundImage)];
    document.getElementById('board-menu-wrapper').style.transform = 'translateX(20rem)';
    localStorage.setItem('bg', backgroundColor)
})

document.getElementById('bg-scroll-box-purpose').addEventListener('mouseover', function (e) {
    if (e.target.style.backgroundImage !== '') document.getElementById('bg-scroll-box-head_image-box').style.backgroundImage = `${e.target.style.backgroundImage}`;
    if (e.target.id == '#61bd4f' || e.target.id == '#f2d600' || e.target.id == '#89609E') {
        document.getElementById('bg-scroll-box-head_image-box').style.backgroundImage = 'none';
        document.getElementById('bg-scroll-box-head_image-box').style.backgroundColor = `${e.target.id}`;
    }
})