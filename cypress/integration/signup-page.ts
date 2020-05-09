import { MY_PROFILE_RESOURCE } from "../../src/utils/resources";
import {
  createRandomUser,
  deleteRandomUserAndLogout,
  verifyUser,
} from "../libs/authentication";
import {
  SIGNUP_FORM_EMAIL_FIELD,
  SIGNUP_FORM_NAME_FIELD,
  SIGNUP_FORM_PASSWORD_FIELD,
  SIGNUP_FORM_SUBMIT_BTN,
} from "../selectors";

const user = createRandomUser();

describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("redirects to /home on success", () => {
    cy.get(`[data-cy=${SIGNUP_FORM_NAME_FIELD}]`).type(user.name);
    cy.get(`[data-cy=${SIGNUP_FORM_EMAIL_FIELD}]`).type(user.email);
    cy.get(`[data-cy=${SIGNUP_FORM_PASSWORD_FIELD}]`).type(user.password);
    cy.get(`[data-cy=${SIGNUP_FORM_SUBMIT_BTN}]`).click();

    cy.url().should("include", "/home");

    cy.window()
      .its("Tinnies.Cache." + MY_PROFILE_RESOURCE)
      .should(($user) => verifyUser($user, user));
  });

  after(() => {
    deleteRandomUserAndLogout();
  });
});
