function constructArchiveDiv() {
    const archiveDiv = document.createElement("div")
    archiveDiv.className = "section"
    archiveDiv.id = "Archive"
    document.body.appendChild(archiveDiv)

    const archiveList = document.createElement("ul")
    archiveList.className = "archive-list"
    archiveDiv.appendChild(archiveList)

    refreshArchive()
}

async function refreshArchive() {
    const archiveList = document.querySelector(".archive-list")
    archiveList.innerHTML = ""

    const response = await fetch(`/api/tasks/archived`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const data = await response.json();
    data.forEach(item => {
        const li = document.createElement("li")
        li.className = "archive-item"
        li.dataset.taskId = item[0]
        li.textContent = item[3]
        if (item[4]) {
            const desc = document.createElement("p")
            desc.textContent = item[4]
            li.appendChild(desc)
        }
        const restore = document.createElement("img")
        restore.className = "restore"
        restore.src = "/static/icons/restore.svg"
        restore.title = "Restore"
        restore.addEventListener("click", () => {
            restoreTask(item[0])
        })
        li.appendChild(restore)
        archiveList.appendChild(li)
    });
}

constructArchiveDiv()
