interface UniversalRuntimeExtension {

}

type UniversalRuntimeExtensionCategory = 'diagnostics';

type UniversalRuntimeExtensionConstructor = new () => UniversalRuntimeExtension;

export {
    UniversalRuntimeExtension,
    UniversalRuntimeExtensionConstructor,
    UniversalRuntimeExtensionCategory,
};
