import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { Runtime } from './exports';
import { RuntimeCapability } from './internals/RuntimeCapability';
import { RuntimeLayer } from './internals/RuntimeLayer';

export type RuntimeInstrumentationLike<I> = AsyncInstrumentationLike<I, RuntimeCapability, any[]>;
