const BASE_URL = `http://localhost:3000`;

const getByTestId = (testId = "signin", first = true) => {
  const el = cy.get(`[data-testid="${testId}"]`);
  el.should("exist").should("have.length.greaterThan", 0);
  return first ? el.first() : el;
};

const getById = id => {
  const el = cy.get(`#${id}`);
  el.should("exist");
  return el;
};

describe("things-ive-built-homepage", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}?CI=1`);
  });
  it("Can sign in and sign out.", () => {
    getByTestId("signin").click();
    getByTestId("signout").click();
    getByTestId("signin").should("exist");
  });
  it("Can navigate by clicking on Add thing button", () => {
    getByTestId("add-thing").click();
    cy.location("pathname").should("include", "add-thing");
  });
  it("Can navigate by clicking on Explore button", () => {
    getByTestId("explore").click();
    cy.location("pathname").should("include", "explore");
  });
});
describe("things-ive-built-explore", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/explore?CI=1`);
    // getByTestId("thing-preview", false).should("have.length.greaterThan", 1);
    // getByTestId("signin").click();
    // getByTestId("signout");
  });
  it("Can show things built by others", () => {});
});

describe("things-ive-built-add-thing", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/add-thing?CI=1`);
    getByTestId("signin")
      .first()
      .click();
    getByTestId("signout");
  });
  after(() => {
    cy.visit(`${BASE_URL}?CI=1`);
    getByTestId("signout");
  });
  it("Can add thing if authed", () => {
    getByTestId("add-thing-form");
    getByTestId("thing-type").click();
    getByTestId("thing-type-1")
      .click()
      .type("{esc}");

    getById("name").type(`TEST THING NAME`);
    getById("description").type(`TEST THING DESCRIPTION`);
    getById("url").type(`https://github.com`);
    getById("tags").type(`test_tag_1{enter}test_tag_2{enter}`);

    cy.get(`button[type="submit"]`)
      .should("exist")
      .click();

    getById("name").should("have.value", "");
    getById("description").should("have.value", "");
    getById("url").should("have.value", "");
    getById("tags").should("have.value", "");
    getById("added-things-preview")
      .children()
      .should("have.length", 1);
  });
  it("can browse my things", () => {
    cy.visit(`${BASE_URL}/my-things?CI=1`);
    getByTestId("user-things-list")
      .children()
      .should("have.length", 1);
  });
  it("can remove a thing", () => {
    cy.visit(`${BASE_URL}/my-things?CI=1`);
    getByTestId("delete-thing").click();
    getByTestId("user-things-list", false)
      .children()
      .should("have.length", 0);
  });
});
