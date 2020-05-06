describe("Index page", () => {
  beforeEach(() => {
    cy.log(`Visiting http://localhost:3000`);
    cy.visit("/");
  });

  it("should have a indigo navigation bar", () => {
    cy.get(".bg-indigo-500").should("have.length", 1);
  });

  it("should have a login button", () => {
    cy.get("[data-cy=login-btn]").should("have.length", 1);
  });

  it("should have a signup button", () => {
    cy.get("[data-cy=signup-btn]").should("have.length", 1);
  });
});
