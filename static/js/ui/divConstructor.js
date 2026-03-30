






function constructDiv(itemarray) {
    itemarray.forEach(item => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section";
        sectionDiv.id = item;
        document.body.appendChild(sectionDiv);
        const columnSection = document.createElement("div")
        columnSection.className = "columns"
        sectionDiv.appendChild(columnSection)
    
    

        const todoColumn = document.createElement("div")
        todoColumn.className = "column"
        todoColumn.id = `col-${item}-todo`
        columnSection.appendChild(todoColumn)

        const todoH3 = document.createElement("h3")
        todoH3.textContent = "To do"
        todoH3.id = "todo"
        todoColumn.appendChild(todoH3)

        const addbutton1 = document.createElement("div")
        addbutton1.textContent = "+"
        addbutton1.className = "add-btn"
        addbutton1.addEventListener("click", () => constructAddTask("todo"))
        todoColumn.appendChild(addbutton1)

        const list1 = document.createElement("ul")
        list1.id = `list-${item}-todo`
        todoColumn.appendChild(list1)





        const inprogressColumn = document.createElement("div")
        inprogressColumn.className = "column"
        inprogressColumn.id = `col-${item}-inprogress`
        columnSection.appendChild(inprogressColumn)

        const inprogressH3 = document.createElement("h3")
        inprogressH3.textContent = "In Progress"
        inprogressH3.id = "inprogress"
        inprogressColumn.appendChild(inprogressH3)

        const addbutton2 = document.createElement("div")
        addbutton2.textContent = "+"
        addbutton2.className = "add-btn"
        addbutton2.addEventListener("click", () => constructAddTask("inprogress"))
        inprogressColumn.appendChild(addbutton2)

        const list2 = document.createElement("ul")
        list2.id = `list-${item}-inprogress`
        inprogressColumn.appendChild(list2)


        const doneColumn = document.createElement("div")
        doneColumn.className = "column"
        doneColumn.id = `col-${item}-done`
        columnSection.appendChild(doneColumn)

        const doneH3 = document.createElement("h3")
        doneH3.textContent = "Done"
        doneH3.id = "done"
        doneColumn.appendChild(doneH3)

        const addbutton3 = document.createElement("div")
        addbutton3.textContent = "+"
        addbutton3.className = "add-btn"
        addbutton3.addEventListener("click", () => constructAddTask("done")     )
        doneColumn.appendChild(addbutton3)

        const list3 = document.createElement("ul")
        list3.id = `list-${item}-done`
        doneColumn.appendChild(list3)

        addTasksToColumn(item);
    });
}


constructDiv(fakearray)
