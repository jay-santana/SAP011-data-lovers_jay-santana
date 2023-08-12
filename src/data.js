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

export const anotherExample = () => {
  return 'OMG';
};
