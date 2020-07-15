import {} from '@atweel/diagnostics';

// import { UniversalRuntimeExtensionConstructor } from '~/internals/UniversalRuntimeExtension';
import { UniversalRuntime } from './UniversalRuntime';

interface UniversalRuntimeBuilder {
    // with(extension: UniversalRuntimeExtensionConstructor): this;
    build(): UniversalRuntime;
}

export {
    UniversalRuntimeBuilder,
};
