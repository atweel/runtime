import 'jest';

import { ContainerizedRuntime } from '~/internals/ContainerizedRuntime';
import { interfaces } from 'inversify';

class TestApplication {
    public run(): void {
        /** */
    }
}

describe('ContainerizedRuntime', () => {
    it('Supports application initialization flow syntax', () => {
        ContainerizedRuntime.initialize()
            .with((bind) => {
                bind(TestApplication).toSelf();
            })
            .build()
            .createInternalExecutionDomain()
            .get(TestApplication)
            .run(); 
    });

    it('Supports application initialization flow syntax', () => {
        ContainerizedRuntime.initialize(({ using }) => {
            using('callback', () => 2).asCallback();

            using(() => {}).asCallback();

            using('').asValue();
                
            using(() => 2).asValue();

            using((context: interfaces.Context) => (): interfaces.Container => context.container).asFactory();

            using(Diagnostics)
                .with(Console)
                .with(Void);
        })
            .createInternalExecutionDomain()
            .get(TestApplication)
            .run();
    });
});
