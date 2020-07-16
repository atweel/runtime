import { Dictionary, defaults, entries } from 'lodash';

import { InstrumentationConfiguration, InstrumentationFunction } from '@atweel/instrumentation';

import { RuntimeLayer } from '~/internals/RuntimeLayer';
import { RuntimeKernel } from '~/internals/RuntimeKernel';
import { RuntimeInstrumentationLike } from '~/types';

class RuntimeLayerImplement implements RuntimeLayer {
    public constructor(
        private kernel: RuntimeKernel,
        private _capabilities: Dictionary<object>
    ) {

    }   

    public externalizeCapabilities(): object {
        return this._capabilities;
    }

    public get capabilitites(): Dictionary<object> {
        return this._capabilities;
    }

    public async extend<I extends RuntimeInstrumentationLike<I>>(instrumentation: I & Record<string, InstrumentationFunction<object> | undefined>, configuration: InstrumentationConfiguration<I>): Promise<RuntimeLayer> {
        const extendedCapabilities: Record<string, object> = {};

        const promises = entries(configuration).map(([ name, args ]) => {
            const instrument = instrumentation[name];

            if (!instrument) {
                throw new Error();
            }

            return Promise.resolve(instrument(this, ...(args as any[])))
                .then((capability) => {
                    extendedCapabilities[name] = capability;
                });
        });

        await Promise.all(promises);

        const combinedCapabilities = defaults(extendedCapabilities, this._capabilities);

        return new RuntimeLayerImplement(this.kernel, combinedCapabilities);
    }
}

export {
    RuntimeLayerImplement,
};
