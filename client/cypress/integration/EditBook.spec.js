/// <reference types="cypress" />

describe('library-tests edit-book', () => {
  beforeEach(() => {
    cy.visit('localhost:1234/bookshelf');
    cy.get('.book').last().click();
    cy.get('.details__edit').should(($submitButtons) => {
      const edit = $submitButtons[0].firstChild;
      edit.click();
    });
  })

  it('invalid book edit entry', () => {
    cy.get('#title').clear();
    cy.get('#author').clear();
    cy.get('#published').clear();
    cy.get('#synopsis').clear();
    cy.get('#pages').clear();

    cy.get('.inputForm__edit').should(($submitButtons) => {
      const submit = $submitButtons[0].firstChild;
      submit.click();
    });

    cy.get('.details__info__title').should('have.length', 1);
  });

  it('valid book edit entry', () => {
    const title = 'not_another_test_title';
    const author = 'not_another_test_author';

    cy.get('#title').clear();
    cy.get('#title').type(title).should('have.length', 1);

    cy.get('#author').clear();
    cy.get('#author').type(author).should('have.length', 1);

    cy.get('#synopsis').clear();
    cy.get('#synopsis').type('not_another_test_synopsis').should('have.length', 1);

    cy.get('#published').clear();
    cy.get('#published').type('2004-08-18').should('have.length', 1);

    cy.get('#pages').clear();
    cy.get('#pages').type(112);

    cy.get('.inputForm__edit').should(($submitButtons) => {
      const submit = $submitButtons[0].firstChild;
      submit.click();
    });

    cy.get('.details__info__title').should(($title) => {
      const titleElement = $title[0].innerHTML;
      expect(titleElement).to.equal(title);
    });

    cy.get('#author').should(($author) => {
      const authorElement = $author[0].innerHTML;
      expect(authorElement).to.equal(author);
    });
  });

  it('check invalid edit route', () => {
    cy.visit('localhost:1234/edit/99999999');
    cy.get('.bookshelf');
  });

  it('delete book', () => {
    cy.get('.inputForm__edit').should(($submitButtons) => {
      $submitButtons[0].lastChild.click();
    });

    cy.get('.bookshelf');
  });
});
