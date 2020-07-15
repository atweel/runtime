import { Runtime } from '@atweel/runtime/lib/internals/Runtime';
import { RuntimeCapability } from '@atweel/runtime';

interface EventsRuntimeHooks {
    emit(): void;
}

declare module '@atweel/runtime/lib/internals/Runtime' {
    interface Runtime {
        events(): EventsRuntimeHooks;
    }
}

Runtime.prototype.events = function (): EventsRuntimeHooks {
    return {
        emit(): void {},
    };
};
