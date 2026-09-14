let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const list = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const dueCount = document.getElementById("dueCount");
const empty = document.getElementById("emptyState");
function save(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function displayTasks(){
    list.innerHTML = "";
    tasks.forEach(function(task,index){
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            <input type ="checkbox" class="task-checkbox" ${task.completed ? "checked":""}>
            <span class ="task-text ${task.completed?"completed":""}">${task.text}</span>
            <button class ="delete-button">✕</button>
        `;
        li.querySelector("input").addEventListener("change",function(){
            tasks[index].completed=!tasks[index].completed;
            save();
            displayTasks();
        });
        li.querySelector("button").addEventListener("click",function(){
            tasks.splice(index,1);
            save();
            displayTasks();
        });
        list.appendChild(li);
    });
    const completed=tasks.filter(task=>task.completed).length;
    taskCount.textContent=tasks.length;
    completedCount.textContent=completed;
    dueCount.textContent=tasks.length-completed;
    empty.style.display=tasks.length ? "none" : "block";
}
function addTask(){
    if(input.value.trim()==="")return;
    tasks.push({
        text:input.value.trim(),
        completed:false
    });
    input.value="";
    save();
    displayTasks();
}
addButton.addEventListener("click",addTask);
input.addEventListener("keydown",function(event){
    if(event.key==="Enter")addTask();
});
displayTasks();