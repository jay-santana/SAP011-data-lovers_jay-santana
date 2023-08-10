import { statusFilter, speciesFilter } from './data.js';

import data from './data/rickandmorty/rickandmorty.js';

const dataRM = data.results;


//função para trazer todos os personagens em tela
function cardCharacters(dataRM) {
    const printCard = dataRM.map((dataRM) => {
        const card = `
        <div class="style-container">
            <div class="border-container">
                <div class = "cards">
                    <img id="img-card" src = "${dataRM.image}" alt = "Characters image">
                    <div class="name-container">
                        <h2> ${dataRM.name}</h2>
                    </div>
                </div>
            </div>
        </div>`;
        return card;    
    });
    document.getElementById("info-cards").innerHTML = printCard.join("");

}


window.addEventListener('load', () => {
    cardCharacters(dataRM);

    const statusSelect = document.getElementById('status-filter');
    const speciesSelect = document.getElementById('species-filter')
    const cardsContainer = document.getElementById('info-cards');

    statusSelect.addEventListener('change', applyFilters);
    speciesSelect.addEventListener('change', applyFilters);

    function applyFilters() {
        const selectedStatus = statusSelect.value;
        const selectedSpecies = speciesSelect.value;

        // Filtrar os dados com base no status e especie selecionados
        const filteredDataByStatus = statusFilter(dataRM, selectedStatus);
        const filteredDataBySpeciesAndStatus = speciesFilter(filteredDataByStatus, selectedSpecies);

        // Criar os cartões filtrados
        const printCard = filteredDataBySpeciesAndStatus.map((dataRM) => {
            const card = `
            <div class="style-container">
                <div class="border-container">
                    <div class="cards">
                        <img id="img-card" src="${dataRM.image}" alt="Characters image">
                        <h2>${dataRM.name}</h2>
                        <h3> ${dataRM.status}</h3>
                        <h3> ${dataRM.species}</h3>
                    </div>    
                </div>
            </div>`;
            return card;
        });

        // Atualizar o container de cartões com os cartões filtrados
        cardsContainer.innerHTML = printCard.join("");
    }
});
