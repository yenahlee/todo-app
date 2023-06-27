const taskForm = document.querySelector(".task-form");
// const taskInput = document.querySelector(".task-form input");
const taskInput = document.getElementById("todo");
const todoList = document.querySelector(".todo-list");
const newTaskBtn = document.querySelector(".new-task");

const TODOS_KEY = "todos";
let todos = [];

taskForm.style.display = "none";

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    // create a button that will delete a todo
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        toggleToDoState(li, checkbox);
    });
    const button = document.createElement("button");
    button.classList.add("delete-button");
    button.addEventListener("click", deleteToDo);

    const todoText = document.createElement("span");
    todoText.innerText = newTodo;

    // const trashIcon = document.createElement("img");
    // trashIcon.src = "bin.png"; // Replace with the correct path to your icon file
    // trashIcon.alt = "Delete";
    // trashIcon.classList.add("trash-icon");
    // trashIcon.addEventListener("click", deleteToDo);
    // button.appendChild(trashIcon);


    li.appendChild(checkbox);
    li.appendChild(todoText);
    li.appendChild(button);
    li.style.display = "block";
    todoList.appendChild(li);

    function toggleToDoState(li, checkbox) {
        if (checkbox.checked) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.7";
        } else {
            li.style.textDecoration = "none";
            li.style.opacity = "1";
        }
    }
}



function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = taskInput.value;
    taskInput.value = "";
    // const newTaskObj = {
    //     text: newTodo,
    //     id: Date.now(),
    // };
    todos.push(newTodo);
    paintToDo(newTodo);
    saveToDos();
    taskForm.style.display = "none";
}

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleToDoSubmit(event);
    }
})

newTaskBtn.addEventListener("click", function (event) {
    //make task-form appear
    if (taskForm.style.display === "block") {
        taskForm.style.display = "none";
        return;
    } else {
        taskForm.style.display = "block";
    }
});

function deleteToDo (event) {
    const li = event.target.parentElement;
    const deletedTodo = li.querySelector('span').innerText;
    li.remove();
    todos = todos.filter((todo) => todo !== deletedTodo);
    saveToDos();
}


// function deleteToDo(event) {
//     const button = event.target;
//     const li = button.parentElement;
//     const deletedTodo = li.textContent.trim();
//     li.remove();
//     todos = todos.filter((todo) => todo !== deletedTodo);
//     saveToDos();
//   }
const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    todos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

