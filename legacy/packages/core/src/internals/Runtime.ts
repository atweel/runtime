import { RuntimeExecutionDomain } from '~/internals/RuntimeExecutionDomain';

interface Runtime {
    createInternalExecutionDomain(id: string): RuntimeExecutionDomain;
    createExternalExecutionDomain(): RuntimeExecutionDomain;
    attachRemoteExecutionDomain(): RuntimeExecutionDomain;
}

const Runtime = Symbol();

export {
    Runtime,
};
