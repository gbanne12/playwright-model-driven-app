import { Case } from '../../dataverse/entities/case.js';
import {Page, expect, test} from '@playwright/test';
import { Contact } from '../../dataverse/entities/contact.js';
import { DataverseRequest } from '../../dataverse/requests/dataverse-request.js';
import { CaseForm } from '../pages/case-form.js';
import { ContactForm } from '../pages/contact-form.js';

test('Can setup a contact and case test', async ({ page }) => {
    const contact = new Contact.Builder().setGenericContact().build();
    const contactForm = new ContactForm(page);
    await contactForm.add(contact);

    const newCase = new Case.Builder()
        .setMinimalCase('Claim', contact)
        .build();
    const caseForm = new CaseForm(page);
    await caseForm.add(newCase);

    const allContacts = await getDataverseContacts(page);
    expect(allContacts).toContainRecord(contact);
});


async function getDataverseContacts(context: Page) : Promise<Contact[]> {
    await sleep(5000);  //let the record enter the db
    const response = await new DataverseRequest().get('contacts', context);
    if ('error' in response) {
        throw new Error('Failed to retrieve contacts from Database. Cannot verify test result: ' + response.error);
    }
    return response.jsonArray as Contact[];
}

async function sleep(millis: number) {
    return new Promise(resolve => {
        setTimeout(resolve, millis);
    });
}


