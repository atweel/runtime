import { Container, ContainerModule, interfaces } from 'inversify';

import { Runtime, RuntimeExecutionDomain } from '@atweel/runtime';

import { ContainerizedRuntimeBuilderWithSyntax } from '~/internals/ContainerizedRuntimeBuilderWithSyntax';
import { ContainerizedRuntimeBuilderBuildSyntax } from '~/internals/ContainerizedRuntimeBuilderBuildSyntax';
import { ContainerizedRuntimeExecutionDomainImplement } from '~/internals/ContainerizedRuntimeExecutionDomainImplement';
import { NamedDiagnosticsFactory, DomainContainerFactory } from '~/internals/types';

type PostInitializationSyntax = ContainerizedRuntimeBuilderWithSyntax<PostInitializationSyntax>
    & ContainerizedRuntimeBuilderBuildSyntax<ContainerizedRuntime>;

type ContainerizedRuntimeExecutionDomain = RuntimeExecutionDomain & Pick<Container, 'get'>;

type ConstantOrDynamicValue<T extends string | number | object> = T | ((context: interfaces.Context) => T);

type Callback = (...args: any[]) => any;

interface UsingDirectiveSyntax<T> {
    asFactory(...aliases: Array<interfaces.ServiceIdentifier<T>>): void;
    asValue(...aliases: Array<interfaces.ServiceIdentifier<T>>): void;
    asCallback(...aliases: Array<interfaces.ServiceIdentifier<T>>): void;
}

type UsingDirectiveResult<T> = T extends interfaces.FactoryCreator<any>
        ? Pick<UsingDirectiveSyntax<T>, 'asFactory'>
        : T extends interfaces.Newable<any>
            ? void
            : T extends Callback
                ? Pick<UsingDirectiveSyntax<T>, 'asValue' | 'asCallback'>
                : T extends string | number | boolean | object
                    ? Pick<UsingDirectiveSyntax<T>, 'asValue'>
                    : UsingDirectiveSyntax<T>;

interface ContainerizedRuntimeInitializationDirectives {
    using<T>(type: 'constructor', constructor: interfaces.Newable<T>): void;
    using<T>(type: 'factory', factoryCreator: interfaces.FactoryCreator<T>): Pick<UsingDirectiveSyntax<T>, 'asFactory'>;
    using<T extends string | number | object>(type: 'value', value: ConstantOrDynamicValue <T>): Pick<UsingDirectiveSyntax<T>, 'asValue'>;
    using(type: 'callback', callback: Callback): Pick<UsingDirectiveSyntax<Callback>, 'asCallback'>;

    // using<T>(resource: T): UsingDirectiveResult<T>;
}

type ContainerizedRuntimeInitializer = (directives: ContainerizedRuntimeInitializationDirectives) => void;

class ContainerizedRuntime implements Runtime {
    public constructor(
        containerModules: Iterable<ContainerModule>,
    ) {
        this.container.load(...containerModules);

        // this.container
        //     .bind(NamedDiagnosticsFactory)
        //     .toFactory(({ container }) => );

        this.container
            .bind(DomainContainerFactory)
            .toFactory(({ container }) => () => container.createChild());
    }

    public createInternalExecutionDomain(name: string): ContainerizedRuntimeExecutionDomain {
        throw new Error('Not implemented.');
        // const domainContainer = this.container.createChild();

        // return new ContainerizedRuntimeExecutionDomainImplement(domainContainer, );
    }

    public createExternalExecutionDomain(): ContainerizedRuntimeExecutionDomain {
        throw new Error('Method not implemented.');
    }

    public attachRemoteExecutionDomain(): ContainerizedRuntimeExecutionDomain {
        throw new Error('Method not implemented.');
    }

    public static initialize(initializer: ContainerizedRuntimeInitializer): PostInitializationSyntax {
        throw new Error('Method not implemented.');
    }

    private readonly container: Container = new Container();
}

export {
    ContainerizedRuntime,
    ContainerizedRuntimeExecutionDomain,
};
