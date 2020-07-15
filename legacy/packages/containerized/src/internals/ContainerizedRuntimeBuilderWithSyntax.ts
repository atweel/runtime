import { ContainerModule, interfaces } from 'inversify';

interface ContainerizedRuntimeBuilderWithSyntax<SNext> {
    with(containerModule: ContainerModule): SNext;
    with(containerRegistry: interfaces.ContainerModuleCallBack): SNext;
}

export {
    ContainerizedRuntimeBuilderWithSyntax,
};
