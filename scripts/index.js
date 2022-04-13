// верстка
document.getElementById('root').innerHTML = `
<main>
<div class="wrapper">
    <div class="list-wrapper todo">
        <div class="head-box">
            <p class="head-box-description">ToDo</p>
        </div>
        <button id="add-todo-button">✚</button>
        <div id="description-box">
        <select id='point-select' name='points'>
            <option value="#0079bf" class='blue'></option>
            <option value="#f2d600" class='yellow'></option>
            <option value="#61bd4f" class='green'></option>
            <option value="#eb5a46" class='red'></option>
        </select>
        <input type="text" placeholder="Title.." id="title-input" maxlength='35'>
        <textarea type="text" id="todo-description" placeholder="Description.."></textarea>
        <select name="users" id="user-select"></select>
        <button id="confirm-form">✚</button>
        <button id="close-form">✖</button>
        </div>
        <div id="footer-box__add" class='footer-box'></div>
    </div>
    <div class="list-wrapper inprogress">
        <div class="head-box">
            <p class="head-box-description">In Progress</p>
        </div>
        <div class="footer-box"></div>
    </div>
    <div class="list-wrapper done">
        <div class="head-box">
            <p class="head-box-description">Done</p>
            <button id="delete-all-button"></button>
        </div>
        <div class="footer-box"></div>
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
                <option value="#eb5a46" class='red'></option></select>
            <input class="title-description quick-card-title" id='title-description'maxlength='35' autocomplete="off"></input>
            <textarea type='text' class='todo-value quick-card-text' id='card-text'></textarea>
            <div class='card-footer'>
                <select id='quick-card-user'></select>
                 <div id='quick-card-date'></div>
        </div></div>
    </div>
    <span id="quick-card-editor-close-icon"></span>
</div>
`
// объявляем переменные
const input = document.getElementById('todo-description');
const titleText = document.getElementById('title-input');
const cardFooter = document.getElementById('footer-box__add');
let todoItemsElems = [];
// Генерация даты
let date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
// Объявление переменных для localStorage
let cardArray = JSON.parse(localStorage.getItem('cardArray')) || [];
let id = JSON.parse(localStorage.getItem('id')) || 0;
// Создание объекта с разными нужными значениями
function todo(val, id, tit, us, point) {
    this.id = id;
    this.date = date;
    this.text = val;
    this.title = tit;
    this.user = us;
    this.point = point;
}
// Создает блок и задает значения для него и для дочерних элементов
const createTemplate = (inp, index) => {
    return `
    <div class='newCard' id='newCard-${index}' draggable="true" >
        <div id='point-${index}' class='point' style='background-color:${inp.point}'></div>
        <div class='card-header'>
            <div class="title-description">${inp.title}</div>
            <div class='title-header-buttons'>
                <button onclick='editTask(${index})' class='button' id='edit-button'></button>
                <button onclick='deleteTask(${index})' class='button'>✖</button>
            </div>
        </div>
        <div class='todo-value'>${inp.text}</div>
        <div class='card-footer'>
            <div id="user-${index}" class='user'>${inp.user}</div>
            <div id='date-${index}'>${inp.date}</div>
        </div>
    </div>
`
}
//
const localUpdate = () => {
    localStorage.setItem('cardArray', JSON.stringify(cardArray));
    localStorage.setItem('id', id);
    // counters();
}
function printUsers(json) {
    console.log(json);
    json.forEach(i => {
        document.getElementById('user-select').innerHTML += `<option>${i.name}</option>`
        document.getElementById('quick-card-user').innerHTML += `<option>${i.name}</option>`
    })
}
function getUsers() {
    fetch(`https://jsonplaceholder.typicode.com/users/`)
        .then(response => response.json())
        .then(json => { printUsers(json) })
}
// Функция сохраняет значения в localStorage и задает текст блоков(при перезагрузке страницы и не только)
// проверяет наличие 'блока' в массиве и выводит его(заново прорисовывает все блоки из массива, при удалении, при добавлении)
const htmlText = () => {
    cardFooter.innerText = '';
    if (cardArray.length > 0) {
        cardArray.forEach((item, index) => {
            cardFooter.innerHTML += createTemplate(item, index);
        });
        todoItemsElems = document.querySelectorAll('.newCard');
    }
    localUpdate()
    console.log(todoItemsElems);
}
htmlText()
getUsers()
dragNdrop()
// Функция проверяет наличие текста в инпуте, далее записывает значение в объект из которого берется значение
// обнуляет инпут
document.getElementById('confirm-form').addEventListener('click', () => {
    if (input.value == '' || titleText.value == '') {
        input.placeholder = 'Write a description..'
        titleText.placeholder = 'Write a title..'
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
document.getElementById('add-todo-button').addEventListener('click', () => {
    document.getElementById('description-box').style.display = 'block';
    document.getElementById('add-todo-button').style.display = 'none';
})
document.getElementById('close-form').addEventListener('click', (e) => {
    document.getElementById('description-box').style.display = 'none';
    titleText.value = '';
    input.value = '';
    input.style.height = '60px';
    document.getElementById('add-todo-button').style.display = 'block';
})
document.querySelector('textarea').addEventListener('input', function () {
    this.style.cssText = 'height:' + this.scrollHeight + 'px';
})
// функция удаляет блок, удаляет из массива этот блок
const deleteTask = index => {
    cardArray.splice(index, 1);
    if (cardArray == 0) id = 0;
    htmlText()
}
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: Math.round(box.top + pageYOffset),
        left: Math.round(box.left + pageXOffset)
    };
}
const editTask = index => {
    document.getElementById('quick-card-editor-card').style.top = `${getCoords(todoItemsElems[index]).top - 7}px`;
    document.getElementById('quick-card-editor-card').style.left = `${getCoords(todoItemsElems[index]).left}px`;
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
    document.getElementById('quick-card-point').addEventListener('change', function () {
        if (this.value == '#f2d600') { this.style.cssText = 'background-color: #f2d600;' }
        else if (this.value == '#0079bf') { this.style.cssText = 'background-color: #0079bf;' }
        else if (this.value == '#eb5a46') { this.style.cssText = 'background-color: #eb5a46;' }
        else if (this.value == '#61bd4f') { this.style.cssText = 'background-color: #61bd4f;' }
    })
    document.getElementById('card-text').style.height = `${this.scrollHeight}px`;
    document.getElementById('card-text').addEventListener('input', function () {
        this.style.height = `${this.scrollHeight}px`;
    })
    document.getElementById('quick-card-editor').style.display = 'block';
}
// закрывает окно редактирования
document.getElementById('quick-card-editor-close-icon').addEventListener('click', () => {
    document.getElementById('card-text').style.height = `160px`;
    document.getElementById('quick-card-editor').style.display = 'none';
})
document.getElementById('quick-card-editor-close-card').addEventListener('click', () => {
    document.getElementById('card-text').style.height = `160px`;
    document.getElementById('quick-card-editor').style.display = 'none';
})
// вписывает в массив новые данные и закрывает окно редактирования
const confirmChangesCard = index => {
    if (document.getElementById(`title-description`).value && document.getElementById(`card-text`).value) {
        cardArray[index].title = document.getElementById(`title-description`).value;
        cardArray[index].text = document.getElementById(`card-text`).value;
        cardArray[index].user = document.getElementById('quick-card-user').value;
        cardArray[index].point = document.getElementById('quick-card-point').value;
        document.getElementById('quick-card-editor').style.display = 'none';
        htmlText();
    }
}
document.getElementById('point-select').addEventListener('change', function () {
    if (this.value == '#f2d600') { this.style.cssText = 'background-color: #f2d600;' }
    else if (this.value == '#0079bf') { this.style.cssText = 'background-color: #0079bf;' }
    else if (this.value == '#eb5a46') { this.style.cssText = 'background-color: #eb5a46;' }
    else if (this.value == '#61bd4f') { this.style.cssText = 'background-color: #61bd4f;' }
})

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
                this.style.border = '1px dotted black';
            })
            list.addEventListener('dragleave', function (e) {
                e.preventDefault();
                this.style.border = 'none';
            })
            list.addEventListener('drop', function () {
                this.style.border = 'none';
                this.append(draggedItem);
            })
        }
    }
}










// удаление всех блоков, очищение массива
// document.getElementById('delete-all-button').addEventListener('click', () => {
//     cardArray = [];
//     id = 0;
//     todoItemsElems = [];
//     htmlText()
// })
// поиск
// search.addEventListener('keyup', () => {
//     for (let i = 0; i < cardArray.length; i++) {
//         if (cardArray[i].text == search.value) {
//             todoItemsElems[i].classList.add('block');
//             todoItemsElems[i].classList.remove('none');
//         }
//         else {
//             todoItemsElems[i].classList.add('none');
//             todoItemsElems[i].classList.remove('block');
//         }
//         if (search.value == 0) {
//             todoItemsElems[i].classList.add('block');
//             todoItemsElems[i].classList.remove('none');
//         }
//     }
// })

// функция управления счетчиками
// function counters() {
//     let c = 0;
//     for (let i = 0; i < cardArray.length; i++) {
//         if (cardArray[i].isChecked) c++
//     }
//     counterAll.innerText = `All: ${todoItemsElems.length}`;
//     complete.innerText = `Completed: ${c}`;
// }