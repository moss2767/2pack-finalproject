describe('Host', () => {
  it('Hosts a game --> plays through it --> renders result page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#hostButton').click()
  })
})
