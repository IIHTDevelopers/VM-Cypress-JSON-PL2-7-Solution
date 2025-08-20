import LoginPage from "../PageObjects/Pages/LoginProfilePage";
import ProfilePage from "../PageObjects/Pages/ProfilePage";

describe("Automation Suite for Yaksha Application", () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();

  beforeEach(() => {
    // Visit the Login Page before each test
    loginPage.performLogin();
  });

  /**
   * Test Case 1: Verify My Info tab Loads
   *
   * Steps:
   * 1. Login with valid credentials
   * 2. Click on the "My Info" tab
   *
   * Expected:
   * The My Info tab should be visible and accessible
   */

  it('Test Case-1: Verify the "My Info" tab Loads Successfully ', () => {
    cy.wrap(null)
      .then(() => {
        profilePage.myInfoTabAppear();
      })
      .then(() => {
        verifyMyInfoTabAppear();
      });
  });

  /**
   * Test Case 2: Verify required field error on blank name
   *
   * Steps:
   * 1. Navigate to "My Info"
   * 2. Clear the name input
   * 3. Check for validation
   *
   * Expected:
   * Required field error should be displayed for empty name
   */

  it('Test Case-2: Verify the "Required" field error Message is displayed on leaving name field blank', () => {
    cy.wrap(null)
      .then(() => {
        profilePage.checkRequiredFieldError();
      })
      .then(() => {
        verifyRequiredFieldError();
      });
  });

  /**
   * Test Case 3: Verify name gets edited
   *
   * Purpose:
   * Ensures that a user can successfully update their name in the personal details section.
   *
   * Steps:
   * 1. Generate a unique name dynamically.
   * 2. Navigate to the "My Info" tab.
   * 3. Clear the existing name field and enter the new name.
   * 4. Save the changes and reload the page.
   * 5. Retrieve the displayed profile name from the header.
   *
   * Expected:
   * The updated profile name should be visible in the top-right dropdown and match the new name.
   */

  it("Test Case-3: Verify the name gets edited successfully", () => {
    const uniqueName = "gpa_&" + Date.now();
    cy.wrap(null)
      .then(() => {
        profilePage.editProfileName(uniqueName);
      })
      .then(() => {
        verifyEditProfileName(uniqueName);
      });
  });

  /**
   * Test Case 4: Verify all My Info sub-tabs have unique hrefs
   *
   * Purpose:
   * Ensure that each sub-tab under the "My Info" section has a unique navigation URL,
   * preventing routing conflicts and confirming correct tab linkage.
   *
   * Steps:
   * 1. Navigate to the "My Info" tab.
   * 2. Locate the sub-tabs (e.g., Personal Details, Contact Details, Emergency Contacts).
   * 3. Extract the `href` attributes from each sub-tab element.
   * 4. Assert that the extracted list is not empty.
   * 5. Check that each `href` is unique.
   *
   * Expected:
   * All extracted sub-tab `href`s must be unique and valid.
   */

  it('Test Case-4: Verify the "My Info" tabs subtabs have unique URL', () => {
    cy.wrap(null)
      .then(() => {
        profilePage.checkPersonalTab();
      })
      .then(() => {
        verifyPersonalTab();
      })
      .then(() => {
        profilePage.checkContactTab();
      })
      .then(() => {
        verifyContactTab();
      })
      .then(() => {
        profilePage.checkEmergencyTab();
      })
      .then(() => {
        verifyEmergencyTab();
      });
  });

  /**
   * Test Case 5: Add a new dependent
   *
   * Purpose:
   * Verify that a user can add a new dependent under the "Dependents" section of the My Info tab.
   *
   * Steps:
   * 1. Generate a unique dependent name using a timestamp.
   * 2. Navigate to the "My Info" > "Dependents" section.
   * 3. Click the "Add" button to initiate the add flow.
   * 4. Enter the dependent name and select the relationship from the dropdown.
   * 5. If "Other" is selected, specify the relationship manually.
   * 6. Click the "Save" button to submit.
   * 7. Assert that the newly added dependent appears in the list.
   *
   * Expected:
   * The newly added dependent name should be visible in the dependents table.
   */
  it("Test Case-5: Verify new Dependant could be added to the list", () => {
    const uniqueName = "Name_&" + Date.now();

    cy.wrap(null)
      .then(() => {
        profilePage.assignDependentRecord(uniqueName);
      })
      .then(() => {
        verifyDependentRecordAdded(uniqueName);
      });
  });

  /**
   * Test Case 6: Show 'Specify' field only when 'Other' is selected
   *
   * Purpose:
   * Ensure the "Specify" input field becomes visible only when the "Other" option is selected from the relationship dropdown.
   *
   * Steps:
   * 1. Navigate to the "My Info" > "Dependents" section.
   * 2. Click the "Add" button to add a new dependent.
   * 3. Open the relationship dropdown and select the "Other" option.
   * 4. Check whether the "Specify" input field is displayed.
   *
   * Expected:
   * The "Specify" field should be visible only after selecting the "Other" option.
   */
  it("Test Case-6: Verify new Dependant Specify inputbar only displays when Other option is selected from the relationship dropdown", () => {
    cy.wrap(null)
      .then(() => {
        profilePage.checkRelationOtherInputBar();
      })
      .then(() => {
        verifyOtherRelationInput();
      });
  });

  /**
   * Test Case: TS-7 Verify adding a membership from the list
   *
   * Objective:
   * Confirm that a new membership can be added in My Info > Membership tab
   * and that the entered amount appears in the list.
   *
   * Steps:
   * 1. Generate a unique amount.
   * 2. Add membership with the amount.
   * 3. Verify the list contains the new amount.
   */
  it("Test Case-7: Verify that a membership can be added from the list", () => {
    const amount = Math.floor(100000 + Math.random() * 900000).toString();
    cy.wrap(null)
      .then(() => {
        return profilePage.addMembership(amount);
      })
      .then((list) => {
        verifyMembershipAdded(list, amount);
      });
  });

  /**
   * Test Case: TS-8 Verify that a membership can be deleted from the list
   *
   * Objective:
   * Confirm that an existing membership can be removed from My Info > Membership tab
   * and that it no longer appears in the list.
   *
   * Steps:
   * 1. Add a membership with a unique amount.
   * 2. Delete the added membership.
   * 3. Verify the list is not empty and does not contain the deleted amount.
   */
  it("Test Case-8: Verify that a membership can be deleted from the list", () => {
    const amount = Math.floor(100000 + Math.random() * 900000).toString();
    cy.wrap(null)
      .then(() => {
        return profilePage.deleteMembership(amount);
      })
      .then((list) => {
        verifyMembershipDeleted(list, amount);
      });
  });

  /**
   * Test Case: TS-9 Verify that a membership can be edited from the list
   *
   * Objective:
   * Confirm that an existing membership can be updated in My Info > Membership tab
   * and that the updated amount appears in the list.
   *
   * Steps:
   * 1. Open the membership list.
   * 2. Edit the first membership entry.
   * 3. Enter a new amount and save.
   * 4. Verify that the updated amount is displayed.
   */
  it("Test Case-9: Verify that a membership can be edited from the list", () => {
    const newAmount = Math.floor(100000 + Math.random() * 900000).toString();
    cy.wrap(null)
      .then(() => {
        return profilePage.editMembership(newAmount);
      })
      .then((editList) => {
        verifyMembershipEdited(editList, newAmount);
      });
  });

  /**
   * Test Case 10: Verify that an attachment can be uploaded in the Memberships subtab
   *
   * Steps:
   * 1. Generate a unique comment
   * 2. Add membership attachment with the comment
   * 3. Assert that the comment list contains the new comment
   *
   * Expected:
   * The comment list should include the newly added comment
   */
  it("Test Case-10: Verify that an attachment can be uploaded in the Memberships subtab", () => {
    const fileName = "sample_upload.pdf";
    const cmnt = generateUniqueComment();
    cy.wrap(null)
      .then(() => {
        return profilePage.addmembershipAttach(cmnt, fileName);
      })
      .then((cmntlist) => {
        verifyMembershipAttachment(cmntlist, cmnt);
      });
  });

  /**
   * Test Case 11: Verify the Immigrant assign immigration record Add Functionality
   *
   * Steps:
   * 1. Generate a unique immigration number
   * 2. Add immigration record using the number
   * 3. Assert that the returned file name/list contains the number
   *
   * Expected:
   * The immigration record should be added and the number should be present in the result
   */
  it("Test Case-11: Verify the Immigrant assign immigration record Add Functionality", () => {
    const number = `PPN_${Date.now()}`;
    cy.wrap(null)
      .then(() => {
        return profilePage.addImegration(number);
      })
      .then((fileName) => {
        verifyImmigrationRecordAdded(fileName, number);
      });
  });

  /**
   * Test Case 12: Verify the Immigrant assign immigration record Edit Functionality
   *
   * Steps:
   * 1. Generate a unique immigration number
   * 2. Edit immigration record using the number
   * 3. Assert that the returned output contains the number
   *
   * Expected:
   * The immigration record should be edited and the number should be present in the result
   */
  it("Test Case-12: Verify the Immigrant assign immigration record Edit Functionality", () => {
    const number = `UPPN_${Date.now()}`;
    cy.wrap(null)
      .then(() => {
        return profilePage.editImmigration(number);
      })
      .then((output) => {
        verifyImmigrationRecordEdited(output, number);
      });
  });

  /**
   * Test Case 13: Verify the Immigrant assign immigration record Delete Functionality
   *
   * Steps:
   * 1. Generate a unique immigration number
   * 2. Delete immigration record using the number
   * 3. Assert that the returned list is not empty and does not contain the number
   *
   * Expected:
   * The immigration record should be deleted and the number should not be present in the result
   */
  it("Test Case-13: Verify the Immigrant assign immigration record Delete Functionality", () => {
    const number = `PPN_${Date.now()}`;
    cy.wrap(null)
      .then(() => {
        return profilePage.deleteImmigration(number);
      })
      .then((msg) => {
        verifyImmigrationRecordDeleted(msg, number);
      });
  });

  /**
   * Test Case 14: Verify the Immigrant assign immigration record Delete selected Functionality
   *
   * Steps:
   * 1. Generate a unique immigration number
   * 2. Delete selected immigration record using the number (checkbox)
   * 3. Assert that the returned list is not empty and does not contain the number
   *
   * Expected:
   * The selected immigration record should be deleted and the number should not be present in the result
   */
  it("Test Case-14: Verify the Immigrant assign immigration record Delete selected Functionality", () => {
    const number = `PPN_${Date.now()}`;
    cy.wrap(null)
      .then(() => {
        return profilePage.checkboxDeleteFunction(number);
      })
      .then((msg) => {
        verifyImmigrationRecordDeleteSelected(msg, number);
      });
  });

  /**
   * Test Case 15: Verify the My Info's Qualification tab Loads Successfully
   *
   * Steps:
   * 1. Navigate to My Info > Qualification tab
   * 2. Verify that the correct page URL is loaded
   *
   * Expected:
   * The Qualification tab should load and display the correct URL
   */
  it("Test Case-15: Verify the My Info's Qualification tab Loads Successfully", () => {
    cy.wrap(null)
      .then(() => {
        return profilePage.qualificationTabb();
      })
      .then((url) => {
        verifyQualificationTabUrl(url);
      });
  });
});
// ---------------------- Helper Functions ----------------------

// Helper function moved outside the describe block

// Test Case 1: Verify the 'My Info' tab Loads Successfully
function verifyMyInfoTabAppear() {
  cy.url().should("include", "pim/viewPersonalDetails/empNumber/");
  cy.contains("Personal Details").should("be.visible");
}

// Test Case 2: Verify the "Required" field error Message is displayed on leaving name field blank
function verifyRequiredFieldError(comment) {
  cy.get(
    "span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message"
  )
    .contains("Required")
    .should("be.visible");
}

// Test Case 3: Verify the name gets edited successfully
function verifyEditProfileName(uniqueName) {
  cy.get(".oxd-toast")
    .should("be.visible")
    .and("contain", "Successfully Updated");
  cy.reload();
  cy.get("p.oxd-userdropdown-name").contains(uniqueName).should("be.visible");
}

// Test Case 4: Verify the "My Info" tabs subtabs have unique URL
function verifyPersonalTab() {
  cy.wait(2000);
  cy.url().should("include", "pim/viewPersonalDetails/empNumber/");
}
function verifyContactTab() {
  cy.wait(2000);
  cy.url().should("include", "pim/contactDetails/empNumber/");
}
function verifyEmergencyTab() {
  cy.wait(2000);
  cy.url().should("include", "pim/viewEmergencyContacts/empNumber/");
}

// Test Case 5: Verify new Dependant could be added to the list
function verifyDependentRecordAdded(uniqueName) {
  cy.get(".oxd-toast")
    .should("be.visible")
    .and("contain", "Successfully Saved");
  cy.contains(uniqueName).should("be.visible");
}

// Test Case 6 : Verify new Dependant Specify inputbar only displays when Other option is selected from the relationship dropdown
function verifyOtherRelationInput() {
  cy.contains("Please Specify").should("be.visible");
}

// Test Case 7: Verify that a membership can be added from the list
function verifyMembershipAdded(list, amount) {
  expect(list).to.include(`${amount}.00`);
}

// Test Case 8: Verify that a membership can be deleted from the list
function verifyMembershipDeleted(list, amount) {
  expect(list.length).to.be.greaterThan(0);
  expect(list).to.not.include(`${amount}.00`);
}

// Test Case 9: Verify that a membership can be edited from the list
function verifyMembershipEdited(list, newAmount) {
  expect(list).to.include(`${newAmount}.00`);
}

// Helper to generate a unique comment
function generateUniqueComment() {
  return "Comment_" + Date.now();
}

// Test Case-10: Verify that an attachment can be uploaded in the Memberships subtab
function verifyMembershipAttachment(cmntlist, cmnt) {
  expect(cmntlist).to.include(cmnt);
}

// Test Case 11: Verify the Immigrant assign immigration record Add Functionality
function verifyImmigrationRecordAdded(fileName, number) {
  expect(fileName).to.include(number);
}

// Test Case 12: Verify the Immigrant assign immigration record Edit Functionality
function verifyImmigrationRecordEdited(output, number) {
  expect(output).to.include(number);
}

// Test Case 13: Verify the Immigrant assign immigration record Delete Functionality
function verifyImmigrationRecordDeleted(msg, number) {
  expect(msg.length).to.be.greaterThan(0);
  expect(msg).to.not.include(number);
}

// Test Case 14: Verify the Immigrant assign immigration record Delete selected Functionality
function verifyImmigrationRecordDeleteSelected(msg, number) {
  expect(msg.length).to.be.greaterThan(0);
  expect(msg).to.not.include(number);
}

// Test Case 15: Verify the My Info's Qualification tab Loads Successfully
function verifyQualificationTabUrl(url) {
  expect(url).to.include("/web/index.php/pim/viewQualifications/empNumber/");
}
// ---------------------- End of Helper Functions ----------------------
