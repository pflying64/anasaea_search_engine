async function searchArt() {
    const userInput = document.getElementById('userInput').value;
    const chatHistory = document.getElementById('chatHistory');

    if (!userInput) {
        chatHistory.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    chatHistory.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    const apiKey = 'YOUR_API_KEY_HERE';  // Usa una variabile di ambiente invece di una chiave fissa
    const assistantId = 'asst_P5TO2T0CLrDSbsSspmNWLTw9';

    chatHistory.innerHTML += `<p><em>Searching ANASAEA database...</em></p>`;

    try {
        const response = await fetch('https://api.openai.com/v1/assistants/' + assistantId + '/runs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-4-turbo",
                messages: [
                    { role: "system", content: "You are an art search assistant for ANASAEA." },
                    { role: "user", content: userInput }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            chatHistory.innerHTML += `<p><strong>Assistant:</strong> ${data.choices[0].message.content}</p>`;
        } else {
            chatHistory.innerHTML += `<p>Error: ${data.error.message}</p>`;
        }
    } catch (error) {
        chatHistory.innerHTML += `<p>Error communicating with server.</p>`;
    }
}

