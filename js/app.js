
// declare all the constants first
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//get item from local storage

let data= localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadlist(LIST); // load the list to the user interface
     
}
else{
    // if data isnt empty
    LIST = [];
    id = 0;
}

//load items
function loadlist(array)
{
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload(); // reload the page
});

// Show todays date
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US",options);

// add the to-do function

function addToDo(todo,id,done,trash){
    
    //if trash option is selected dont perform anything below

    if(trash){ return; }

    const DONE = done? CHECK : UNCHECK;
    const LINE = done? LINE_THROUGH : ""; 
    const item = `
                <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${todo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                </li>         
                `;
    const position="beforeend";

    list.insertAdjacentHTML(position,item);
}

//add an item when user clicks enter keys
document.addEventListener("keyup",function(event){
        if(event.keyCode == 13)
        {
            const toDo = input.value;
            //if its not empty
            if(toDo){
                addToDo(toDo, id, false,false);
                LIST.push({
                   name: toDo,
                   id: id,
                   done: false,
                   trash: false 
                });
                //add items to localstorage (this code must be added where the array list is updated)
                localStorage.setItem("TODO",JSON.stringify(LIST));

                id++;
            }
            input.value = "";
        }
});

//complete to do when user clicks button
//element is the clicked todoitem
//user finished doing the task 

function completeToDo(element)
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done?false:true;
}

// deleting the todo item
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the cicked element inside list
    const elementJob = element.attributes.job.value; // returns completed or delete
    if(elementJob == "complete")
    {
        completeToDo(element);
    }
    else if(elementJob == "delete")
    {
        removeToDo(element);
    }
    //add items to localstorage (this code must be added where the array list is updated)
    localStorage.setItem("TODO",JSON.stringify(LIST));
});






