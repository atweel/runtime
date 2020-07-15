import { RuntimeLayer } from '~/internals/RuntimeLayer';

interface RuntimeCapability<H extends object = object> {
    exposeRuntimeContextHooks(/*layer: RuntimeLayer*/): H;
}

export {
    RuntimeCapability,
};
