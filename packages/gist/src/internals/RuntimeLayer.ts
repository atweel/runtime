import { InstrumentationConfiguration, AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { Dictionary } from 'lodash';

interface RuntimeLayer{
    readonly capabilitites: Dictionary<object | undefined>;
    extend<I extends AsyncInstrumentationLike<I, object, any[]>>(instrumentation: I, configuration: InstrumentationConfiguration<I>): Promise<RuntimeLayer>;
    externalizeCapabilities(): object;
}

export {
    RuntimeLayer,
};
