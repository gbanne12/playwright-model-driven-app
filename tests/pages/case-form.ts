
import {expect, Locator, Page} from '@playwright/test';
import { Case } from '../../dataverse/entities/case.js';
import { environment } from '../../environment.config.js';

export class CaseForm {

    private page: Page;
    private readonly citationField: Locator;
    private readonly originOfContactInput: Locator;
    private readonly caseTypeInput: Locator;
    private readonly originalContactInput: Locator;
    private readonly medicalOrDental: Locator;
    private readonly emailInput: Locator;
    private  readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.citationField = page.getByLabel('Case Citation');
        this.originOfContactInput = page.getByRole('combobox', { name: 'Origin of Contact' });
        this.caseTypeInput = page.getByRole('combobox', { name: 'Primary Case Type, Lookup' });
        this.originalContactInput = page.getByRole('combobox', { name: 'Original Contact, Lookup' });
        this.medicalOrDental = page.getByLabel('Medical or Dental');
        this.emailInput = page.getByLabel('Email Address');
        this.saveButton = page.getByRole('menuitem', { name: 'Save (CTRL+S)' })
    }

    public async add(newCase: Case) {
        await this.page.goto(environment.appUrl + '&forceUCI=1&pagetype=entityrecord&etn=incident');
        await expect(this.citationField).toBeFocused({timeout: 20000});

        await this.enterCitation(newCase.getCitation());
        await this.enterOriginOfContact(newCase.getOriginOfContact());
        await this.enterCase(newCase.getCaseType());
        await this.enterOriginalContact(newCase.getOriginalContact());
        await this.enterMedicalOrDental(newCase.getMedicalDental());
        await this.enterEmail(newCase.getEmail());
        await this.saveButton.click();
    }

    public async enterCitation(citation: string){
        await this.citationField.click();
        await this.citationField.fill(citation);
    }

    public async enterOriginOfContact(selectionLabel: string)  {
        await this.originOfContactInput.selectOption({ label: selectionLabel });
    }

    public async enterCase(caseType: string) {
        await this.lookup(this.caseTypeInput, caseType);
    }

    public async enterOriginalContact(contact: string) {
        await this.lookup(this.originalContactInput, contact);
    }

    public async enterEmail(email: string) {
        await this.emailInput.click();
        await this.emailInput.fill(email);
    }

    public async enterMedicalOrDental(medicalOrDental: string)  {
        await this.medicalOrDental.selectOption({ label: medicalOrDental });
    }

    private async lookup(input: Locator, text: string) {
        await input.click();
        await input.fill(text);

        const resultItem = this.page.getByRole('treeitem', {name: text});
        await resultItem.scrollIntoViewIfNeeded();
        await resultItem.waitFor({ state: 'visible' });

        await resultItem.click();
    }

}