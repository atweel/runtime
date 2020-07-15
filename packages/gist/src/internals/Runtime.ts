import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { LocalDomains } from './LocalDomains';
import { LocalDomainsCapability } from './LocalDomainsCapability';
import { RuntimeLayer } from './RuntimeLayer';

class Runtime implements AsyncInstrumentationLike<Runtime, object, any[], RuntimeLayer> {
    public constructor(
        private readonly baseLayer: RuntimeLayer | null,
    ) {

    }

    public domains(): LocalDomains {
        return new LocalDomainsCapability();
    }
}

export {
    Runtime,
};
