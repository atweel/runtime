import { ContainerModule } from 'inversify';

import '@atweel/runtime/lib/internals/Runtime';

import { Runtime, RuntimeLayer } from '@atweel/runtime';
import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { RuntimeContainersCapability } from '~/RuntimeContainersCapability';
import { RuntimeContainers } from '~/RuntimeContainers';

declare module '@atweel/runtime/lib/internals/Runtime' {
    interface Runtime extends AsyncInstrumentationLike<Runtime, object, any[], RuntimeLayer> {
        containers(layer: RuntimeLayer, ...modules: ContainerModule[]): RuntimeContainers;
    }
}

Runtime.prototype.containers = function (layer: RuntimeLayer, ...modules: ContainerModule[]): RuntimeContainers {
    const inheritedCapability = layer.capabilitites.containers;

    if (!!inheritedCapability && !(inheritedCapability instanceof RuntimeContainersCapability)) {
        throw new Error();
    }

    return inheritedCapability?.extend(modules) || RuntimeContainersCapability.from(modules);
};
