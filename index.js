let task=document.querySelectorAll(".task");
let todo=document.querySelector("#todo");
let progress=document.querySelector("#progress");
let done=document.querySelector("#done");
let addtaskBtn=document.querySelector("#toggle-model");
let model=document.querySelector(".model");
let cross=document.querySelector(".cross");
let add_new=document.querySelector("#add_new");
let title=document.querySelector("input");
let description=document.querySelector("textarea");
let theme=document.querySelector(".theme");
let body=document.querySelector(".body");
let total_task=document.querySelector(".total_task");

let todoCount=document.querySelector("#todoCount")
let progressCount=document.querySelector("#progressCount")
let doneCount=document.querySelector("#doneCount")

let dragElement=null;
let alltasks=[];
let dragColumn=null;
let dropColumn=null;

let saved = localStorage.getItem("tasks");
if(saved){
    alltasks = JSON.parse(saved);
}

function setupDrag(anytask){

    anytask.addEventListener("dragstart",function(){
        dragElement = anytask;
        console.log("done");
    });

};


// Drag and Drop

function dragging(column){

    column.addEventListener("dragenter",function(e){
        e.preventDefault();
        column.classList.add("onEnter");
    });

    column.addEventListener("dragleave",function(e){
        e.preventDefault();
        column.classList.remove("onEnter");
        dragColumn=column;
        console.log(dragColumn);
    });

    column.addEventListener("dragover",function(e){
      e.preventDefault();
    });

    column.addEventListener("drop",function(e){
    e.preventDefault();
     column.append(dragElement);
     column.classList.remove("onEnter");
     dropColumn=column;
     updateCount()
     console.log(dropColumn);
    
    });

}
dragging(todo);
dragging(progress);
dragging(done);

addtaskBtn.addEventListener("click",function(){
    model.classList.remove("active");
});

cross.addEventListener("click",function(){
model.classList.add("active");
});

add_new.addEventListener("click",function(){
 let newtask=document.createElement("div");
    newtask.classList.add("task");
    newtask.setAttribute("draggable","true");

    if(title.value.trim() === "" || description.value.trim() === ""){
    alert("Enter something");
    return;
}

    newtask.innerHTML=`
        <h3>${title.value}</h3>
        <p>${description.value}</p>
        <button class="delBtn" >Delete</button>
    `;
  let delBtn = newtask.querySelector("button");
    todo.appendChild(newtask);
   let taskObj = {
    title: title.value,
    description: description.value,
    status: "todo"
};
localStorage.setItem("tasks", JSON.stringify(alltasks));
     model.classList.add("active");
      setupDrag(newtask);
      updateCount();

    delBtn.addEventListener("click",function(){
        alltasks.splice(alltasks.indexOf(newtask),1);
localStorage.setItem("tasks", JSON.stringify(alltasks));
    newtask.remove();
    updateCount();
   
});

});

function updateCount(){

    todoCount.textContent =
        todo.querySelectorAll(".task").length;

    progressCount.textContent =
        progress.querySelectorAll(".task").length;

    doneCount.textContent =
       done.querySelectorAll(".task").length;

       totalTask();
}

function totalTask(){
    let totaltask= todo.querySelectorAll(".task").length+progress.querySelectorAll(".task").length+done.querySelectorAll(".task").length;
       total_task.textContent=`Total Tasks : ${totaltask}`;
}

theme.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        theme.textContent = "🌙 Dark";
    }
    else{
        theme.textContent = "☀️ Light";
    }
});