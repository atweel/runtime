import { InstrumentationConfiguration, AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';

interface RuntimeLayer{
    extend<I extends AsyncInstrumentationLike<I, object, any[]>>(instrumentation: I, configuration: InstrumentationConfiguration<I>): Promise<RuntimeLayer>;
    externalizeCapabilities(): object;
}

export {
    RuntimeLayer,
};
