import { internet, name } from "faker";

import {
  LOGIN_RESOURCE,
  LOGOUT_RESOURCE,
  READ_MY_PROFILE_RESOURCE,
  SIGNUP_RESOURCE,
} from "../../src/utils/resources";

type User = {
  email: string;
  name: string;
  password: string;
};

export const login = (user: User) => {
  cy.request("POST", LOGIN_RESOURCE, user).its("body").as("currentUser");
};

export const logout = () => {
  cy.request("DELETE", LOGOUT_RESOURCE);
};

export const signup = (user: User) => {
  cy.request("POST", SIGNUP_RESOURCE, user).its("body").as("currentUser");
};

export const signupAndLogout = (user: User) => {
  signup(user);
  logout();
};

export const verifyUser = ($user: User, user: User) => {
  expect($user).to.include({
    email: user.email,
    name: user.name,
  });

  expect($user).to.have.property("_id");
  expect($user).to.not.have.property("password");
};

export const createRandomUser: () => User = () => ({
  email: internet.email(),
  name: name.firstName(),
  password: internet.password(),
});

export const deleteRandomUserAndLogout = () => {
  cy.request("DELETE", READ_MY_PROFILE_RESOURCE);
  logout();
};
