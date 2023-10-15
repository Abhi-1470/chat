const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');

function displayChatMessages() {
    // In this example, we're assuming that the chat messages are stored in a Google Sheet.
    // You need to publish your Google Sheet as a web page (File -> Publish to the web).
    // Then, you can fetch data from the published sheet using an URL.
    const sheetURL = 'https://script.google.com/macros/s/AKfycby8kQWEXQX-My5vogfqEEuOusRAb1AYPmhAFJKd5P1_HF3-U4X64UzIuhk5jBF8UJfM/exec';

    // Fetch the data from the Google Sheet
    fetch(sheetURL)
        .then(response => response.text())
        .then(data => {
            // Parse the data (assuming it's in CSV format)
            const rows = data.split('\n');
            const messages = rows.map(row => row.split(', ')[1]);

            // Display chat messages
            chat.innerHTML = messages.join('<br>');
        });
}

function sendMessage() {
    const newMessage = messageInput.value;

    const scriptURL = 'https://script.google.com/macros/s/AKfycby8kQWEXQX-My5vogfqEEuOusRAb1AYPmhAFJKd5P1_HF3-U4X64UzIuhk5jBF8UJfM/exec'
        const form = document.forms['submit-to-google-sheet']

        form.addEventListener('submit', e => {
            e.preventDefault()
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))
        })
    chat.innerHTML += '<br>' + newMessage;

    // Clear the input field
    messageInput.value = '';
}

// Display chat messages when the page loads
displayChatMessages();
