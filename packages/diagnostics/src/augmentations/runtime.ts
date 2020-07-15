import { DiagnosticsRuntimeHooks } from '~/internals/DiagnosticsRuntimeHooks';

import { Runtime } from '@atweel/runtime/lib/internals/Runtime';
import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { RuntimeLayer } from '@atweel/runtime/lib/internals/RuntimeLayer';

declare module '@atweel/runtime/lib/internals/Runtime' {
    interface Runtime extends AsyncInstrumentationLike<Runtime, object, any[], RuntimeLayer> {
        diagnostics(layer: RuntimeLayer): DiagnosticsRuntimeHooks;
    }
}

Runtime.prototype.diagnostics = function (): DiagnosticsRuntimeHooks {
    return {
        notify: console.log,
        warn: console.log,
        debug: console.log,
    };
};
