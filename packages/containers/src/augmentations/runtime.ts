import { ContainerModule } from 'inversify';

import { Runtime } from '@atweel/runtime/lib/internals/Runtime';
import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { RuntimeLayer } from '@atweel/runtime/lib/internals/RuntimeLayer';

interface ContainersRuntimeHooks {
    get(): void;
}

declare module '@atweel/runtime/lib/internals/Runtime' {
    interface Runtime extends AsyncInstrumentationLike<Runtime, object, any[], RuntimeLayer> {
        containers(layer: RuntimeLayer, ...modules: ContainerModule[]): ContainersRuntimeHooks;
    }
}

Runtime.prototype.containers = function (layer: RuntimeLayer, ...modules: ContainerModule[]): ContainersRuntimeHooks {
    return {
        get() {},
    };
};
