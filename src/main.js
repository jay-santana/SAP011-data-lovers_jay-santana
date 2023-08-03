import { example } from './data.js';
// import data from './data/lol/lol.js';
import data from './data/rickandmorty/rickandmorty.js';
// import data from './data/rickandmorty/rickandmorty.js';

const dataRM = data.results;

function cardCharacters (dataRM) {
    const printCard = dataRM.map((dataRM) => {
        const card = `
        <div class = "cards">
            <img src = "${dataRM.image}" alt = "Characters image">
            <h2> ${dataRM.name}</h2>
            <h3> ${dataRM.type}</h3>
            `;
        return card;
    });
    document.getElementById("info-cards"). innerHTML = printCard.join("");

}

window.addEventListener('load', () => cardCharacters(dataRM))

console.log(example, data);
