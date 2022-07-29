"use strict"
const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
	this.description = description;
	this.completed = false;
}

const createTamplate = (task, index) => {
	return `
	<div class="tasks-wrapper ${task.completed ? 'checked' : ''}">
		<div class="task">${index + 1}. ${task.description}
		</div>
		<div class="buttons-wrapper">
			<div class="checkbox">
				<input onclick="completeTask(${index})" id="${index + 1}" class="checkbox__input" type="checkbox" ${task.completed ? 'checked' : ''}>
				<label for="${index + 1}" class="checkbox__lable"></label>
			</div>
			<button onclick="deleteTask(${index})" class="butten-del">Удалить</button>
		</div>
	</div>
	`
}

const filterTasks = () => {
	const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
	const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
	tasks = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
	todosWrapper.innerHTML = "";
	if (tasks.length > 0) {
		filterTasks();
		tasks.forEach((item, index) => {
			todosWrapper.innerHTML += createTamplate(item, index);
		});
		todoItemElems = document.querySelectorAll('.tasks-wrapper');
	}
}
fillHtmlList();



const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
	tasks[index].completed = !tasks[index].completed;
	if (tasks[index].completed) {
		todoItemElems[index].classList.add('checked');
	} else {
		todoItemElems[index].classList.remove('checked');
	}
	updateLocal();
	fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
	tasks.push(new Task(deskTaskInput.value));
	updateLocal();
	fillHtmlList();
	deskTaskInput.value = '';
})

const deleteTask = index => {
	todoItemElems[index].classList.add('_del');
	setTimeout(() => {
		tasks.splice(index, 1);
		updateLocal();
		fillHtmlList();
	}, 500)
}
