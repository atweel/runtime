import { InstrumenationSyntax } from './InstrumenationSyntax';
import { InstrumentationBuilder } from './InstrumentationBuilder';
import { Instrumentable } from '~/internals/Instrumentable';
import { InstrumentationLike } from '~/types';

class InstrumentationFlow<T extends InstrumentationLike<T>> implements InstrumenationSyntax<object, any> {
    public constructor(target: Instrumentable<T>, instrumentation: InstrumentationLike<T>) {
        this.builder = new InstrumentationBuilder(target, instrumentation);
    }

    public with(instrumentation: Exclude<keyof Instrumentable<T>, symbol>, ...parameters: any[]): InstrumentationFlow<T> {
        this.builder.addInstrument(instrumentation, parameters);

        return this;
    }
    
    public complete(): any {
        return this.builder.build();
    }

    private readonly builder: InstrumentationBuilder<T>;
}

export {
    InstrumentationFlow,
};
