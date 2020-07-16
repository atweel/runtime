import { AsyncInstrumentationLike } from '@atweel/instrumentation';
import { LocalDomains } from './LocalDomains';
import { LocalDomainsCapability } from './LocalDomainsCapability';
import { RuntimeLayer } from './RuntimeLayer';

class Runtime implements AsyncInstrumentationLike<Runtime, object, any[], RuntimeLayer | null> {
    public domains(layer: RuntimeLayer | null): LocalDomains {
        return new LocalDomainsCapability();
    }
}

export {
    Runtime,
};
