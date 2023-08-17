import { statusFilter, anotherExample } from '../src/data.js';
const array = [{name: "Rick", status: "alive"},{name: "Morty", status: "alive"},{name: "Alien", status: "dead"}]

describe('statusFilter', () => {
  it('is a function', () => {
    expect(typeof statusFilter).toBe('function');
  });

  it(`retorna todos os personagens quando filtrar por All`, () => {
    expect(statusFilter(array, "All")).toBe(array);
  });

  it(`retorna todos os personagens quando filtrar por All`, () => {
    expect(statusFilter(array, "dead")).toStrictEqual([{name: "Alien", status: "dead"}]);
  });
});


describe('anotherExample', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});
