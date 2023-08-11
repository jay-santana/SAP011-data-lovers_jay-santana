import { statusFilter, speciesFilter } from './data.js';

import data from './data/rickandmorty/rickandmorty.js';


const closeCardButton = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const fade = document.getElementById("fade");

const toggleModal = (dataRM) => {
    modal.classList.toggle('hide');
    fade.classList.toggle('hide');
    //passar aqui o parametro dataRM, DENTRO DA TOGGLE MODAL CRIAR A TEMPLATESTRING(PARECIDO COM CARDCHARACTER)
}

[closeCardButton, fade].forEach((el) => {
    el.addEventListener('click', () => toggleModal());
})

const dataRM = data.results;


//função para trazer todos os personagens em tela
function cardCharacters(data) {
    const cardsContainer = document.getElementById('info-cards');
    cardsContainer.innerHTML = "";
    data.forEach((dataRM) => {
        const container = document.createElement("div")
        container.classList.add("style-container")
        const card = `
        <div class="border-container">
            <div class = "cards">
                <img id="img-card" src = "${dataRM.image}" alt = "Characters image">
                <div class="name-container">
                    <h2> ${dataRM.name}</h2>
                </div>
            </div>
        </div>`;

        container.innerHTML = card;
        container.addEventListener("click", toggleModal);
        cardsContainer.appendChild(container);
    });

}


window.addEventListener('load', () => {
    cardCharacters(dataRM);

    const statusSelect = document.getElementById('status-filter');
    const speciesSelect = document.getElementById('species-filter');

    statusSelect.addEventListener('change', applyFilters);
    speciesSelect.addEventListener('change', applyFilters);

    function applyFilters() {
        const selectedStatus = statusSelect.value;
        const selectedSpecies = speciesSelect.value;

        // Filtrar os dados com base no status e especie selecionados
        const filteredDataByStatus = statusFilter(dataRM, selectedStatus);
        const filteredDataBySpeciesAndStatus = speciesFilter(filteredDataByStatus, selectedSpecies);
        cardCharacters(filteredDataBySpeciesAndStatus);

    }
});

