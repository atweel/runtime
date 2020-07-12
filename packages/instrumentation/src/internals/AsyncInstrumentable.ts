import { InstrumentationHook } from '~/types';
import { AsyncInstrumentationLike, AsyncInstrumentationHook } from '~/types';

type AsyncInstrumentable<I extends AsyncInstrumentationLike<I>> = {
    [InstrumentationHook]: AsyncInstrumentationHook<I>;
}

export {
    AsyncInstrumentable,
};
