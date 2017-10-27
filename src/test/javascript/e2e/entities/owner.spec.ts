import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Owner e2e test', () => {

    let navBarPage: NavBarPage;
    let ownerDialogPage: OwnerDialogPage;
    let ownerComponentsPage: OwnerComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Owners', () => {
        navBarPage.goToEntity('owner');
        ownerComponentsPage = new OwnerComponentsPage();
        expect(ownerComponentsPage.getTitle()).toMatch(/gatewayApp.owner.home.title/);

    });

    it('should load create Owner dialog', () => {
        ownerComponentsPage.clickOnCreateButton();
        ownerDialogPage = new OwnerDialogPage();
        expect(ownerDialogPage.getModalTitle()).toMatch(/gatewayApp.owner.home.createOrEditLabel/);
        ownerDialogPage.close();
    });

    it('should create and save Owners', () => {
        ownerComponentsPage.clickOnCreateButton();
        ownerDialogPage.setLoginInput('login');
        expect(ownerDialogPage.getLoginInput()).toMatch('login');
        ownerDialogPage.setFirstNameInput('firstName');
        expect(ownerDialogPage.getFirstNameInput()).toMatch('firstName');
        ownerDialogPage.setLastNameInput('lastName');
        expect(ownerDialogPage.getLastNameInput()).toMatch('lastName');
        ownerDialogPage.setEmailInput('email');
        expect(ownerDialogPage.getEmailInput()).toMatch('email');
        ownerDialogPage.save();
        expect(ownerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OwnerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-owner div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OwnerDialogPage {
    modalTitle = element(by.css('h4#myOwnerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    loginInput = element(by.css('input#field_login'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLoginInput = function (login) {
        this.loginInput.sendKeys(login);
    }

    getLoginInput = function () {
        return this.loginInput.getAttribute('value');
    }

    setFirstNameInput = function (firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function () {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function (lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function () {
        return this.lastNameInput.getAttribute('value');
    }

    setEmailInput = function (email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function () {
        return this.emailInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
