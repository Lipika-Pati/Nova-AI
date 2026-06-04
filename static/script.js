// LOAD CHAT HISTORY ON START
window.onload = function () {

    let savedChat = localStorage.getItem("chat");

    if (savedChat) {
        document.getElementById("chat-box").innerHTML = savedChat;
    }

    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
    }
};

// SEND MESSAGE
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

    saveChat();

    // TYPING MESSAGE
    let typingId = "typing-" + Date.now();

    chatBox.innerHTML += `
        <div class="message bot" id="${typingId}">
            🤖 Nova AI is typing...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

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

        // REMOVE TYPING MESSAGE
        let typingElement = document.getElementById(typingId);

        if (typingElement) {
            typingElement.remove();
        }

        // BOT MESSAGE
        chatBox.innerHTML += `
            <div class="message bot">
                ${data.reply}
            </div>
        `;

        saveChat();

    } catch (error) {

        let typingElement = document.getElementById(typingId);

        if (typingElement) {
            typingElement.remove();
        }

        chatBox.innerHTML += `
            <div class="message bot">
                Error: Server not responding
            </div>
        `;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// SAVE CHAT
function saveChat() {

    localStorage.setItem(
        "chat",
        document.getElementById("chat-box").innerHTML
    );
}

// CLEAR CHAT
function clearChat() {

    document.getElementById("chat-box").innerHTML = "";

    localStorage.removeItem("chat");
}

// NEW CHAT
function newChat() {

    document.getElementById("chat-box").innerHTML = "";

    localStorage.removeItem("chat");
}

// DARK / LIGHT MODE
function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// DOWNLOAD CHAT
function downloadChat() {

    let chatText =
        document.getElementById("chat-box").innerText;

    let blob =
        new Blob([chatText], { type: "text/plain" });

    let link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download = "NovaAI_Chat.txt";

    link.click();
}

// VOICE INPUT
function startListening() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Speech Recognition not supported in this browser"
        );

        return;
    }

    let recognition =
        new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.onresult = function (event) {

        document.getElementById("user-input").value =
            event.results[0][0].transcript;
    };

    recognition.start();
}

// ENTER KEY SUPPORT
document.getElementById("user-input").addEventListener(
    "keypress",
    function (e) {

        if (e.key === "Enter") {
            sendMessage();
        }
    }
);

// FILE UPLOAD
document.getElementById("file-upload").addEventListener(
    "change",
    function () {

        let file = this.files[0];

        if (!file) return;

        let chatBox =
            document.getElementById("chat-box");

        chatBox.innerHTML += `
            <div class="message user">
                📎 ${file.name}
            </div>
        `;

        saveChat();

        chatBox.scrollTop =
            chatBox.scrollHeight;
    }
);