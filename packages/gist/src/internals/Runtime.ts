import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { RuntimeCapability } from './RuntimeCapability';

interface RuntimeDomainsCapabilityHooks {
    // createDomain(): object;
}

class Runtime implements AsyncInstrumentationLike<Runtime, object> {
    public domains(): RuntimeDomainsCapabilityHooks {
        return {

        };
    }
}

export {
    Runtime,
};
