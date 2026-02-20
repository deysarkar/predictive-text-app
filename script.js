async function handleTyping() {
    let text = document.getElementById("inputBox").value;

    if (text.length === 0) {
        document.getElementById("predictionBar").innerHTML = "";
        return;
    }

    let response = await fetch("https://kaylin-shrimplike-erica.ngrok-free.dev/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    });

    let data = await response.json();

    renderPredictions(data.predictions);
}

function renderPredictions(words) {
    let bar = document.getElementById("predictionBar");
    bar.innerHTML = "";

    words.forEach(word => {
        let span = document.createElement("span");
        span.className = "suggestion";
        span.innerText = word;

        span.onclick = () => insertWord(word);

        bar.appendChild(span);
    });
}

function insertWord(word) {
    let input = document.getElementById("inputBox");

    let text = input.value.split(" ");
    text[text.length - 1] = word;

    input.value = text.join(" ") + " ";
}
