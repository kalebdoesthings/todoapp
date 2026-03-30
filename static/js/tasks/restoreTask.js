async function restoreTask(taskId) {
    await fetch(`/api/tasks/restore/${taskId}`, {
        method: 'PUT'
    })
}
