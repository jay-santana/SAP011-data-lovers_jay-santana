// estas funciones son de ejemplo

export const statusFilter = (data, filter) => {
  if (filter === "All") {
    return data;
  } else {
    return data.filter((character) => character.status === filter);
  }
};

export const speciesFilter = (data, filter) => {
  if (filter === "All") {
    return data;
  } else {
    return data.filter((character) => character.species === filter);
  }
};

export const genderFilter = (data, filter) => {
  if (filter === "All") {
    return data;
  } else {
    return data.filter((character) => character.gender === filter);
  }
};

// Filtro de busca por nome
export const searchName = (dataRM, name) => {
  const filterName = character => character.name.toUpperCase().includes(name.toUpperCase());
  const filteredName = dataRM.filter(filterName);

  return filteredName;
}

export function alphabeticalOrder (value, dataRM) {
  const charactersAlphabetical = [...dataRM];

  if (value === "All") {
    return dataRM;
    
  } else if (value === 'ascending-order') {
    charactersAlphabetical.sort(function(a, b) {
      if (a.name < b.name) {
        return -1
      }
    })
  } else {
    charactersAlphabetical.sort(function(a, b) {
      if (a.name > b.name) {
        return -1
      }
    })
  } 
  return charactersAlphabetical;
}

export const calculatePercent = (dataRM, id) => {
  return ((id / dataRM * 100)).toFixed(2);
}

export function popularityOrder(value, dataRM) {
  const charactersPopularity = [...dataRM];

  if (value === "All") {
    return dataRM;
  } else if (value === 'more-popular') {
    charactersPopularity.sort((a, b) => b.episode.length - a.episode.length);
  } else if (value === 'less-popular') {
    charactersPopularity.sort((a, b) => a.episode.length - b.episode.length);
  }

  return charactersPopularity;
}

