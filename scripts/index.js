// верстка
document.getElementById('root').innerHTML = `
<main>
<div class="wrapper">
    <div class="list-wrapper todo">
        <div class="head-box">
            <p class="head-box-description">ToDo</p>
        </div>
        <div class="footer-box__add"></div>
        <div class="add-todo-button">+</div>
    </div>
    <div class="list-wrapper inprogress">
        <div class="head-box">
            <p class="head-box-description">In Progress</p>
        </div>
        <div class="footer-box__inprogress"></div>
    </div>
    <div class="list-wrapper done">
        <div class="head-box">
            <p class="head-box-description">Done</p>
            <div class="delete-all-button"></div>
        </div>
        <div class="footer-box__done"></div>
    </div>
</div>
</main>
`