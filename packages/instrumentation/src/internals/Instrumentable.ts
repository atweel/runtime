import { InstrumentationHook } from '~/types';
import { InstrumentationLike, SyncInstrumentationHook } from '~/types';

type Instrumentable<I extends InstrumentationLike<I>> = {
    [InstrumentationHook]: SyncInstrumentationHook<I>;
}

export {
    Instrumentable,
};
