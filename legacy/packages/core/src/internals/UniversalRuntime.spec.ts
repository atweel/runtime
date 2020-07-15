import 'jest';
import { UniversalRuntime } from './UniversalRuntime';

describe.skip('UniversalRuntime', function () {
    describe('#createExecutionDomain', function () {
        it('Creates an execution context', function () {
            const runtime = new UniversalRuntime();

            const context = runtime.createInternalExecutionDomain();

            expect(context).toMatchObject({});
        });
    });
});
