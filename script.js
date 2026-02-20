function handleTyping() {
    let text = document.getElementById("inputBox").value;

    if (text.length === 0) {
        document.getElementById("predictionBar").innerHTML = "";
        return;
    }

    // TEMP FAKE DATA (replace later with backend)
    let predictions = ["is", "was", "will"];

    renderPredictions(predictions);
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
