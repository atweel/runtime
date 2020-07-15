import { Container, interfaces, ContainerModule } from 'inversify';
import { RuntimeContainers } from './RuntimeContainers';

class RuntimeContainersCapability implements RuntimeContainers {
    public constructor(private readonly container: Container) {

    }
    
    public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }

    public extend(modules: ContainerModule[]): RuntimeContainers {
        const childContainer = this.container.createChild();

        modules.forEach((module) => childContainer.load(module));

        return new RuntimeContainersCapability(childContainer);
    }

    public static from(modules: ContainerModule[]): RuntimeContainersCapability {
        const container = new Container();

        modules.forEach((module) => container.load(module));
        
        return new RuntimeContainersCapability(container);
    }
}

export {
    RuntimeContainersCapability,
};
