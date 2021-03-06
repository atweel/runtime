// import createDebug from 'debug';
import { last } from 'lodash';

import { AsyncInstrumentable, InstrumentationHook, AsyncInstrumentationHook } from '@atweel/instrumentation';
import { RuntimeLayer } from './RuntimeLayer';
import { RuntimeLayerImplement } from './RuntimeLayerImplement';
import { Runtime } from '~/internals/Runtime';

// const debug = createDebug('runtime');

type RuntimeContext<T> = {
    [K in keyof T]: T[K];
};

export interface BuiltInCapabilitiesRuntimeContextHooks {
    createDomain(): void;
}

class RuntimeKernel implements AsyncInstrumentable<Runtime> {
    public constructor() {
        const runtime = new Runtime();

        this.layers.push(new RuntimeLayerImplement(this, {
            'domains': runtime.domains(null),
        }));
    }
    
    public readonly [InstrumentationHook]: AsyncInstrumentationHook<Runtime, object> = AsyncInstrumentationHook.from(async (runtime, configuration) => {
        const baseLayer = last(this.layers);

        if (!baseLayer) {
            throw new Error();
        }

        const newLayer = await baseLayer.extend(runtime, configuration);

        this.layers.push(newLayer);

        return newLayer.externalizeCapabilities(); 
    });

    private readonly layers: Array<RuntimeLayer> = [];
}

export {
    RuntimeKernel,
    RuntimeContext,
};
