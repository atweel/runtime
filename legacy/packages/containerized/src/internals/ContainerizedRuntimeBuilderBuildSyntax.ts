import { ContainerizedRuntime } from '~/internals/ContainerizedRuntime';

interface ContainerizedRuntimeBuilderBuildSyntax<R extends ContainerizedRuntime = ContainerizedRuntime> {
    build(): R;
}

export {
    ContainerizedRuntimeBuilderBuildSyntax,
};
