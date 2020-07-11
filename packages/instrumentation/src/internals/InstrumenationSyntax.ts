import { InstrumentationLike } from '~/types';

type InstrumenationParametersOf<I extends InstrumentationLike<I>, K extends keyof I> = 
    I[K] extends (...parameters: infer P) => any ? P : never;

type InstrumenationResultOf<I extends InstrumentationLike<I>, K extends keyof I> = 
    I[K] extends (...parameters: any[]) => infer R ? R : never;

interface InstrumenationSyntax<I extends InstrumentationLike<I>, R extends object = {}> {
    with<K extends Exclude<keyof I, symbol>>(instrumentation: K, ...parameters: InstrumenationParametersOf<I, K>): InstrumenationSyntax<I, R & InstrumenationResultOf<I, K>>;
    complete(): R;
}

export {
    InstrumenationParametersOf,
    InstrumenationResultOf,
    InstrumenationSyntax,
};
