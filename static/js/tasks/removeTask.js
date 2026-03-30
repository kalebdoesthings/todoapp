async function removeTask(taskid) {


if (window.confirm("Delete this task?")) {

console.log("deleted")
await fetch(`/api/tasks/${taskid}`, {
        method: 'DELETE'
    })

}



else {


    console.log("not deleted")
}



}