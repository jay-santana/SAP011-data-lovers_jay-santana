import { statusFilter, speciesFilter, genderFilter, searchName, alphabeticalOrder, popularityOrder, calculatePercent } from '../src/data.js';
const array = [
  {name: "Rick", status: "alive", species: "human", gender: "Male", episode: ["S01E01","S01E02", "S01E03", "S01E04"]},
  {name: "Alien", status: "dead" , species: "alien", gender: "Female",  episode: ["S01E01","S01E02"]},
  {name: "Morty", status: "alive", species: "human", gender: "Male",  episode: ["S01E01","S01E02", "S01E03"]},
]

describe('statusFilter', () => {
  it('is a function', () => {
    expect(typeof statusFilter).toBe('function');
  });

  it(`retorna todos os personagens quando filtrar por All`, () => {
    expect(statusFilter(array, "All")).toBe(array);
  });

  it(`retorna todos os personagens mortos`, () => {
    expect(statusFilter(array, "dead")).toStrictEqual([{name: "Alien", status: "dead",  species: "alien", gender: "Female", episode: ["S01E01","S01E02"]}]);
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
    expect(speciesFilter(array, "alien")).toStrictEqual([{name: "Alien", status: "dead", species: "alien", gender: "Female", episode: ["S01E01","S01E02"]}]);
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
    expect(genderFilter(array, "Female")).toStrictEqual([{name: "Alien", status: "dead", species: "alien", gender: "Female",  episode: ["S01E01","S01E02"]}]);
  });
});

describe('searchName', () => {
  it('is a function', () => {
    expect(typeof searchName).toBe('function');
  });

  it(`retorna o nome do personagem digitado na Busca por Personagem`, () => {
    expect(searchName(array, "Alien")).toStrictEqual([{name: "Alien", status: "dead", species: "alien", gender: "Female",  episode: ["S01E01","S01E02"]}]);
  });
});


describe('alphabeticalOrder', () => {
  it('is a function', () => {
    expect(typeof alphabeticalOrder).toBe('function');
  });

  it(`retorna todos os personagens quando filtrar por All`, () => {
    expect(alphabeticalOrder("All", array)).toEqual(array);
  });

  it('retorna todos os personagens de A-Z', () => {
    const result = alphabeticalOrder('ascending-order', array);
    const expectedOutput = [
      { name: "Alien", status: "dead", species: "alien", gender: "Female", episode: ["S01E01","S01E02"] },
      { name: "Morty", status: "alive", species: "human", gender: "Male", episode: ["S01E01","S01E02", "S01E03"] },
      { name: "Rick", status: "alive", species: "human", gender: "Male", episode: ["S01E01","S01E02", "S01E03", "S01E04"] },
    ];
    expect(result).toEqual(expectedOutput);
  });

  it('retorna todos os personagens de Z-A', () => {
    const result = alphabeticalOrder('descending-order', array);
    const expectedOutput = [
      {name: "Rick", status: "alive", species: "human", gender: "Male", episode: ["S01E01","S01E02", "S01E03", "S01E04"]},
      {name: "Morty", status: "alive", species: "human", gender: "Male",  episode: ["S01E01","S01E02", "S01E03"]},
      {name: "Alien", status: "dead" , species: "alien", gender: "Female",  episode: ["S01E01","S01E02"]},
    ];
    expect(result).toEqual(expectedOutput);
  });

});

describe('popularityOrder', () => {
  it('is a function', () => {
    expect(typeof popularityOrder).toBe('function');
  });

  it(`retorna todos os personagens quando filtrar por All`, () => {
    expect(popularityOrder("All", array)).toEqual(array);
  });

  it(`retorna os personagens mais populares`, () => {
    const result = popularityOrder('more-popular', array);
    const expectedOutput = [
      {name: "Rick", status: "alive", species: "human", gender: "Male", episode: ["S01E01","S01E02", "S01E03", "S01E04"]},
      {name: "Morty", status: "alive", species: "human", gender: "Male",  episode: ["S01E01","S01E02", "S01E03"]},
      {name: "Alien", status: "dead" , species: "alien", gender: "Female",  episode: ["S01E01","S01E02"]},
    ];
    expect(result).toEqual(expectedOutput);
  });

  it(`retorna os personagens menos populares`, () => {
    const result = popularityOrder('less-popular', array);
    const expectedOutput = [
      {name: "Alien", status: "dead" , species: "alien", gender: "Female",  episode: ["S01E01","S01E02"]},
      {name: "Morty", status: "alive", species: "human", gender: "Male",  episode: ["S01E01","S01E02", "S01E03"]},
      {name: "Rick", status: "alive", species: "human", gender: "Male", episode: ["S01E01","S01E02", "S01E03", "S01E04"]},
    ];
    expect(result).toEqual(expectedOutput);
  });
});

describe('calculatePercent', () => {
  it('is a function', () => {
    expect(typeof calculatePercent).toBe('function');
  });

  it('retornar o cálculo de porcentagem referente ao filtro', () => {
    expect(calculatePercent(3, 2)).toBe("66.67")
  })
});
