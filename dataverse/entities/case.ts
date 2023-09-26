import { getTimestamp } from "../../tests/data/test-data.js";
import { Entity, TableName } from "./Entity.js";
import { Contact } from "./contact.js";

export interface CaseEntity extends Entity {
    title: string;
}

export class Case implements CaseEntity {

    name: TableName =  'incidents';
    mps_leadmember: string;
    title: string;
    // below dont map to entity columns
    originOfContact: string;
    caseType: string;
    originalContact: string;
    email: string;
    medicalDental: string;

    public getCitation(): string {
        return this.title;
    }

    public getOriginOfContact(): string {
        return this.originOfContact;
    }

    public getCaseType(): string {
        return this.caseType;
    }

    public getOriginalContact(): string {
        return this.originalContact;
    }

    public getEmail(): string {
        return this.email;
    }

    public getMedicalDental(): string { 
        return this.medicalDental;
    }

    static Builder = class {
        private case = new Case();

        public setCitation(citation: string): this {
            this.case.title = citation;
            return this;
        }

        public setOriginOfContact(value: string): this {
            this.case.originOfContact = value;
            return this;
        }

        public setLeadMember(name: string): this {
            this.case.mps_leadmember = name
            return this;
        }

        public setCaseType(type: string): this {
            this.case.caseType = type;
            return this;
        }

        public setOriginalContact(name: string): this {
            this.case.originalContact = name;
            return this
        }

        public setEmail(address: string): this {
            this.case.email = address;
            return this;
        }

        public setMedicalOrDental(value: 'Medical' | 'Dental'): this {
            this.case.medicalDental = value;
            return this;
        }

        public setMinimalCase(caseType: 'TCR' | 'Advice' | 'Non-Claim' | 'Claim' | 'Contribution Claim' | 'Report' | 'Claims Enquiry', contact: Contact ): this {
            const label = caseType + '_Case' + getTimestamp();
            this.setCaseType(caseType);
            this.setCitation(label);
            this.setEmail(label+ "@gmail.com");
            this.setMedicalOrDental(contact.getMedicalOrDental());
            this.setOriginalContact(contact.getFirstName() + ' ' + contact.getLastName());
            this.setEmail(contact.getEmail());
            this.setOriginOfContact('Member');
            return this;
        }

        public build(): Case {
            return this.case;
        }

    }
}