async function archiveTask(taskid) {



if (window.confirm("Archive this task?")) {

console.log("archived")
await fetch(`/api/tasks/archive/${taskid}`, {
        method: 'PUT'
    })

}



else {


    console.log("not deleted")
}






}