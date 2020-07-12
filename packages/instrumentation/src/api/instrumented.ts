import { Instrumentable } from '~/internals/Instrumentable';
import { InstrumentationSyntax } from '~/internals/InstrumentationSyntax';
import { InstrumentationFlow } from '~/internals/InstrumentationFlow';
import { InstrumentationLike, InstrumentationConstructor, AsyncInstrumentationConstructor, AsyncInstrumentationLike } from '~/types';
import { AsyncInstrumentable } from '~/internals/AsyncInstrumentable';
import { AsyncInstrumentationSyntax } from '~/internals/AsyncInstrumentationSyntax';
import { InstrumentationHook } from '~/types';
import { AsyncInstrumentationFlow } from '~/internals/AsyncInstrumentationFlow';
import { Annotations, Callable, CallableExecutionMode } from '@atweel/primitives';

function isInstrumentable(instance: any): instance is Instrumentable<any> {
    return instance?.[InstrumentationHook]?.[Annotations]?.[Callable.ExecutionMode] === CallableExecutionMode.Synchronous;
}

function isAsyncInstrumentable(instance: any): instance is Instrumentable<any> {
    return instance?.[InstrumentationHook]?.[Annotations]?.[Callable.ExecutionMode] === CallableExecutionMode.Asynchronous;
}

function instrumented<I extends InstrumentationLike<I>> (target: Instrumentable<I>, instrumentationConstructor: InstrumentationConstructor<I>): InstrumentationSyntax<I>;
function instrumented<I extends AsyncInstrumentationLike<I>> (target: AsyncInstrumentable<I>, instrumentationConstructor: AsyncInstrumentationConstructor<I>): AsyncInstrumentationSyntax<I>;
function instrumented(target: Instrumentable<any> | AsyncInstrumentable<any>, instrumentationConstructor: any): any {
    if (isInstrumentable(target)) {
        return new InstrumentationFlow<any>(target, new instrumentationConstructor());
    } else {
        if (isAsyncInstrumentable(target)) {
            return new AsyncInstrumentationFlow<any>(target, new instrumentationConstructor());
        } else {
            throw new Error();
        }
    }
}

export default instrumented;
