const engWord = document.getElementById("eng"),
    rusWord = document.getElementById("rus"),
    inputs = document.getElementsByClassName("input"),
    addButton = document.getElementById("add-word-btn"),
    table = document.getElementById("table");

let words,
    btnsDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem("words"));

let addWordToTable = index => {
    table.innerHTML += `
        <tr class="tr">
            <td class="eng-word">${words[index].eng}</td>
            <td class="rus-word">${words[index].rus}</td>
            <td>
                <button class="btn-delete">X</button>
            </td>
        </tr>
    `
};

words.forEach((item, i) => {
    addWordToTable(i);
});

function CreateWord(eng, rus) {
    this.eng = eng;
    this.rus = rus;
}

addButton.addEventListener("click", () => {
    if (
        engWord.value.length < 1 ||
        rusWord.value.length < 1 ||
        isFinite(engWord.value) ||
        isFinite(rusWord.value)
    ) {
        for (let key of inputs) {
            key.classList.add("error");
        }
    } else {
        for (let key of inputs) {
            key.classList.remove("error");
        }
        words.push(new CreateWord(engWord.value, rusWord.value));
        localStorage.setItem("words", JSON.stringify(words));
        addWordToTable(words.length - 1);
        engWord.value = "";
        rusWord.value = "";
        addEventDelete();
    }
});


let addEventDelete = () => {
    if (words.length > 0) {
        btnsDelete = document.querySelectorAll(".btn-delete");
        for (let btn of btnsDelete) {
            btn.addEventListener("click", e => {
                const rowIndex = e.target.parentNode.parentNode.rowIndex;
                e.target.parentNode.parentNode.parentNode.remove();
                words.splice(rowIndex, 1);
                localStorage.removeItem("words");
                localStorage.setItem("words", JSON.stringify(words));
            })
        }
    }
};



addEventDelete();