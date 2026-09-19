const sparkles = "⋆.˚⟡⊹⁺₊˖࿔࣪✧݁･ﾟ";

const sparklebox = document.querySelector("#sparkles") as HTMLTextAreaElement;
const generateButton = document.querySelector("#generate-btn");

generateButton?.addEventListener("click", () => {
    if(sparklebox) {
        sparklebox.value = "";
        for(let i = 0; i < 6; i++) {
            sparklebox.value += generateSparkles(64) + "\n";
        }
    }
})

function generateSparkles(length: number) {
    let outputSparkles = "";

    const previousIndices = new Array;
    
    for(let i = 0; i < length; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * sparkles.length);
        } while(previousIndices.includes(index));

        previousIndices.push(index);
        if(previousIndices.length > 5) previousIndices.shift();

        outputSparkles += sparkles[index];
    }

    return outputSparkles;
}