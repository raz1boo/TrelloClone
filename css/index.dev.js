"use strict";

// верстка
document.body.innerHTML = "\n<header>\n<a href=\"#\" class=\"logo\"></a>\n<div class=\"header_tools\">\n    <input type=\"text\" placeholder=\"Search..\">\n    <button><img src=\"../assets/icons/gear.png\"></button>\n</div>\n</header>\n<main>\n<div class=\"wrapper\">\n    <div class=\"list-wrapper todo\">\n        <div class=\"head-box\">ToDo</div>\n        <button id=\"add-todo-button\">\u271A</button>\n        <div id=\"description-box\">\n            <select id='point-select' class='point' name='points'>\n                <option value=\"#0079bf\" class='blue'></option>\n                <option value=\"#f2d600\" class='yellow'></option>\n                <option value=\"#61bd4f\" class='green'></option>\n                <option value=\"#eb5a46\" class='red'></option>\n            </select>\n            <input type=\"text\" placeholder=\"Title...\" id=\"description_title_input\" maxlength='25'>\n            <textarea type=\"text\" id=\"todo-description\" placeholder=\"Description...\" maxlength='1000'></textarea>\n            <select name=\"users\" id=\"user-select\" class=\"user\"></select>\n            <button id=\"confirm-form\">\u271A</button>\n            <button id=\"close-form\">\u2716</button>\n        </div>\n        <div id=\"add\" class='footer-box'></div>\n    </div>\n    <div class=\"list-wrapper inprogress\">\n        <div class=\"head-box\">In Progress</div>\n        <div class=\"footer-box\" id='inprogress'></div>\n    </div>\n    <div class=\"list-wrapper done\">\n        <div class=\"head-box\">Done<button id=\"delete-all-button\"><img src=\"../assets/icons/delete.png\"></button>\n        </div>\n        <div class=\"footer-box\" id='done'></div>\n    </div>\n</div>\n</main>\n<div id=\"quick-card-editor\">\n<div id='quick-card-editor-close-card'></div>\n<div id=\"quick-card-editor-card\">\n    <div id=\"quick-card-newCard\">\n        <select id='quick-card-point'>\n            <option value=\"#0079bf\" class='blue'></option>\n            <option value=\"#f2d600\" class='yellow'></option>\n            <option value=\"#61bd4f\" class='green'></option>\n            <option value=\"#eb5a46\" class='red'></option>\n        </select>\n        <input class=\"quick-card-title\" id='title-description' maxlength='25'\n            autocomplete=\"off\"></input>\n        <textarea type='text' class='todo-value quick-card-text' id='card-text' maxlength='1000'></textarea>\n        <div class='card-footer'>\n            <select id='quick-card-user'></select>\n            <div id='quick-card-date'></div>\n        </div>\n    </div>\n</div>\n<span id=\"quick-card-editor-close-icon\"></span>\n</div>\n"; // объявляем переменные

var input = document.getElementById('todo-description');
var titleText = document.getElementById('description_title_input');
var addFooter = document.getElementById('add');
var inprogressFooter = document.getElementById('inprogress');
var doneFooter = document.getElementById('done');
var todoItemsElems = []; // Генерация даты

var date = "".concat(new Date().getDate(), ".").concat(new Date().getMonth() + 1, ".").concat(new Date().getFullYear()); // Объявление переменных для localStorage

var cardArray = JSON.parse(localStorage.getItem('cardArray')) || [];
var id = JSON.parse(localStorage.getItem('id')) || 0; // Создание объекта с нужными значениями

function todo(val, id, tit, us, point) {
  this.id = id;
  this.date = date;
  this.text = val;
  this.title = tit;
  this.user = us;
  this.point = point;
  this.position = 'add';
} // Создает блок и задает значения для него и для дочерних элементов


var createTemplate = function createTemplate(inp, index) {
  return "\n    <div class='newCard' id='newCard-".concat(index, "' draggable=\"true\" >\n        <div id='point-").concat(index, "' class='point' style='background-color:").concat(inp.point, "'></div>\n        <div class='card-header'>\n            <div class=\"title-description\">").concat(inp.title, "</div>\n            <div class='title-header-buttons'>\n                <button onclick='editTask(").concat(index, ")' class='button'><img src='../assets/icons/edit.png'></button>\n                <button onclick='deleteTask(").concat(index, ")' class='button'>\u2716</button>\n            </div>\n        </div>\n        <div class='todo-value'>").concat(inp.text, "</div>\n        <div class='card-footer'>\n            <div id=\"user-").concat(index, "\" class='card-user'>").concat(inp.user, "</div>\n            <div id='date-").concat(index, "' class='card-date'>").concat(inp.date, "</div>\n        </div>\n    </div>\n");
}; //


var localUpdate = function localUpdate(index) {
  localStorage.setItem('cardArray', JSON.stringify(cardArray));
  localStorage.setItem('id', id); // cardArray.forEach((item,index)=>{

  fetch('https://62585363e4e0b731428afe6e.mockapi.io/tms/users/array', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(cardArray[index])
  });
  fetch("https://62585363e4e0b731428afe6e.mockapi.io/tms/users/array/".concat(index + 1), {
    method: 'DELETE'
  }); // })
  // cardArray.forEach((item,index)=>{

  fetch('https://62585363e4e0b731428afe6e.mockapi.io/tms/users/array', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(cardArray[index])
  }); // });
};

function printUsers(json) {
  json.forEach(function (i) {
    document.getElementById('user-select').innerHTML += "<option>".concat(i.name, "</option>");
    document.getElementById('quick-card-user').innerHTML += "<option>".concat(i.name, "</option>");
  });
}

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users/').then(function (response) {
    return response.json();
  }).then(function (json) {
    printUsers(json);
  });
} // Функция сохраняет значения в localStorage и задает текст блоков(при перезагрузке страницы и не только)
// проверяет наличие 'блока' в массиве и выводит его(заново прорисовывает все блоки из массива, при удалении, при добавлении)


var htmlText = function htmlText() {
  addFooter.innerText = '';
  inprogressFooter.innerText = '';
  doneFooter.innerText = '';

  if (cardArray.length > 0) {
    cardArray.forEach(function (item, index) {
      if (cardArray[index].position == 'add') addFooter.innerHTML += createTemplate(item, index);
      if (cardArray[index].position == 'inprogress') inprogressFooter.innerHTML += createTemplate(item, index);
      if (cardArray[index].position == 'done') doneFooter.innerHTML += createTemplate(item, index);
      localUpdate(index);
    });
    todoItemsElems = document.querySelectorAll('.newCard');
  }

  dragNdrop();
};

dragNdrop();
htmlText();
getUsers(); // Функция проверяет наличие текста в инпуте, далее записывает значение в объект из которого берется значение
// обнуляет инпут

document.getElementById('confirm-form').addEventListener('click', function () {
  if (input.value == '' || titleText.value == '') {
    input.placeholder = 'Write a description..';
    titleText.placeholder = 'Write a title..';
    return;
  } else {
    id++;
    cardArray.push(new todo(input.value, id, titleText.value, document.getElementById('user-select').value, document.getElementById('point-select').value));
    input.value = '';
    input.placeholder = 'Description..';
    titleText.value = '';
    titleText.placeholder = 'Title..';
    input.style.height = '60px';
  }

  htmlText();
});
document.getElementById('add-todo-button').addEventListener('click', function () {
  document.getElementById('description-box').style.display = 'block';
  document.getElementById('add-todo-button').style.display = 'none';
});
document.getElementById('close-form').addEventListener('click', function (e) {
  document.getElementById('description-box').style.display = 'none';
  titleText.value = '';
  input.value = '';
  input.style.height = '60px';
  document.getElementById('add-todo-button').style.display = 'block';
});
document.querySelector('textarea').addEventListener('input', function () {
  this.style.cssText = 'height:' + this.scrollHeight + 'px';
}); // функция удаляет блок, удаляет из массива этот блок

var deleteTask = function deleteTask(index) {
  cardArray.splice(index, 1);
  if (cardArray == 0) id = 0;
  htmlText();
};

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: Math.round(box.top + pageYOffset),
    left: Math.round(box.left + pageXOffset)
  };
}

var editTask = function editTask(index) {
  document.getElementById('quick-card-editor-card').style.top = "".concat(getCoords(todoItemsElems[index]).top - 15, "px");
  document.getElementById('quick-card-editor-card').style.left = "".concat(getCoords(todoItemsElems[index]).left, "px");

  if (document.getElementById('card-editor-button-confirm')) {
    document.getElementById('card-editor-button-confirm').remove();
  }

  document.getElementById('quick-card-editor-card').innerHTML += "<button id=\"card-editor-button-confirm\" onclick='confirmChangesCard(".concat(index, ")'>Confirm</button>");
  document.getElementById('title-description').value = "".concat(cardArray[index].title);
  document.getElementById('card-text').value = "".concat(cardArray[index].text);
  document.getElementById('quick-card-user').value = "".concat(cardArray[index].user);
  document.getElementById('quick-card-date').innerText = "".concat(cardArray[index].date);
  document.getElementById('quick-card-newCard').style.boxShadow = 'none';
  document.getElementById('quick-card-point').style.backgroundColor = "".concat(cardArray[index].point);
  document.getElementById('quick-card-point').addEventListener('change', function () {
    if (this.value == '#f2d600') {
      this.style.cssText = 'background-color: #f2d600;';
    } else if (this.value == '#0079bf') {
      this.style.cssText = 'background-color: #0079bf;';
    } else if (this.value == '#eb5a46') {
      this.style.cssText = 'background-color: #eb5a46;';
    } else if (this.value == '#61bd4f') {
      this.style.cssText = 'background-color: #61bd4f;';
    }
  });
  document.getElementById('quick-card-editor').style.display = 'block';
}; // закрывает окно редактирования


document.getElementById('quick-card-editor-close-icon').addEventListener('click', function () {
  document.getElementById('quick-card-editor').style.display = 'none';
});
document.getElementById('quick-card-editor-close-card').addEventListener('click', function () {
  document.getElementById('quick-card-editor').style.display = 'none';
}); // вписывает в массив новые данные и закрывает окно редактирования

var confirmChangesCard = function confirmChangesCard(index) {
  if (document.getElementById("title-description").value && document.getElementById("card-text").value) {
    cardArray[index].title = document.getElementById("title-description").value;
    cardArray[index].text = document.getElementById("card-text").value;
    cardArray[index].user = document.getElementById('quick-card-user').value;
    cardArray[index].point = document.getElementById('quick-card-point').value;
    document.getElementById('quick-card-editor').style.display = 'none';
    htmlText();
  }
};

document.getElementById('point-select').addEventListener('change', function () {
  if (this.value == '#f2d600') {
    this.style.cssText = 'background-color: #f2d600;';
  } else if (this.value == '#0079bf') {
    this.style.cssText = 'background-color: #0079bf;';
  } else if (this.value == '#eb5a46') {
    this.style.cssText = 'background-color: #eb5a46;';
  } else if (this.value == '#61bd4f') {
    this.style.cssText = 'background-color: #61bd4f;';
  }
});
var draggedItem = null;

function dragNdrop() {
  var items = document.querySelectorAll('.newCard');
  var lists = document.querySelectorAll('.footer-box');

  var _loop = function _loop(i) {
    var item = items[i];
    item.addEventListener('mousedown', function () {
      draggedItem = item;
    });
    item.addEventListener('mouseup', function () {
      draggedItem = null;
    });

    for (var l = 0; l < lists.length; l++) {
      var list = lists[l];
      list.addEventListener('dragover', function (e) {
        return e.preventDefault();
      });
      list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.borderColor = '#091e4214';
      });
      list.addEventListener('dragleave', function (e) {
        e.preventDefault();
        this.style.borderColor = 'transparent';
      });
      list.addEventListener('drop', function (e) {
        e.preventDefault();
        this.style.borderColor = 'transparent';
        this.append(draggedItem);

        if (this.id == 'inprogress') {
          if (item === draggedItem) {
            cardArray[i].position = "".concat(this.id);
            localUpdate();
            return;
          }
        }

        if (this.id == 'done') {
          if (item === draggedItem) {
            cardArray[i].position = "".concat(this.id);
            localUpdate();
            return;
          }
        }

        if (this.id == 'add') {
          if (item === draggedItem) {
            cardArray[i].position = "".concat(this.id);
            localUpdate();
            return;
          }
        }
      });
    }
  };

  for (var i = 0; i < items.length; i++) {
    _loop(i);
  }
} // удаление всех блоков, очищение массива
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