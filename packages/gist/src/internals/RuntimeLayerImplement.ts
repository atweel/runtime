import { Dictionary, defaults, entries } from 'lodash';

import { InstrumentationConfiguration, InstrumentationFunction } from '@atweel/runtime-instrumentation';

import { RuntimeLayer } from '~/internals/RuntimeLayer';
import { RuntimeKernel } from '~/internals/RuntimeKernel';
import { RuntimeCapability } from '~/internals/RuntimeCapability';
import { RuntimeInstrumentationLike } from '~/types';

class RuntimeLayerImplement implements RuntimeLayer {
    public constructor(
        private kernel: RuntimeKernel,
        private capabilities: Dictionary<object>
    ) {

    }   

    public externalizeCapabilities(): object {
        return this.capabilities;
    }

    public async extend<I extends RuntimeInstrumentationLike<I>>(instrumentation: I & Record<string, InstrumentationFunction<RuntimeCapability> | undefined>, configuration: InstrumentationConfiguration<I>): Promise<RuntimeLayer> {
        const extendedCapabilities: Record<string, RuntimeCapability> = {};

        const promises = entries(configuration).map(([ name, args ]) => {
            const instrument = instrumentation[name];

            if (!instrument) {
                throw new Error();
            }

            return Promise.resolve(instrument(args))
                .then((capability) => {
                    extendedCapabilities[name] = capability;
                });
        });

        await Promise.all(promises);

        const combinedCapabilities = defaults(extendedCapabilities, this.capabilities);

        return new RuntimeLayerImplement(this.kernel, combinedCapabilities);
    }

    // public async bootstrap(capabilityConfigurations: CapabilityConfigurationMap): Promise<any> {
    //     debug(`Bootstrapping runtime...`);

    //     const missingCapabilities = without(keys(capabilityConfigurations), ...keys(this.capabilityProviders));

    //     if (missingCapabilities.length > 0) {
    //         throw new Error(`The following required capabilities are missing: ${ missingCapabilities.join(', ') }.`);
    //     }

    //     const existingCapabilities = intersection(keys(this.capabilities), keys(capabilityConfigurations));

    //     if (existingCapabilities.length > 0){
    //         throw new Error(`The following capabilities are already loaded: ${ existingCapabilities.join(', ') }.`);
    //     }

    //     const newCapabilities = mapValues(capabilityConfigurations, (configuration, capability) => this.capabilityProviders[capability].configureCapability(configuration));

    //     entries(newCapabilities).forEach(([ key, value ]) => this.capabilities[key] = value);

    //     const capabilities = merge({}, ...entries(capabilityConfigurations).map(([ capability, configuration ]) => {
    //         return this.capabilityProviders[capability](configuration);
    //     }));

    //     return Promise.resolve(capabilities);
    // }
}

export {
    RuntimeLayerImplement,
};
