import { NAVIGATION_LOGIN_BTN, NAVIGATION_SIGNUP_BTN } from "../selectors";

describe("Index page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have a indigo navigation bar", () => {
    cy.get(".bg-indigo-500").should("have.length", 1);
  });

  it("should have a login button", () => {
    cy.get(`[data-cy=${NAVIGATION_LOGIN_BTN}]`).should("have.length", 1);
  });

  it("should have a signup button", () => {
    cy.get(`[data-cy=${NAVIGATION_SIGNUP_BTN}]`).should("have.length", 1);
  });
});
