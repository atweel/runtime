import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { LocalDomains } from './LocalDomains';
import { LocalDomainsCapability } from './LocalDomainsCapability';

class Runtime implements AsyncInstrumentationLike<Runtime, object> {
    public domains(): LocalDomains {
        return new LocalDomainsCapability();
    }
}

export {
    Runtime,
};
