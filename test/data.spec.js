import { statusFilter, speciesFilter, genderFilter, searchName } from '../src/data.js';
const array = [
  {name: "Rick", status: "alive", species: "human", gender: "Male"},
  {name: "Morty", status: "alive", species: "human", gender: "Male"},
  {name: "Alien", status: "dead" , species: "alien", gender: "Female"},
]

describe('statusFilter', () => {
  it('is a function', () => {
    expect(typeof statusFilter).toBe('function');
  });

  it(`retorna todos os personagens quando filtrar por All`, () => {
    expect(statusFilter(array, "All")).toBe(array);
  });

  it(`retorna todos os personagens mortos`, () => {
    expect(statusFilter(array, "dead")).toStrictEqual([{name: "Alien", status: "dead",  species: "alien", gender: "Female"}]);
  });
});


describe('speciesFilter', () => {
  it('is a function', () => {
    expect(typeof speciesFilter).toBe('function');
  });

  it(`retorna todos os personagens quando filtrar por All`, () => {
    expect(speciesFilter(array, "All")).toBe(array);
  });

  it(`retorna todos os personagens humanos quando forem filtrados`, () => {
    expect(speciesFilter(array, "alien")).toStrictEqual([{name: "Alien", status: "dead", species: "alien", gender: "Female"}]);
  });
});


describe('genderFilter', () => {
  it('is a function', () => {
    expect(typeof genderFilter).toBe('function');
  });

  it(`retorna todos os personagens quando filtrar por All`, () => {
    expect(genderFilter(array, "All")).toBe(array);
  });

  it(`retorna todos os personagens do genero feminino quando forem filtrados`, () => {
    expect(genderFilter(array, "Female")).toStrictEqual([{name: "Alien", status: "dead", species: "alien", gender: "Female"}]);
  });
});

describe('searchName', () => {
  it('is a function', () => {
    expect(typeof searchName).toBe('function');
  });

  it(`retorna o nome do personagem digitado na Busca por Personagem`, () => {
    expect(searchName(array, "Alien")).toStrictEqual([{name: "Alien", status: "dead", species: "alien", gender: "Female"}]);
  });
});

// describe('anotherExample', () => {
//   it('is a function', () => {
//     expect(typeof anotherExample).toBe('function');
//   });

//   it('returns `anotherExample`', () => {
//     expect(anotherExample()).toBe('OMG');
//   });
// });
