import "./style.css";
import alea from "alea";

const sparkles = "⋆.˚⟡⊹⁺₊˖࿔࣪✧݁･ﾟ";
const disabledSparkles = "࿔";
const sparklesEnabled = new Map<string, boolean>;
let seed = Math.random();

const sparklebox = document.querySelector("#sparkles") as HTMLTextAreaElement;
const generateButton = document.querySelector("#generate-btn");
const optionsList = document.querySelector("#options") as HTMLUListElement;

generateButton?.addEventListener("click", () => {
    seed = Math.random();
    regenerate();
});

loadOptions();
createOptionsList();
regenerate();

function createOptionsList() {
    if(!optionsList) return;

    const chars = sparkles.split("");

    for(const char of chars) {
        const optionElement = document.createElement("li");
        optionElement.classList.add("option");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const optionName = document.createElement("span");
        optionName.textContent = char;

        optionElement.append(checkbox, optionName);

        checkbox.checked = sparklesEnabled.get(char) ?? false;

        optionElement.addEventListener("click", () => checkbox.click());
        checkbox.addEventListener("click", e => e.stopPropagation());
        checkbox.addEventListener("input", () => {
            sparklesEnabled.set(char, checkbox.checked);
            saveOptions();
            regenerate();
        });

        optionsList.append(optionElement);
    }
}

function loadOptions() {
    for(const char of sparkles.split("")) {
        const storageKey = "char." + char.charCodeAt(0);
        const storageValue = localStorage.getItem(storageKey);

        if(storageValue == null) {
            sparklesEnabled.set(char, !disabledSparkles.includes(char));
        } else {
            sparklesEnabled.set(char, storageValue != "false");
        }
    }
}
function saveOptions() {
    for(const [ char, enabled ] of sparklesEnabled.entries()) {
        const storageKey = "char." + char.charCodeAt(0);

        localStorage.setItem(storageKey, enabled ? "true" : "false");
    }
}

function regenerate() {
    if(!sparklebox) return;

    sparklebox.replaceChildren();
    for(let i = 0; i < 6; i++) {
        const span = document.createElement("span");
        const chars = Array.from(sparklesEnabled.entries()).filter(v => v[1]).map(v => v[0]);
        span.textContent = generateSparkles(seed + i, 64, chars);
        sparklebox.append(span);
    }
}

function generateSparkles(seed: number, length: number, chars: string[]) {
    if(chars.length == 0) return "";

    const rand = alea(seed);
    let outputSparkles = "";

    const previousIndices = new Array;

    const charsUntilRepeat = Math.min(Math.floor(chars.length * 0.3), chars.length - 1);
    
    for(let i = 0; i < length; i++) {
        let index;
        do {
            index = Math.floor(rand() * chars.length);
        } while(previousIndices.includes(index));

        previousIndices.push(index);
        if(previousIndices.length > charsUntilRepeat) previousIndices.shift();

        outputSparkles += chars[index];
    }

    return outputSparkles;
}