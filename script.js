
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const apiKey = "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";

async function sendMessage() {
    const userText = userInput.value;
    if (!userText.trim()) return;

    addMessage(userText, "user");
    userInput.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a witty, friendly Zambian farming assistant for youth. Use local humour when possible."
                },
                {
                    role: "user",
                    content: userText
                }
            ]
        })
    });

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "Hmm... something went wrong.";
    addMessage(aiMessage, "ai");
}

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `message ${type}`;
    if (type === "ai") {
        msg.innerHTML = `<img src="assets/avatar.jpg" class="avatar"/>${text}`;
    } else {
        msg.textContent = text;
    }
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
