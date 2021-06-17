describe("Appointments", () => {

  // each test intially rest the data, visit homepage and select Monday
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });



  // booking interview test
  it("should book an interview", () => {
    // press Add button
    cy.get("[alt=Add]")
      .first()
      .click();

    // input name and select interviewer
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();

    // click save
    cy.contains("Save").click();

    // display student and interviewer name
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });



  // editing interview test
  it("should edit an interview", () => {
    // click edit button
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    // clear the intial datas and select Tori Malcom
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    // click save
    cy.contains("Save").click();

    // display with new student and interviewer name
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });



  // deleting interview test
  it("should cancel an interview", () => {
    // click delete button
    cy.get("[alt=Delete]")
      .click({ force: true });

    // click confirm button
    cy.contains("Confirm").click();

    // deleting message shows and disappear when it's done.
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    // Archie Cohen does not exist anymore. Empty slot
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })
});