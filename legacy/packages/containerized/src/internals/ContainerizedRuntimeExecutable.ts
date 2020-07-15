import { injectable } from 'inversify';
import { ContainerizedRuntimeExecutionDomain } from './ContainerizedRuntime';

import { bindAll } from 'lodash';

@injectable()
abstract class ContainerizedRuntimeExecutable {
    protected constructor(
        ExecutionDomain: ContainerizedRuntimeExecutionDomain,
    ) {
        this._ExecutionDomain = bindAll(ExecutionDomain);

        this.notify = this._ExecutionDomain.notify;
        this.warn = this._ExecutionDomain.warn;
        this.debug = this._ExecutionDomain.debug;
    }

    protected readonly notify: ContainerizedRuntimeExecutionDomain['notify'];
    protected readonly warn: ContainerizedRuntimeExecutionDomain['warn'];
    protected readonly debug: ContainerizedRuntimeExecutionDomain['debug'];

    private readonly _ExecutionDomain: ContainerizedRuntimeExecutionDomain
}

export {
    ContainerizedRuntimeExecutable,
};
