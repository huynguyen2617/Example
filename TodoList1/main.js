function CreateElement(tag_name, class_name, value, parent_el) {
    const element = document.createElement(tag_name);
    element.setAttribute("class", class_name);
    element.innerHTML = value;
    parent_el.appendChild(element);
    return element;
}

function addTask(input) {
    const ul = document.getElementsByClassName("collection");
    const li = CreateElement("li", "collection-item", input, ul[0]);
    const editBtn = CreateElement("button", "btn", "Edit", li);
    const delBtn = CreateElement("button", "btn", "Delete", li);
    delBtn.addEventListener("click", () => RemoveTask(li));
    editBtn.addEventListener("click", () => UpdateTask(li));
}

function clearUI() {
    const ul = document.getElementsByClassName("collection");
    ul[0].innerHTML = "";
}

function RenderUI(array) {
    clearUI();
    array.forEach(value => addTask(value));
}

/************************************************************************/
let arrTasks = [];
document.getElementById("add-new-task").addEventListener("click", () => {
    const input = document.getElementById("new-task").value;
    addTask(input);
    // document.getElementById("new-task").value = null;
    arrTasks.push(input);
    localStorage.setItem("Task", JSON.stringify(arrTasks));

})
// const Arr_Task = JSON.parse(localStorage.getItem("Task"));


const RemoveTask = (li) => {
    li.remove();
}

const UpdateTask = (li) => {
    const data = prompt("Noi dung moi : ");
    li.firstChild.textContent = data;
}



document.getElementById("delete-all").addEventListener("click", () => {
    RenderUI([]);
    // localStorage.removeItem("Task");
    localStorage.clear();
})

document.getElementById("back").addEventListener("click", () => {
    const Arr_Task = JSON.parse(localStorage.getItem("Task"));//json.parse chuyen doi van ban thanh 1 doi tuong javascript
    RenderUI(Arr_Task);
})

document.getElementById("sort-task").addEventListener("click", () => {
    const Arr_Task = JSON.parse(localStorage.getItem("Task"));
    Arr_Task.sort((a,b) => a.localeCompare(b)); 
    RenderUI(Arr_Task);
})

document.getElementById("search").addEventListener("click", () => {
    const input = document.getElementById("new-task").value;
    const Arr_Task = JSON.parse(localStorage.getItem("Task"));
    const result = Arr_Task.filter(v => v == input);
    if (result.length > 0) {
        RenderUI(result);
    } else {
        alert("Khong tim thay " + input);
    }
})




//localStorage
// const array = ["aaa", "bbb", "ccc"];
// localStorage.setItem("test" , JSON.stringify(array));

// const a = localStorage.getItem("test");
// const json = JSON.parse(a);
// console.log(json)