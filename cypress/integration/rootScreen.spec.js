// import styles from '../../src/app/components/TeamCard/TeamCard/TeamCard.module.css';

describe('RootScreen', () => {
  it('is working', () => {
    expect(true).to.equal(true)
  })
  it('opens the app', () => {
    cy.visit('http://localhost:3000')
  })

  it('is fetching teams', () => {

  })

  it('is fetching players', () => {
    cy.wait(2000)
  })

  it('is searching by team', () => {
    cy.get('input').type("Celtics");

    cy.get(styles.teamCard).should('have.text', "Celtics")
    cy.get('input').clear();
  })
  
  it('is searching by player', () => {
    cy.get('input').type("Lebron James");

  })
})

