import { internet, name } from "faker";
import { print } from "graphql/language/printer";

import { SIGNUP_USER } from "../../src/pages/signup";
import { User } from "../../src/types/graphql";
import {
  NAVIGATION_AVATAR,
  NAVIGATION_LOGIN_BTN,
  NAVIGATION_LOGOUT_BTN,
} from "../selectors";

type UserWithPassword = Omit<User, "id"> & {
  password: string;
};

export const signup = (user: UserWithPassword): void => {
  cy.request("POST", "/api/graphql", {
    query: print(SIGNUP_USER),
    variables: user,
  }).then((response) => {
    const token = response.body.data.signup.token;
    expect(token).to.exist;
  });
};

export const createRandomUser: () => UserWithPassword = () => ({
  email: internet.email(),
  name: name.firstName(),
  password: internet.password(),
});

export const deleteRandomUserAndLogout = (): void => {
  cy.get(`[data-cy=${NAVIGATION_AVATAR}]`).click();
  cy.get(`[data-cy=${NAVIGATION_LOGOUT_BTN}]`).click();

  cy.request({
    body: {
      query: `
      {
        deleteCurrentUser
      }
    `,
    },
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    url: "/api/graphql",
  });
};
