class ProfilePage {
  elements = {
    myInfoTab: () => cy.contains("span.oxd-main-menu-item--name", "My Info"),
    membershipsTab: () => cy.contains("a.orangehrm-tabs-item", "Memberships"),
    immigrationTab: () => cy.contains("a.orangehrm-tabs-item", "Immigration"),
    addImmigrationButton: () =>
      cy
        .contains("h6", "Assigned Immigration Records")
        .parents("[class*=orangehrm-action-header]")
        .find("button"),

    passportNumberField: () => cy.get("input.oxd-input.oxd-input--active"),

    personalTab: () => cy.contains("a.orangehrm-tabs-item", "Personal Details"),
    firstNameField: () => cy.get('input[name="firstName"]'),
    saveButton: () =>
      cy.get(
        "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
      ),

    contactTab: () => cy.contains("a.orangehrm-tabs-item", "Contact Details"),
    emergencyTab: () =>
      cy.contains("a.orangehrm-tabs-item", "Emergency Contacts"),

    dependentsTab: () => cy.contains("a.orangehrm-tabs-item", "Dependents"),
    addDependentButton: () =>
      cy
        .contains("h6", "Assigned Dependents")
        .parents("[class*=orangehrm-action-header]")
        .find("button"),
    relationDropdown: () =>
      cy
        .get("label")
        .contains("Relationship")
        .parents(".oxd-grid-item")
        .find(".oxd-select-text"),
    dependentName: () =>
      cy
        .get("label")
        .contains("Name")
        .parents(".oxd-input-group")
        .find("input"),
    tbaleOfDependents: () =>
      cy.get(".orangehrm-container").eq(0).find(".oxd-table-card").eq(0),
    confirmDeleteButton: () =>
      cy
        .get(
          "button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin"
        )
        .should("be.visible"),
    addAttachmentButton: () =>
      cy
        .contains("h6", "Attachments")
        .parents("[class*=orangehrm-action-header]")
        .find("button"),
    commentAreaButton: () =>
      cy.get('textarea[placeholder="Type comment here"]'),
  };

  // Test Case 1
  /**
   * Navigates to the "My Info" tab and returns the current page URL..
   */
  myInfoTabAppear() {
    this.elements.myInfoTab().click();
    cy.wait(2000);
  }

  // Test Case 2
  /**
   * Clears the name field and returns validation message, if any..
   */
  checkRequiredFieldError(comment) {
    this.elements.myInfoTab().click();
    cy.wait(2000);

    this.elements.personalTab().click();
    cy.wait(2000);

    this.elements.firstNameField().clear();
  }

  // Test Case 3
  /**
   * Updates the user's name in the "My Info" tab and returns the profile name after saving and reloading..
   */
  editProfileName(uniqueName) {
    this.elements.myInfoTab().click();
    cy.wait(2000);

    this.elements.personalTab().click();
    cy.wait(1000);

    this.elements.firstNameField().clear().type(uniqueName);

    this.elements.saveButton().eq(0).click();
  }

  // Test Case 4
  /**
   * Collects and returns the href attributes from the sub-tabs
   * under the "My Info" section to verify uniqueness..
   */
  checkPersonalTab() {
    this.elements.myInfoTab().click();
    cy.wait(1000);

    this.elements.personalTab().click();
  }
  checkContactTab() {
    this.elements.myInfoTab().click();
    cy.wait(1000);

    this.elements.contactTab().click();
  }
  checkEmergencyTab() {
    this.elements.myInfoTab().click();
    cy.wait(1000);

    this.elements.emergencyTab().click();
  }

  // Test Case 5
  /**
   * Adds a dependent to the user's profile with the specified name and relationship.
   * If "Other" is selected as a relationship, an additional specify field is filled..
   */
  assignDependentRecord(uniqueName) {
    this.elements.myInfoTab().click();
    cy.wait(1000);

    this.elements.dependentsTab().click();
    cy.wait(2000);

    this.elements.addDependentButton().click();

    this.elements.dependentName().type(uniqueName);

    this.elements.relationDropdown().click();
    cy.get(".oxd-select-dropdown > div").eq(1).click();

    this.elements.saveButton().eq(0).click();
  }

  // Test Case 6
  /**
   * Selects "Other" from the relationship dropdown and checks if the "Specify" input becomes visible..
   */
  checkRelationOtherInputBar() {
    this.elements.myInfoTab().click();
    cy.wait(1000);

    cy.contains("Please Specify").should("not.exist");

    this.elements.dependentsTab().click();
    cy.wait(2000);

    this.elements.addDependentButton().click();

    this.elements.relationDropdown().click();
    cy.get(".oxd-select-dropdown > div").eq(2).click();
  }

  // Test Case 7
  /**
   * Adds a membership with the given amount and returns all amounts from the list.
   */
  addMembership(amount) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    cy.contains("a.orangehrm-tabs-item", "Memberships").click();
    cy.wait(1000);

    cy.contains("h6", "Assigned Memberships")
      .parents("[class*=orangehrm-action-header]")
      .find("button")
      .click();

    cy.get(".oxd-select-text").first().click();
    cy.get(".oxd-select-dropdown > div").eq(1).click();

    cy.wait(1000);

    cy.get("input").eq(1).clear().type(amount);

    this.elements.saveButton().eq(0).click();
    cy.wait(6000);

    return cy.get("div[role='row'] > div:nth-child(4)").then(($cells) => {
      return Cypress._.map($cells, (cell) => cell.textContent.trim());
    });
  }

  // Test Case 8
  /**
   * Adds and then deletes a membership with the given amount.
   * Returns all membership amounts after deletion.
   */
  deleteMembership(amount) {
    this.elements.myInfoTab().click();
    cy.wait(2000);

    cy.contains("a.orangehrm-tabs-item", "Memberships").click();
    cy.wait(1000);

    cy.contains("h6", "Assigned Memberships")
      .parents("[class*=orangehrm-action-header]")
      .find("button")
      .click();

    cy.get(".oxd-select-text").first().click();
    cy.get(".oxd-select-dropdown > div").eq(1).click();

    cy.wait(1000);

    cy.get("input").eq(1).clear().type(amount);

    this.elements.saveButton().eq(0).click();
    cy.wait(6000);

    cy.get(
      `.oxd-table-card:has(div:contains('${amount}.00')) i.oxd-icon.bi-trash`
    ).click({ force: true });
    cy.wait(1000);
    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin"
    )
      .should("be.visible")
      .click();
    cy.wait(6000);

    return cy.get("div[role='row'] > div:nth-child(4)").then(($cells) => {
      return Cypress._.map($cells, (cell) => cell.textContent.trim());
    });
  }

  // Test Case 9
  /**
   * Edits the first membership and updates it with the given amount.
   * Returns all membership amounts after editing.
   */
  editMembership(newAmount) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    cy.contains("a.orangehrm-tabs-item", "Memberships").click();
    cy.wait(1000);

    cy.get(".oxd-table-card").first().find("i.oxd-icon.bi-pencil-fill").click();
    cy.wait(6000);

    cy.get(".oxd-select-text").first().click();
    cy.get(".oxd-select-dropdown > div").eq(1).click();
    cy.wait(1000);

    cy.get("input").eq(1).clear().type(newAmount);

    this.elements.saveButton().eq(0).click();
    cy.wait(6000);

    return cy.get("div[role='row'] > div:nth-child(4)").then(($cells) => {
      return Cypress._.map($cells, (cell) => cell.textContent.trim());
    });
  }

  // Test Case 10
  /**
   * Uploads an attachment with the given comment in the Memberships subtab.
   * Returns all comments from the attachment list.
   */
  addmembershipAttach(cmnt, fileName) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    this.elements.membershipsTab().click();
    cy.wait(2000);
    this.elements.addAttachmentButton().click();
    cy.wait(2000);

    cy.get('input[type="file"].oxd-file-input')
      .should("exist")
      .selectFile(`cypress/fixtures/${fileName}`, { force: true });
    cy.wait(2000);

    cy.get('textarea[placeholder="Type comment here"]').clear().type(cmnt);

    this.elements.saveButton().click();
    cy.get(".oxd-toast", { timeout: 10000 })
      .should("exist")
      .and("contain", "Successfully Saved");
    cy.wait(6000);

    return cy
      .get(".oxd-table")
      .eq(1)
      .find('div[role="row"] > div:nth-child(3)')
      .then(($cells) => {
        return Cypress._.map($cells, (cell) => cell.innerText.trim());
      });
  }

  // Test Case 11
  /**
   * Adds an immigration record with the given passport number.
   * Returns all passport numbers from the immigration list.
   */
  addImegration(PPn) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    this.elements.immigrationTab().click();
    cy.wait(2000);
    this.elements.addImmigrationButton().eq(0).click();
    cy.wait(1000);
    this.elements.passportNumberField().eq(1).clear().type(PPn);
    this.elements.saveButton().click();
    cy.wait(6000);

    return cy.get("div[role='row'] > div:nth-child(3)").then(($cells) => {
      return Cypress._.map($cells, (cell) => cell.innerText.trim());
    });
  }

  // Test Case 12
  /**
   * Edits the first immigration record and updates it with the given passport number.
   * Returns all passport numbers from the immigration list.
   */
  editImmigration(Uppn) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    this.elements.immigrationTab().click();
    cy.wait(3000);
    cy.get(".oxd-table-card")
      .first()
      .find("i.oxd-icon.bi-pencil-fill")
      .first()
      .click();
    cy.wait(2000);
    this.elements.passportNumberField().eq(1).clear().type(Uppn);
    this.elements.saveButton().click();
    cy.wait(6000);
    cy.get("div[role='row'] > div:nth-child(3)").should("contain", Uppn);
    return cy.get("div[role='row'] > div:nth-child(3)").then(($cells) => {
      return Cypress._.map($cells, (cell) => cell.innerText.trim());
    });
  }

  // Test Case 13
  /**
   * Adds and then deletes an immigration record with the given passport number.
   * Returns all passport numbers from the immigration list after deletion.
   */
  deleteImmigration(PPn) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    this.elements.immigrationTab().click();
    cy.wait(2000);
    this.elements.addImmigrationButton().eq(0).click();
    cy.wait(1000);
    this.elements.passportNumberField().eq(1).clear().type(PPn);
    this.elements.saveButton().click();
    cy.wait(6000);

    cy.get(`.oxd-table-card:contains('${PPn}') i.oxd-icon.bi-trash`)
      .should("be.visible")
      .click({ force: true });
    cy.wait(1000);

    this.elements.confirmDeleteButton().click();
    cy.wait(6000);

    return cy.get("div[role='row'] > div:nth-child(3)").then(($cells) => {
      return Cypress._.map($cells, (cell) => cell.innerText.trim());
    });
  }

  // Test Case 14
  /**
   * Adds a new immigration record, selects it via checkbox, and deletes it.
   * Returns all passport numbers from the list after deletion.
   */
  checkboxDeleteFunction(PPn) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    this.elements.immigrationTab().click();
    cy.wait(2000);
    this.elements.addImmigrationButton().eq(0).click();
    cy.wait(1000);
    this.elements.passportNumberField().eq(1).clear().type(PPn);
    this.elements.saveButton().click();
    cy.wait(6000);

    cy.get(`.oxd-table-card:contains('${PPn}') i.oxd-icon.bi-check`).click({
      force: true,
    });

    cy.contains("button", "Delete Selected").click();
    cy.wait(1000);

    this.elements.confirmDeleteButton().click();
    cy.wait(6000);

    return cy.get("div[role='row'] > div:nth-child(3)").then(($cells) => {
      return Cypress._.map($cells, (cell) => cell.innerText.trim());
    });
  }

  // Test Case 15
  // Navigates to My Info > Qualification tab and returns the page URL
  qualificationTabb() {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    cy.contains("a.orangehrm-tabs-item", "Qualifications").click();
    cy.wait(2000);
    return cy.url();
  }
}

export default ProfilePage;
