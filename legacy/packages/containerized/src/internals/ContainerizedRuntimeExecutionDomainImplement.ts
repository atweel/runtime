import { interfaces, Container, ContainerModule } from 'inversify';

import { Diagnostics } from '@atweel/diagnostics';

import { 
    UniversalRuntimeExecutionDomain, 
} from '@atweel/runtime';

import { ContainerizedRuntimeExecutionDomain } from '~/internals/ContainerizedRuntime';

class ContainerizedRuntimeExecutionDomainImplement 
    extends UniversalRuntimeExecutionDomain
    implements ContainerizedRuntimeExecutionDomain {
    public constructor(
        private readonly container: Container,
        diagnostics: Diagnostics,
    ) {
        super(diagnostics);
    }

    public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }
}

export {
    ContainerizedRuntimeExecutionDomainImplement,
};
