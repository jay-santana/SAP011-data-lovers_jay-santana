// Funções de filtro
// Função para filtrar por status
export const statusFilter = (data, filter) => {
  if (filter === "All") {
    return data;
  } else {
    return data.filter((character) => character.status === filter);
  }
};

// Função para filtrar por espécie
export const speciesFilter = (data, filter) => {
  if (filter === "All") {
    return data;
  } else {
    return data.filter((character) => character.species === filter);
  }
};

// Função para filtrar por gênero
export const genderFilter = (data, filter) => {
  if (filter === "All") {
    return data;
  } else {
    return data.filter((character) => character.gender === filter);
  }
};

// Função para pesquisar por nome
export const searchName = (dataRM, name) => {
  const filterName = character => character.name.toUpperCase().includes(name.toUpperCase());
  const filteredName = dataRM.filter(filterName);

  return filteredName;
}

// Função para ordenar alfabeticamente
export function alphabeticalOrder(value, dataRM) {
  const charactersAlphabetical = [...dataRM];

  if (value === "All") {
    return dataRM;

  } else if (value === 'ascending-order') {
    charactersAlphabetical.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
    })
  } else {
    charactersAlphabetical.sort(function (a, b) {
      if (a.name > b.name) {
        return -1
      }
    })
  }
  return charactersAlphabetical;
}

// Função para ordenar por popularidade
export function popularityOrder(value, dataRM) {
  const charactersPopularity = [...dataRM];

  if (value === "All") {
    return dataRM;
  } else if (value === 'more-popular') {
    charactersPopularity.sort((a, b) => b.episode.length - a.episode.length);
  } else if (value === 'less-popular') {
    charactersPopularity.sort((a, b) => a.episode.length - b.episode.length);
  }

  // console.log("Inside popularityOrder: charactersPopularity =", charactersPopularity);
  return charactersPopularity;
}

// Função para calcular percentagem
export const calculatePercent = (dataRM, id) => {
  return ((id / dataRM * 100)).toFixed(2);
}



