import { LocalDomains } from './LocalDomains';

class LocalDomainsCapability implements LocalDomains {
    public createLocalInternalDomain(name: string): object {
        throw new Error('Method not implemented.');
    }

    public createLocalExternalDomain(name: string): object {
        throw new Error('Method not implemented.');
    }
}

export {
    LocalDomainsCapability,
};
