describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // Create user
    const user = {
      name: 'Pasi Anssi',
      username: 'pasianssi',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('pasianssi')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('pasianssi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('pasianssi')
      cy.get('#password').type('vääräsalasana')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'pasianssi', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Uusi titteli')
      cy.get('#author').type('Kirjailija')
      cy.get('#url').type('localhost')
      cy.get('#create-button').click()
      cy.get('.notification')
        .should('contain', 'a new blog Uusi titteli by Kirjailija added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Uusi titteli Kirjailija')
    })

    describe('And a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Testi', author: 'Testaaja', url: 'localhost' })
      })

      it('it can be liked', function() {
        cy.contains('Testi Testaaja')
          .contains('view')
          .click()
        cy.get('.bloglikes').should('contain', '0')
        cy.contains('like').click()
        cy.get('.bloglikes').should('contain', '1')
      })

      it('it can be deleted by the creator', function() {
        cy.contains('Testi Testaaja')
          .contains('view')
          .click()
        cy.contains('remove')
          .click()
        cy.get('.notification').should('contain', 'blog removed')
        cy.get('html').should('not.contain', 'Testi Testaaja')
      })
    })
  })
})