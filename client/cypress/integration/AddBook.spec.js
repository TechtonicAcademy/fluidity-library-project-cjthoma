/// <reference types="cypress" />

describe('library-tests add-book', () => {
  beforeEach(() => {
    cy.visit('localhost:1234/add')
  })

  it('add book with valid title and author', () => {
    const title = 'test_title';
    const author = 'test_author';

    cy.get('#title').type(title).should('have.length', 1);
    cy.get('#author').type(author).should('have.length', 1);

    cy.get('#synopsis').type('test_synopsis').should('have.length', 1);
    cy.get('#published').type('1970-01-01').should('have.length', 1);
    cy.get('#pages').type(1);

    cy.get('#pages').should(($p) => {
      const value = parseInt($p[0].value);
      expect(value).to.be.greaterThan(0);
    });

    cy.get('.fa-star').should(($ratingDisplay) => {
      const display = $ratingDisplay[Math.floor(Math.random() * ($ratingDisplay.length - 0 + 1)) + 0];
      display.click();
    });

    cy.get('.inputForm__edit').should(($submitButtons) => {
      const submit = $submitButtons[0].firstChild;
      submit.click();
    });

    cy.get('.book').last().click();
    cy.get('.details__info__title').should(($title) => {
      const titleElement = $title[0].innerHTML;
      expect(titleElement).to.equal(title);
    });

    cy.get('#author').should(($author) => {
      const authorElement = $author[0].innerHTML;
      expect(authorElement).to.equal(author);
    });
  });

  it('add book invalid all', () => {
    cy.get('.inputForm__edit').should(($submitButtons) => {
      const submit = $submitButtons[0].firstChild;
      submit.click();
    });

    cy.on('window:alert', (text) => {
      expect(text).contains('Invalid');
    });
  });

  it('add book invalid title', () => {
    cy.get('#author').type('test_author'); // set author
    cy.get('#synopsis').type('test_synopsis'); // set synopsis
    cy.get('#pages').type(1); // set pages
    cy.get('.fa-star').should(($ratingDisplay) => {
      const display = $ratingDisplay[Math.floor(Math.random() * ($ratingDisplay.length - 0 + 1)) + 0];
      display.click();
    });

    cy.get('.inputForm__edit').should(($submitButtons) => {
      const submit = $submitButtons[0].firstChild;
      submit.click();
    });

    // invalid - title, author, synopsis, pages, published, rating
    cy.on('window:alert', (text) => {
      expect(text).contains('Title ❌');
    });
  });

  it('add book invalid author', () => {
    cy.get('#title').type('test_title'); // set title
    cy.get('#synopsis').type('test_synopsis'); // set synopsis
    cy.get('#pages').type(1); // set pages
    cy.get('.fa-star').should(($ratingDisplay) => {
      const display = $ratingDisplay[Math.floor(Math.random() * ($ratingDisplay.length - 0 + 1)) + 0];
      display.click();
    });

    cy.get('.inputForm__edit').should(($submitButtons) => {
      const submit = $submitButtons[0].firstChild;
      submit.click();
    });

    // invalid - title, author, synopsis, pages, published, rating
    cy.on('window:alert', (text) => {
      expect(text).contains('Author ❌');
    });
  });

  it('cancel', () => {
    cy.get('.inputForm__edit').should(($submitButtons) => {
      const cancel = $submitButtons[0].lastChild;
      cancel.click();
    });
    cy.get('.home');
  });
});
