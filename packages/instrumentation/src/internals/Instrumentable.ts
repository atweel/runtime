import { InstrumentationHook } from '~/constants';
import { InstrumentationHookHandler } from '~/types';
import { InstrumentationLike } from '~/types';

type Instrumentable<I extends InstrumentationLike<I>> = {
    [InstrumentationHook]: InstrumentationHookHandler<I>;
}

export {
    Instrumentable,
};
