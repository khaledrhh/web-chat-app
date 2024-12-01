document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
  
    // Function to handle the sending of messages
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value;
        if (!message) return;

        // Display the user's message in the chat
        chatBox.innerHTML += `<div class="user-message">${message}</div>`;

        // Clear the input field
        userInput.value = '';

        // Send message to backend (Node.js)
        const response = await fetch('/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        const botReply = data.reply;

        // Display the bot's reply in the chat
        chatBox.innerHTML += `<div class="bot-message">${botReply}</div>`;
    });
});
