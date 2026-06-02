async function sendMessage() {

    let input = document.getElementById("user-input");
    let message = input.value;

    if (message.trim() === "") return;

    let chatBox = document.getElementById("chat-box");

    // USER MESSAGE
    chatBox.innerHTML += `
        <div class="message user">
            ${message}
        </div>
    `;

    input.value = "";

    try {

        let response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        let data = await response.json();

        // BOT MESSAGE
        chatBox.innerHTML += `
            <div class="message bot">
                ${data.reply}
            </div>
        `;

    } catch (error) {

        chatBox.innerHTML += `
            <div class="message bot">
                Error connecting to server.
            </div>
        `;

        console.log(error);
    }

    // AUTO SCROLL
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* VOICE INPUT */

function startListening() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech Recognition is not supported in this browser.");
        return;
    }

    let recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function(event) {

        let transcript = event.results[0][0].transcript;

        document.getElementById("user-input").value = transcript;
    };

    recognition.onerror = function(event) {
        console.log("Speech Recognition Error:", event.error);
    };

    recognition.start();
}

/* ENTER KEY SUPPORT */

document.getElementById("user-input").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});