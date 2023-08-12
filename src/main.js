import { statusFilter, speciesFilter, genderFilter } from './data.js';
import data from './data/rickandmorty/rickandmorty.js';

const closeCardButton = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const fade = document.getElementById("fade");

const toggleModal = (dataRM) => {
    modal.classList.toggle('hide');
    fade.classList.toggle('hide');
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
        container.addEventListener("click", toggleModal);
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

