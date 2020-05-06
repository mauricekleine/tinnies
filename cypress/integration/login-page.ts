import { READ_MY_PROFILE_RESOURCE } from "../../src/utils/resources";
import {
  createRandomUser,
  deleteRandomUserAndLogout,
  signupAndLogout,
  verifyUser,
} from "../libs/authentication";
import {
  LOGIN_FORM_EMAIL_FIELD,
  LOGIN_FORM_PASSWORD_FIELD,
  LOGIN_FORM_SUBMIT_BTN,
} from "../selectors";

const user = createRandomUser();

describe("Login page", () => {
  before(() => {
    signupAndLogout(user);
  });

  beforeEach(() => {
    cy.visit("/login");
  });

  it("redirect to /home on success", () => {
    cy.get(`[data-cy=${LOGIN_FORM_EMAIL_FIELD}]`).type(user.email);
    cy.get(`[data-cy=${LOGIN_FORM_PASSWORD_FIELD}]`).type(user.password);
    cy.get(`[data-cy=${LOGIN_FORM_SUBMIT_BTN}]`).click();

    cy.url().should("include", "/home");

    cy.window()
      .its("Tinnies.Cache." + READ_MY_PROFILE_RESOURCE)
      .should(($user) => verifyUser($user, user));
  });

  after(() => {
    deleteRandomUserAndLogout();
  });
});
