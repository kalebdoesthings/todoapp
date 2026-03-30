async function addTasksToColumn(category) {
    const data = await fetchDataFromFlask(category)

    const columnMap = {}
    document.querySelectorAll(`[id^="col-${category}-"]`).forEach(column => {
        const ul = column.querySelector("ul")
        columnMap[column.id] = ul
        ul.innerHTML = ""
    })

    data.forEach(item => {
        const columnId = `col-${category}-${item[2]}`
        const ul = columnMap[columnId]
        if (ul) {
            const task = document.createElement("li")
            task.id = `task-${item[0]}`
            task.dataset.taskId = item[0]

            const titleWrapper = document.createElement("div")
            titleWrapper.style.display = "flex"
            titleWrapper.style.alignItems = "center"
            titleWrapper.style.gap = "0.5em"


            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svg.setAttribute("viewBox", "0 0 24 24")
            svg.setAttribute("width", "1.2em")
            svg.setAttribute("height", "1.2em")
            svg.setAttribute("class", `icon-${item[2]}`)
            svg.style.display = "inline-block"
            svg.style.verticalAlign = "middle"
            svg.style.marginLeft = "auto"

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
            path.setAttribute("d", "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z")

            const color = item[2] === "todo" ? "#5a9aff" : item[2] === "inprogress" ? "#ffab2e" : "rgb(0, 251, 0)"
            path.setAttribute("fill", color)

            svg.appendChild(path)

            const titleSpan = document.createElement("span")
            titleSpan.textContent = item[3]
            titleWrapper.appendChild(titleSpan)

            titleWrapper.appendChild(svg)


            if (item[2] === "done") {
            const archive = document.createElement("img")
            archive.className = "archive"
            archive.id = task.id
            archive.src = "/static/icons/archive.svg"
            archive.title = "Archive"
            archive.addEventListener("click", (e) => {
                e.stopPropagation()
                archiveTask(item[0])
            })

        titleWrapper.appendChild(archive)
        }


            const trash = document.createElement("img")
            trash.className = "trash"
            trash.id = task.id
            trash.src = "/static/icons/trash.svg"
            trash.title = "Delete"
            trash.addEventListener("click", () => {
                removeTask(item[0])
            })




            titleWrapper.appendChild(trash)

            task.appendChild(titleWrapper)

            if (item[4]) {
                const desc = document.createElement("p")
                desc.textContent = item[4]
                task.appendChild(desc)
            }
            ul.appendChild(task)
        }
    })
}
