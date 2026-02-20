async function handleTyping() {
    let input = document.getElementById("inputBox");
    let text = input.value;

    if (text.trim() === "") {
        document.getElementById("predictionBar").innerHTML = "";
        return;
    }

    try {
        let response = await fetch("https://kaylin-shrimplike-erica.ngrok-free.dev/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        let data = await response.json();

        showPredictions(data.predictions);
    } catch (error) {
        console.error("Error:", error);
    }
}

function showPredictions(words) {
    let bar = document.getElementById("predictionBar");
    bar.innerHTML = "";

    words.slice(0, 3).forEach(word => {
        let btn = document.createElement("span");
        btn.className = "suggestion";
        btn.innerText = word;

        btn.onclick = () => addWord(word);

        bar.appendChild(btn);
    });
}

function addWord(word) {
    let input = document.getElementById("inputBox");

    let text = input.value.trim();
    let words = text.split(" ");

    // Replace last word OR add new
    words[words.length - 1] = word;

    input.value = words.join(" ") + " ";

    handleTyping(); // keep predictions going
}
