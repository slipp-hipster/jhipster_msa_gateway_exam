import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Contents e2e test', () => {

    let navBarPage: NavBarPage;
    let contentsDialogPage: ContentsDialogPage;
    let contentsComponentsPage: ContentsComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contents', () => {
        navBarPage.goToEntity('contents');
        contentsComponentsPage = new ContentsComponentsPage();
        expect(contentsComponentsPage.getTitle()).toMatch(/gatewayApp.contents.home.title/);

    });

    it('should load create Contents dialog', () => {
        contentsComponentsPage.clickOnCreateButton();
        contentsDialogPage = new ContentsDialogPage();
        expect(contentsDialogPage.getModalTitle()).toMatch(/gatewayApp.contents.home.createOrEditLabel/);
        contentsDialogPage.close();
    });

    it('should create and save Contents', () => {
        contentsComponentsPage.clickOnCreateButton();
        contentsDialogPage.setTitleInput('title');
        expect(contentsDialogPage.getTitleInput()).toMatch('title');
        contentsDialogPage.setDescInput('desc');
        expect(contentsDialogPage.getDescInput()).toMatch('desc');
        contentsDialogPage.ownerSelectLastOption();
        contentsDialogPage.save();
        expect(contentsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContentsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contents div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContentsDialogPage {
    modalTitle = element(by.css('h4#myContentsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    descInput = element(by.css('input#field_desc'));
    ownerSelect = element(by.css('select#field_owner'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function (title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function () {
        return this.titleInput.getAttribute('value');
    }

    setDescInput = function (desc) {
        this.descInput.sendKeys(desc);
    }

    getDescInput = function () {
        return this.descInput.getAttribute('value');
    }

    ownerSelectLastOption = function () {
        this.ownerSelect.all(by.tagName('option')).last().click();
    }

    ownerSelectOption = function (option) {
        this.ownerSelect.sendKeys(option);
    }

    getOwnerSelect = function () {
        return this.ownerSelect;
    }

    getOwnerSelectedOption = function () {
        return this.ownerSelect.element(by.css('option:checked')).getText();
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
