import { interfaces, ContainerModule } from 'inversify';

interface RuntimeContainers {
    extend(odules: ContainerModule[]): RuntimeContainers;
    get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T;
}

export {
    RuntimeContainers,
};
