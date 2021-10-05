/// <reference types="cypress" />

describe('library-tests details', () => {

  it('check valid details route', () => {
    cy.visit('localhost:1234/details/1');

    cy.get('.details__info__title').should('have.length', 1);
    cy.get('#author').should('have.length', 1);
  });

  it('check invalid details route', () => {
    cy.visit('localhost:1234/details/200');
    cy.get('.bookshelf');
  });
});
