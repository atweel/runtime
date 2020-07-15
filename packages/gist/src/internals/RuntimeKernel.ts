// import createDebug from 'debug';
import { RuntimeLayer } from './RuntimeLayer';
import { RuntimeLayerImplement } from './RuntimeLayerImplement';
import { InstrumentationHook, AsyncInstrumentationHook } from '@atweel/runtime-instrumentation';
import { Runtime } from '~/internals/Runtime';
import { AsyncInstrumentable } from '@atweel/runtime-instrumentation/lib/internals/AsyncInstrumentable';
import { last } from 'lodash';

// const debug = createDebug('runtime');

type RuntimeContext<T> = {
    [K in keyof T]: T[K];
};

export interface BuiltInCapabilitiesRuntimeContextHooks {
    createDomain(): void;
}

class RuntimeKernel implements AsyncInstrumentable<Runtime> {
    public constructor() {
        const runtime = new Runtime(null);

        this.layers.push(new RuntimeLayerImplement(this, {
            'domains': runtime.domains(),
        }));
    }

    public createRuntime(): Runtime {
        return new Runtime(last(this.layers) || null);
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
