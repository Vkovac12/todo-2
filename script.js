'use strict';
var buttons = document.querySelector('#save');
let todoArray=[];

//funkcija za generiranje novog ID-a
function idGen(){

        const idArray = todoArray.map(todoObject => todoObject.id);
        let newId;
        if (idArray.length===0){
                newId=1;
        }else{
                newId=Math.max(...idArray)+1;  
        }
                
        return newId;
}

//funkcija za spremanje u local storage
function checkTasks(){
        const noTasks=document.querySelector('.message');
        if(document.querySelector('.todoItem')===null){
                console.log("Nema todoa")
                noTasks.classList.add("no-tasks")
        }if(document.getElementsByClassName('todoItem').length>0){
                console.log("Ima todoa")
                noTasks.classList.remove("no-tasks")
        }  
}


function saveButton(){

        
        //get title and description of task
        const title = document.getElementById("title").value;
        const desc = document.getElementById("desc").value;
        const prio=document.querySelector('input[name="radAnswer"]:checked').value;
        

        //get date when created
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}.${month}.${year}`;

        //create task and add on begginig
        const todoItem = document.createElement('div')
        const idGen1=idGen();
        todoItem.className = 'todo-item'
        todoItem.dataset.id=idGen1;
        const todoContent = `
                <div class="date">Created: ${currentDate}</div>
                <div class="naslov" id="jedan">${title}</div>
                <div class="desc">${desc}</div>
                <button class="delete"><img src="./delete.png" alt="" class="delete-image"></button>
                <input type="checkbox" class="checked" id="done">
                `;
        todoItem.innerHTML = todoContent;

        //set color for different priority
        if (prio=="low"){
                todoItem.classList.add("low");
        }if (prio=="medium") {
                todoItem.classList.add("medium");
        }if(prio=="high") {
                todoItem.classList.add("high");
        }

        //convert to an object
        const todoObject={
                title:title,
                description:desc,
                date:currentDate,
                priority:prio,
                id:idGen1
        }

        //push object in an array with tasks
        todoArray.push(todoObject)

        checkTasks();

        document.querySelectorAll('.class')
        document.querySelector('.todo-wrapper').insertBefore(todoItem, document.querySelector('.todo-wrapper').firstChild);

}

buttons.addEventListener('click', function(e){
        saveButton()
        
})

window.addEventListener("load",function(e){
        checkTasks();
})
        
//event delegation
document.addEventListener('click', function(e){
        
        const parentDivDelete=e.target.closest('.todo-item')
        
        console.log(todoArray);
        if(e.target.className=="delete" || e.target.className=="delete-image"){
                parentDivDelete.remove();
                const divID=parentDivDelete.dataset.id
                todoArray=todoArray.filter(item=>item.id!=divID);
        }
        console.log(todoArray);
})

//event delegation
document.addEventListener('click', function(e){
        
        const parentDivChecked=e.target.closest('.todo-item')
        console.log(e.target)
        if(e.target.className=="checked"){
                if(e.target.checked==true){
                        console.log(e.target)
                        parentDivChecked.classList.add("done");
                }else{
                        parentDivChecked.classList.remove("done");
                }
                
        }
})

const sectionForm=document.querySelector('.forma');
document.addEventListener('click', function(e){  
        console.log(sectionForm)
        if(e.target.className=="add-task"){
                sectionForm.classList.add("add-new");
        }if(e.target.className=="cancel"){
                sectionForm.classList.remove("add-new");
        }
        
})


