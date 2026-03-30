async function fetchDataFromFlask(category) {
    try {
        
        const response = await fetch(`/api/tasks/${category}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        
        if (!response.ok) {
            const message = `An error occurred: ${response.status}`;
            throw new Error(message);
        }

      
        const data = await response.json();

       
        return data;

    } catch (error) {
        
        console.error("Fetch error:", error);
    }
}


