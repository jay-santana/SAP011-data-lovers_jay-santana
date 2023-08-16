import { statusFilter, speciesFilter, genderFilter, searchName, alphabeticalOrder, calculatePercent} from './data.js';
import data from './data/rickandmorty/rickandmorty.js';

const closeCardButton = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const fade = document.getElementById("fade");

const toggleModal = (dataRM) => {
    modal.classList.toggle('hide');
    fade.classList.toggle('hide');

    const modalContent = document.getElementById ('modal-body');

    const modalHTML = `
        <div class="border-modal-container">
            <div class="cards-modal">
                <img id="img-modal-card" src="${dataRM.image}" alt="Characters image">
                <div class="name-modal-container">
                    <h2 id="name-modal">${dataRM.name}</h2>
                </div>
                <div class="status-modal-container">
                    <h2 id="status-modal">Status:</h2>
                    <h2 id="status-modal-data">${dataRM.status}</h2>
                </div>
                <div class="species-modal-container">
                    <h2 id="species-modal">Espécie:</h2>
                    <h2 id="species-modal-data">${dataRM.species}</h2>
                </div>
                <div class="type-modal-container">
                    <h2 id="type-modal">Tipo:</h2>
                    <h2 id="type-modal-data">${dataRM.type ? dataRM.type : "unknown"}</h2>
                </div>
                <div class="gender-modal-container">
                    <h2 id="gender-modal">Gênero:</h2>
                    <h2 id="gender-modal-data">${dataRM.gender}</h2>
                </div>
                <div class="origin-modal-container">
                    <h2 id="origin-modal">Origem:</h2>
                    <h2 id="origin-modal-data">${dataRM.origin.name}</h2>
                </div>
                <div class="location-modal-container">
                    <h2 id="location-modal">Localização:</h2>
                    <h2 id="location-modal-data">${dataRM.location.name}</h2>
                </div>
                <div class="popularity-modal-container">
                    <h2 id="popularity-modal">Aparições:</h2>
                    <h2 id="popularity-modal-data">${dataRM.episode.length}/31 episódios</h2>
                </div>   
            </div>
        </div>`;

    modalContent.innerHTML = modalHTML;
    //passar aqui o parametro dataRM, dentro da TOGGLE MODAL criar a TEMPLATESTRING(parecido com CARDCHARACTER)
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
        container.addEventListener("click", () => toggleModal(dataRM));
        cardsContainer.appendChild(container);
    });
}

window.addEventListener('load', () => {
    cardCharacters(dataRM);

    const statusSelect = document.getElementById('status-filter');
    const speciesSelect = document.getElementById('species-filter');
    const genderSelect = document.getElementById('gender-filter');

    statusSelect.addEventListener('change', applyFilters);
    speciesSelect.addEventListener('change', applyFilters);
    genderSelect.addEventListener('change', applyFilters);

    function applyFilters() {
        const selectedStatus = statusSelect.value;
        const selectedSpecies = speciesSelect.value;
        const selectedGender = genderSelect.value;

        // Filtrar os dados com base no status, espécie e gênero selecionados
        const filteredDataByStatus = statusFilter(dataRM, selectedStatus);
        const filteredDataBySpeciesAndStatus = speciesFilter(filteredDataByStatus, selectedSpecies);
        cardCharacters(filteredDataBySpeciesAndStatus);
        const filteredDataBySpeciesAndStatusAndGender = genderFilter(filteredDataBySpeciesAndStatus, selectedGender);
        cardCharacters(filteredDataBySpeciesAndStatusAndGender);

        //calculo de porcentagem em relação aos personagens filtrados
        const percentReturned = document.getElementById("percentText");
        const percentData = calculatePercent(dataRM.length, filteredDataBySpeciesAndStatusAndGender.length);
        percentReturned.innerHTML = (`Este filtro representa <span class="percent">${percentData}%</span> do <span class="allCharacters">total de  ${dataRM.length}</span> personagens. `);
    }
});

const btnTop = document.getElementById('btnTop');

// Mostrar ou ocultar o botão ao rolar a página
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        btnTop.style.display = 'block';
    } else {
        btnTop.style.display = 'none';
    }
});

// volta ao topo ao clicar no botão
btnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Filtro de busca por nome
const inputSearchName = document.getElementById("search-box-field");

function filterName () {
    const characterNameFilter = inputSearchName.value;
    const filteredDataName = searchName (dataRM, characterNameFilter);
    cardCharacters (filteredDataName);
}
inputSearchName.addEventListener('input', filterName);


//ordenação por ordem alfabetica
const selectionOrder =  document.getElementById('order-alphabetical');
selectionOrder.addEventListener('change', () => {
    const orderCharacter = alphabeticalOrder(selectionOrder.value, dataRM);
    cardCharacters (orderCharacter);
});

//ordenação por popularidade
// const popularityCharacters =  document.getElementById("order-popularity");
// popularityCharacters.addEventListener('change', () => {
//     const orderPopularity = populatiryOrder(popularityCharacters.episode, dataRM);
//     cardCharacters (orderPopularity);
// });
