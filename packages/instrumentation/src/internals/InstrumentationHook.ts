/* eslint-disable no-inner-declarations */
import { InstrumentationHookHandler, SyncInstrumentationHook, InstrumentationLike } from '~/types';
import { mark, annotate, CallableExecutionMode, Callable } from '@atweel/primitives';

namespace InstrumentationHook {
    export function from<I extends InstrumentationLike<I>>(handler: InstrumentationHookHandler<I>): SyncInstrumentationHook {
        return mark(annotate(handler, {
            [Callable.ExecutionMode]: CallableExecutionMode.Synchronous,
        }), 'SyncInstrumentationHook');
    }
}

export {
    InstrumentationHook,
};
