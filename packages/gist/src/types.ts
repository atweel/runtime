import { AsyncInstrumentationLike } from '@atweel/instrumentation';

export type RuntimeInstrumentationLike<I> = AsyncInstrumentationLike<I, object, any[]>;
