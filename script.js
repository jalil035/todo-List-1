document.addEventListener("DOMContentLoaded", ()=>{
    const showData = JSON.parse(localStorage.getItem('tasks'))

    if(showData){
        showData.forEach((task) => tasks.push(task));
        updateTaskList();
        updateStatus();
        
    }
})

let tasks = [];

const newTask = document.getElementById('newTask');

//save data
function saveData(){
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
//task function
function addTask(){
    const inputBox = document.getElementById('input_Box')
    const text = inputBox.value.trim();

    if(text){
        tasks.push({text: text, completed: false});
        inputBox.value = ''

        updateTaskList();
        updateStatus()
        saveData();
    }
}

//Function to Delete Task
function deleteTask(index){
    tasks.splice(index, 1);
    updateTaskList();
    updateStatus()
    saveData();
}

//function to update task
function editTask(index){
    const inputBox = document.getElementById('input_Box');
    inputBox.value = tasks[index].text;

    tasks.splice(index, 1)
    updateTaskList();
    updateStatus();
    saveData();
}

//progress ber function

function updateStatus(){
    const completedTask = tasks.filter((task) => task.completed).length;
    const totalTask = tasks.length;
    const progress = (completedTask / totalTask) * 100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;

    document.getElementById('number').innerText = `${completedTask} / ${totalTask}`
}

function toggleTastComplete(index){
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStatus();
    saveData();
}

//update Task list
function updateTaskList(){
    const taskList = document.getElementById('task_item');
    taskList.innerHTML = '';

    tasks.forEach((task, index) =>{
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
        <div class="task ${task.completed ? "completed": ''}">
            <input type="checkbox" class="checkbox" ${task.completed? "checked": ''}/>
            <p>${task.text}</p>
        </div>
        <div class="icon">
            <img src="images/edit.svg" alt="" onClick="editTask(${index})"/>
            <img src="images/delete.svg" alt="" onClick="deleteTask(${index})"/>
        </div>
    </div>
        `;
        listItem.addEventListener('change', () => toggleTastComplete(index));
        taskList.append(listItem);
    })
}

//delete button


//add even listener for button
newTask.addEventListener('click', function(e){
    e.preventDefault();

    addTask();
})
