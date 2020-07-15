import { EventEmitter } from 'events';

import { Disposable } from '@atweel/primitives';
import { Diagnostics } from '@atweel/diagnostics';

import { Abortable } from '~/internals/Abortable';

type RuntimeEventEmitter = Pick<EventEmitter, 'emit' | 'on' | 'off'>

interface RuntimeExecutionDomain extends RuntimeEventEmitter, Disposable, Abortable, Omit<Diagnostics, 'abort'> {
    createNestedContext(diagnosticLabel: string): RuntimeExecutionDomain;
}

export {
    RuntimeExecutionDomain,
};
