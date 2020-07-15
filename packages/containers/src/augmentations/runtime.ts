import { ContainerModule } from 'inversify';

import { Runtime } from '@atweel/runtime/lib/internals/Runtime';

interface ContainersRuntimeHooks {
    get(): void;
}

declare module '@atweel/runtime/lib/internals/Runtime' {
    interface Runtime {
        containers(...modules: ContainerModule[]): ContainersRuntimeHooks;
    }
}

Runtime.prototype.containers = function (...modules: ContainerModule[]): ContainersRuntimeHooks {
    return {
        get() {},
    };
};
