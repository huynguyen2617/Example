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

const taskArr = JSON.parse(localStorage.getItem("tasks"));
if (taskArr) {
    RenderUI(taskArr);
}
/************************************************************************/
document.getElementById("add-new-task").addEventListener("click", () => {
    const input = document.getElementById("new-task").value;
    localStorage.setItem("tasks", JSON.stringify([input]))
    addTask(input);
})

const RemoveTask = (li) => {
    li.remove();
}

const UpdateTask = (li) => {
    const data = prompt("Noi dung moi : ");
    li.firstChild.textContent = data;
}

document.getElementById("delete-all").addEventListener("click", () => RenderUI([]))

document.getElementById("sort-task").addEventListener("click", () => {
    const li = document.getElementsByClassName("collection-item");
    const arrayValue = [...li].map(li => li.firstChild.textContent);
    arrayValue.sort((a,b) => a.localeCompare(b)); 
    RenderUI(arrayValue);
})

let arrTasks = [];
document.getElementById("search").addEventListener("click", () => {
    const input = document.getElementById("new-task").value;
    const li = document.getElementsByClassName("collection-item");
    const arrayValue = [...li].map(li => li.firstChild.textContent);
    arrTasks = [...arrayValue];
    const result = arrayValue.filter(v => v == input);
    if (result.length > 0) {
        RenderUI(result);
    } else {
        alert("Khong tim thay " + input);
    }
})

document.getElementById("back").addEventListener("click", () => {
    RenderUI(arrTasks);
})


//localStorage
// const array = ["aaa", "bbb", "ccc"];
// localStorage.setItem("test" , JSON.stringify(array));

// const a = localStorage.getItem("test");
// const json = JSON.parse(a);
// console.log(json)