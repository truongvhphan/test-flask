document.getElementById("send-btn").addEventListener("click", async function () {
    const inputField = document.getElementById("chat-input");
    const message = inputField.value.trim();
    if (message === "") return;

    appendMessage("user", message);
    inputField.value = "";

    const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sender: "user",
            message: message
        })
    });

    const data = await response.json();
    data.forEach((msg) => {
        if (msg.text) {
            appendMessage("bot", msg.text);
        }
    });
});

function appendMessage(sender, text) {
    const chatWindow = document.getElementById("chat-window");
    const messageElem = document.createElement("div");
    messageElem.className = `message ${sender}`;
    messageElem.innerText = text;
    chatWindow.appendChild(messageElem);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
