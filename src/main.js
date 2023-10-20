import { statusFilter, speciesFilter, genderFilter, searchName, alphabeticalOrder, calculatePercent, popularityOrder } from './data.js';
import data from './data/rickandmorty/rickandmorty.js';

const dataRM = data.results;
const closeCardButton = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const fade = document.getElementById("fade");
const totalEpisodes = popularityOrder("more-popular", dataRM)[0].episode.length;

// Manipulação do modal
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

//DOM para trazer os IDS dos mobile e desktop

//Filtros
const statusSelectMobile = document.getElementById('status-filter-mobile');
const speciesSelectMobile = document.getElementById('species-filter-mobile');
const genderSelectMobile = document.getElementById('gender-filter-mobile');

const statusSelect = document.getElementById('status-filter');
const speciesSelect = document.getElementById('species-filter');
const genderSelect = document.getElementById('gender-filter');

//Porcentagem em relação ao total de personagens
const percentReturned = document.getElementById("percentText");
const percentReturnedMobile = document.getElementById("percentText-mobile");

//Oredenação alfabética
const selectionOrder = document.getElementById('order-alphabetical');
const selectionOrderMobile = document.getElementById('order-alphabetical-mobile');

//Oredenação por popularidade 
const selectionOrderPopularity = document.getElementById('order-popularity');
const selectionOrderPopularityMobile = document.getElementById('order-popularity-mobile');

window.addEventListener('load', () => {
  cardCharacters(dataRM);

  statusSelect.addEventListener('change', applyFiltersDesktop);
  speciesSelect.addEventListener('change', applyFiltersDesktop);
  genderSelect.addEventListener('change', applyFiltersDesktop);
  selectionOrder.addEventListener('change', applyFiltersDesktop);
  selectionOrderPopularity.addEventListener('change', applyFiltersDesktop);

  statusSelectMobile.addEventListener('change', applyFiltersMobile);
  speciesSelectMobile.addEventListener('change', applyFiltersMobile);
  genderSelectMobile.addEventListener('change', applyFiltersMobile);
  selectionOrderMobile.addEventListener('change', applyFiltersMobile);
  selectionOrderPopularityMobile.addEventListener('change', applyFiltersMobile);

  function applyFiltersMobile () {
    applyFilters(statusSelectMobile.value, speciesSelectMobile.value, genderSelectMobile.value, selectionOrderMobile.value, selectionOrderPopularityMobile.value)
  }

  function applyFiltersDesktop () {
    applyFilters(statusSelect.value, speciesSelect.value, genderSelect.value, selectionOrder.value, selectionOrderPopularity.value)
  }

  function applyFilters(selectedStatus, selectedSpecies, selectedGender, selectionOrder, selectionOrderPopularity) {
    
    // Filtrar os dados com base no status, espécie e gênero selecionados
    const filteredDataByStatus = statusFilter(dataRM, selectedStatus);
    const filteredDataBySpeciesAndStatus = speciesFilter(filteredDataByStatus, selectedSpecies);
    const filteredDataBySpeciesAndStatusAndGender = genderFilter(filteredDataBySpeciesAndStatus, selectedGender);
    
    // criar cópia dos dados filtrados para ordenação
    let orderedCharacters = [...filteredDataBySpeciesAndStatusAndGender];

    orderedCharacters = popularityOrder (selectionOrderPopularity, orderedCharacters);
    cardCharacters (orderedCharacters);

    orderedCharacters = alphabeticalOrder (selectionOrder, orderedCharacters);
    cardCharacters(orderedCharacters);

    //calculo de porcentagem em relação aos personagens filtrados
    const percentData = calculatePercent(dataRM.length, orderedCharacters.length);
    percentReturned.innerHTML = (`Este filtro representa <span class="percentStyleDesktop">${percentData}% </span> do <span class="allCharactersDesktop"> total de ${dataRM.length} </span> personagens.`);
    percentReturnedMobile.innerHTML = (`Este filtro representa <span class="percentStyleMobile">${percentData}% </span>do <span class="allCharactersMobile"> total de ${dataRM.length} </span>personagens.`);  
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

inputSearchName.addEventListener('input', filterName);
inputSearchNameMobile.addEventListener('input', filterNameMobile);

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

<<<<<<< HEAD

inputSearchName.addEventListener('input', filterName);
inputSearchNameMobile.addEventListener('input', filterNameMobile);

=======
>>>>>>> e96a49486a06fb4d5f195191aa1537d53f0f7e2b
//Função menu-burguer
const sideBarMobile = document.querySelector('.side-bar-mobile');
const menuBurguer = document.getElementById('burguer');

menuBurguer.addEventListener('click', toggleMenuBurguer);

function toggleMenuBurguer(){
  sideBarMobile.classList.toggle('active');
  // menuBurguer.classList.toggle('open');
}




