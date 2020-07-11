import { Instrumentable } from '~/internals/Instrumentable';
import { InstrumenationSyntax } from '~/internals/InstrumenationSyntax';
import { InstrumentationFlow } from '~/internals/InstrumentationFlow';
import { InstrumentationLike } from '~/types';

export default <I extends InstrumentationLike<I>> (target: Instrumentable<I>, instrumentation: InstrumentationLike<I>): InstrumenationSyntax<I> => {
    return new InstrumentationFlow<I>(target, instrumentation);
};
