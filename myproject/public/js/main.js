// Example: Fetch all data
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Display data dynamically in HTML
    })
    .catch(error => console.error('Error:', error));
