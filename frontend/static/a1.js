// Dynamically create the HTML content
document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Activity Page</title>
    </head>
    <body>
        <h1>Recommended Books</h1>
        <ul id="recommendations"></ul>
    </body>
    </html>
`);

// Fetch and display the recommendations
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://192.168.0.137:5000/get_book_titles')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('recommendations');
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item[0]} (Similarity: ${item[1]})`;
                list.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching recommendations:', error));
});
