const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadEventListeners();

function loadEventListeners()
{
    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}

function getTasks(e)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = "<i class='fa fa-remove'></i>";
        li.appendChild(link);
        taskList.appendChild(li);
        taskInput.value = '';
    });
}

function addTask(e)
{
    if(taskInput.value === '')
    {
        alert('Add a task!');
    }
    else
    {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = "<i class='fa fa-remove'></i>";
        li.appendChild(link);
        taskList.appendChild(li);
        StoreInLocalStorage(taskInput.value);
        
    }
    taskInput.value = '';
    e.preventDefault();
}

function StoreInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?'))
        {
            e.target.parentElement.parentElement.remove();
            RemoveTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function RemoveTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index)
    {
        if(taskItem.textContent === task)
        {
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks() {
    
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    ClearAllFromLocalStorage();
}

function ClearAllFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    // var len = text.length;
    // document.querySelector('.para').remove();
    // const p = document.createElement('p');
    // p.className = 'para';
    // p.innerHTML = `Value of ${len}`;
    // taskList.append(p);
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1)
        {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
    // document.querySelector('.para').remove();
    // if(val !== 1)
    // {
    //     const p = document.createElement('p');
    //     p.innerText = 'Sorry! There is nothing related to your search!';
    //     taskList.append(p);
    // }
    // console.log(document.querySelectorAll())
}