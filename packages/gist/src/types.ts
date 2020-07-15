import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';

export type RuntimeInstrumentationLike<I> = AsyncInstrumentationLike<I, object, any[]>;
