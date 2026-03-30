function constructAddTask(status) {


const addTaskModal = document.createElement("div")
addTaskModal.className = "addTask"

const closeBtn = document.createElement("button")
closeBtn.className = "close-btn"
closeBtn.textContent = "✕"
closeBtn.addEventListener("click", () => {
    addTaskModal.remove()
})
addTaskModal.appendChild(closeBtn)

const title = document.createElement("h1")
title.textContent = "Add Task"
addTaskModal.appendChild(title)

const nameLabel = document.createElement("label")
nameLabel.textContent = "Task Name *"
addTaskModal.appendChild(nameLabel)

const nameInput = document.createElement("input")
nameInput.type = "text"
nameInput.placeholder = "Enter task name"
nameInput.required = true
addTaskModal.appendChild(nameInput)

const descLabel = document.createElement("label")
descLabel.textContent = "Description (optional)"
addTaskModal.appendChild(descLabel)

const descInput = document.createElement("textarea")
descInput.placeholder = "Enter description"
addTaskModal.appendChild(descInput)

const submitBtn = document.createElement("button")
submitBtn.textContent = "Add"
submitBtn.addEventListener("click", () => taskAdd(status, nameInput.value, descInput.value, addTaskModal))
addTaskModal.appendChild(submitBtn)

document.body.appendChild(addTaskModal)



}



 async function taskAdd(status, name, description, addTaskModal) {


await fetch('/api/addtasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        category: localStorage.getItem("active"),
        status: status,
        name: name,
        description: description
    })
})
 
addTaskModal.remove()


}