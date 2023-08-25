import { statusFilter, speciesFilter, genderFilter, searchName, alphabeticalOrder, calculatePercent, popularityOrder } from './data.js';
import data from './data/rickandmorty/rickandmorty.js';

const dataRM = data.results;
const closeCardButton = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const fade = document.getElementById("fade");
const totalEpisodes = popularityOrder("more-popular", dataRM)[0].episode.length;

const toggleModal = (dataRM) => {
  modal.classList.toggle('hide');
  fade.classList.toggle('hide');

  const modalContent = document.getElementById('modal-body');

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
                    <h2 id="popularity-modal">Aparição:</h2>
                    <h2 id="popularity-modal-data">${dataRM.episode.length} de ${totalEpisodes} episódios</h2>
                </div>   
            </div>
        </div>`;

  modalContent.innerHTML = modalHTML;
}

[closeCardButton, fade].forEach((el) => {
  el.addEventListener('click', () => toggleModal());
})



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

const statusSelectMobile = document.getElementById('status-filter-mobile');
const selectedSpeciesMobile = document.getElementById('species-filter-mobile');
const selectedGenderMobile = document.getElementById('gender-filter-mobile');

const statusSelect = document.getElementById('status-filter');
const speciesSelect = document.getElementById('species-filter');
const genderSelect = document.getElementById('gender-filter');

window.addEventListener('load', () => {
  cardCharacters(dataRM);

  statusSelect.addEventListener('change', applyFiltersDesktop);
  speciesSelect.addEventListener('change', applyFiltersDesktop);
  genderSelect.addEventListener('change', applyFiltersDesktop);


  statusSelectMobile.addEventListener('change', applyFiltersMobile);
  selectedSpeciesMobile.addEventListener('change', applyFiltersMobile);
  selectedGenderMobile.addEventListener('change', applyFiltersMobile);

  function applyFiltersMobile () {
    applyFilters(statusSelectMobile.value, selectedSpeciesMobile.value, selectedGenderMobile.value)
  }


  function applyFiltersDesktop () {
    applyFilters(statusSelect.value, speciesSelect.value, genderSelect.value)
  }

  function applyFilters(selectedStatus, selectedSpecies, selectedGender) {
    
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

    //ordenação por ordem alfabetica
    const selectionOrder = document.getElementById('order-alphabetical');
    selectionOrder.addEventListener('change', () => {
      const orderCharacter = alphabeticalOrder(selectionOrder.value, filteredDataBySpeciesAndStatusAndGender);
      cardCharacters(orderCharacter);
    });

    //ordenação por popularidade
    const popularityCharacters = document.getElementById("order-popularity");
    popularityCharacters.addEventListener('change', () => {
      const orderPopularity = popularityOrder(popularityCharacters.value, filteredDataBySpeciesAndStatusAndGender);
      cardCharacters(orderPopularity);
    });
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
btnTop.addEventListener('click', scrollToTop);

const buttonMobileTop = document.getElementById("btnTopMobile");
buttonMobileTop.addEventListener('click', scrollToTop);

function scrollToTop (){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Filtro de busca por nome
const inputSearchName = document.getElementById("search-box-field-desktop");
const inputSearchNameMobile = document.getElementById("search-box-field-mobile");

function filterName() {
  const characterNameFilter = inputSearchName.value;
  const filteredDataName = searchName(dataRM, characterNameFilter);
  cardCharacters(filteredDataName);
}


function filterNameMobile() {
  const characterNameFilterMobile = inputSearchNameMobile.value;
  const filteredDataName = searchName(dataRM, characterNameFilterMobile);
  cardCharacters(filteredDataName);
}

inputSearchName.addEventListener('input', filterName);
inputSearchNameMobile.addEventListener('input', filterNameMobile);

//ordenação por ordem alfabetica
const selectionOrder = document.getElementById('order-alphabetical');
selectionOrder.addEventListener('change', () => {
  const orderCharacter = alphabeticalOrder(selectionOrder.value, dataRM);
  cardCharacters(orderCharacter);
});

//ordenação por popularidade
const popularityCharacters = document.getElementById("order-popularity");
popularityCharacters.addEventListener('change', () => {
  const orderPopularity = popularityOrder(popularityCharacters.value, dataRM);
  cardCharacters(orderPopularity);
});
