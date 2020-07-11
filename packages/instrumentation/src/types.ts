import { Instrumentable } from '~/internals/Instrumentable';

export type InstrumentationLike<I> = {
    [K in keyof I]: I[K] extends (...parameters: any[]) => object ? I[K] : never;
}
export type InstrumentationHookHandler<I extends InstrumentationLike<I>> = (instrumentation: I, configuration: InstrumentationConfiguration<I>) => object;
export type InstrumentationConfiguration<I extends InstrumentationLike<I>> = Partial<Record<keyof I, any[]>>;
export type InstrumetntationOf<T> = T extends Instrumentable<infer I> ? I : never;
