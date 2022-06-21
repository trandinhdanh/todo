var input = document.querySelector("input");
var button = document.querySelector("button");
var form = document.querySelector("form");
var todoList = document.querySelector(".todo");

form.addEventListener('submit',function(event){
    event.preventDefault();
    let val = input.value.trim()
    if(val){
        addToDoElement({text:val});
        saveToDoList()
    }
    input.value = '';
})
function addToDoElement(todo){
   var li = document.createElement('li'); 
   li.innerHTML =   `
                     <span>${todo.text}</span>
                     <i id="delete" class="fas fa-trash"></i>
                     <i id="edit" class="fas fa-edit"></i>
                    `  
     if(todo.status === 'completed'){
        li.setAttribute('class','completed')
     }
     li.addEventListener('click',function(){
        this.classList.toggle('completed')
        saveToDoList();
    })
    li.querySelector('#delete').addEventListener('click',function(){
        this.parentElement.remove(); 
        saveToDoList();
    })
    li.querySelector('#edit').addEventListener('click',function(){
        input.value = todo.text;
    })
     todoList.appendChild(li);
}
function saveToDoList(){
    let todoList = document.querySelectorAll('li')
    let todoStorage = []
       todoList.forEach(function(item){
       let text = item.querySelector('span').innerText
       let status = item.getAttribute('class')
       todoStorage.push({
        text,
        status
       });
    })
    localStorage.setItem('todoListLocal', JSON.stringify(todoStorage));

}
function init(){
    let data = JSON.parse(localStorage.getItem('todoListLocal'));
    data.forEach(function(item){
        addToDoElement(item);
    })
}
init();