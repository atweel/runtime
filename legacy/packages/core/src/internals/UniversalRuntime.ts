import { Runtime } from '~/internals/Runtime';
import { RuntimeExecutionDomain } from '~/internals/RuntimeExecutionDomain';

class UniversalRuntime implements Runtime {

    public createInternalExecutionDomain(): RuntimeExecutionDomain {
        throw new Error('Method not implemented.');
    }

    public createExternalExecutionDomain(): RuntimeExecutionDomain {
        throw new Error('Method not implemented.');
    }

    public attachRemoteExecutionDomain(): RuntimeExecutionDomain {
        throw new Error('Method not implemented.');
    }

    // private readonly diagnosticsFactory: () => Diagnostics;
}   

export {
    UniversalRuntime,
};
