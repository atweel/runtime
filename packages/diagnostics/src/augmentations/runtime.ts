import { DiagnosticsRuntimeHooks } from '~/internals/DiagnosticsRuntimeHooks';

import { Runtime } from '@atweel/runtime/lib/internals/Runtime';

declare module '@atweel/runtime/lib/internals/Runtime' {
    interface Runtime {
        diagnostics(): DiagnosticsRuntimeHooks;
    }
}

Runtime.prototype.diagnostics = function (): DiagnosticsRuntimeHooks {
    return {
        notify: console.log,
        warn: console.log,
        debug: console.log,
    };
};
