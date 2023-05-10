import React from 'react'
import Navigation from '../../../src/Components/Navigation'
import {mount} from "cypress/react18"
import { BrowserRouter } from 'react-router-dom'

describe('<Navigation />', () => {
  it('renders the Navbar component', () => {
    mount(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>)
    cy.get('[data-cy="navbar"]').should('exist');
  });
//get('[data-cy="dropdown"]')
  it("renders the correct navbar options", () => {
    mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>)
    cy.get('[data-cy="navbar"]').contains("Välj graf").click();
    cy.get('[data-cy="dropdown-item2"]').should("exist");
    cy.get('[data-cy="dropdown-item6"]').should("exist");
  });
  it("leads to correct route when navbar option is clicked", () => {
    mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>)
    cy.get('[data-cy="navbar"]').contains("Välj graf").click();
    cy.get('[data-cy="dropdown-item2"]').click();
    cy.url().should("include", "/kpimonthlyrestaurants");
    cy.get("text").should("include.text", "Restaurangprisernas utveckling, månadstakt")
  });
})