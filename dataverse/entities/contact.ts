import { randomizeName, getTimestamp } from '../../tests/data/test-data.js';
import { Entity, TableName} from './Entity.js';

/***
 * Structure of the Contact entity in dataverse
 * Only Lastname and a generated contact ID are guaranteed to exist for a contact record
 */
export interface ContactEntity extends Entity {
    contactid: string;
    lastname: string;
    firstname?: string;
    emailaddress1?: string;
    telephone1?: string;
    mps_medicalordental?: string;
}

/***
 * The ContactRecord matches the structure of the contact table in dataverse.
 * Each member variable must match the name of a column in the table.
 */
export class Contact implements ContactEntity {

    name: TableName = 'contacts';
    contactid: string;
    firstname: string;
    lastname: string;
    emailaddress1: string;
    telephone1: string;
    mps_medicalordental: "Medical" | "Dental"

    protected setContactId(id: string) {
        this.contactid = id;
    }

    protected setFirstName(name: string) {
        this.firstname = name;
        return this;
    }

    protected setLastName(name: string) {
        this.lastname = name;
        return this;
    }

    protected setEmail(email: string) {
        this.emailaddress1 = email;
        return this;
    }

    protected setTelephone(number: string) {
        this.telephone1 = number;
        return this;
    }

    protected setMedicalOrDental(option: "Medical" | "Dental") {
        this.mps_medicalordental = option;
    }

    public getFirstName(): string {
        return this.firstname;
    }

    public getLastName(): string {
        return this.lastname;
    }

    public getMedicalOrDental(): "Medical" | "Dental" {
        return this.mps_medicalordental;
    }

    public getEmail(): string {
        return this.emailaddress1;
    }

    public getTelephone(): string {
        return this.telephone1;
    }

    static Builder = class {
        private contact: Contact = new Contact();

        public setFirstName(name: string): this {
            this.contact.setFirstName(name);
            return this;
        }

        public setLastName(name: string): this {
            this.contact.setLastName(name);
            return this;
        }

        public setMedicalOrDental(option: "Medical" | "Dental"): this {
            this.contact.setMedicalOrDental(option);
            return this;
        }

        public setEmail(email: string): this {
            this.contact.setEmail(email);
            return this;
        }

        public setTelephone(number: string): this {
            this.contact.setTelephone(number);
            return this;
        }

        public setGenericContact(): this {
            const firstname = randomizeName('firstname');
            const lastname = randomizeName('lastname') + getTimestamp();

            this.contact.setFirstName(firstname);
            this.contact.setLastName(lastname);
            this.contact.setMedicalOrDental(Math.random() < 0.5 ? 'Medical' : 'Dental');
            this.contact.setEmail(firstname + lastname + "@example.com");
            this.contact.setTelephone(Math.floor(Date.now() / 1000).toString());
            return this;
        }

        public build(): Contact {
            return this.contact;
        }
    }
}

