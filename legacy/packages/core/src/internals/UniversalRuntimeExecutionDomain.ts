import { EventEmitter } from 'events';

import { RuntimeExecutionDomain } from '~/internals/RuntimeExecutionDomain';
import { Diagnostics } from '@atweel/diagnostics';

class UniversalRuntimeExecutionDomain implements RuntimeExecutionDomain {
    public constructor (diagnostics: Diagnostics) {
        this._notify = diagnostics.notify.bind(diagnostics);
        this._warn = diagnostics.warn.bind(diagnostics);
        this._debug = diagnostics.debug.bind(diagnostics);

        this.eventEmitter = new EventEmitter();
    }

    public createNestedContext(diagnosticLabel: string): RuntimeExecutionDomain {
        throw new Error('Method not implemented.');
    }
    
    public emit(event: string | symbol, ...args: any[]): boolean {
        return this.eventEmitter.emit(event, ...args);
    }
    
    public on(event: string | symbol, listener: (...args: any[]) => void): EventEmitter {
        throw new Error('Method not implemented.');
    }

    public off(event: string | symbol, listener: (...args: any[]) => void): EventEmitter {
        throw new Error('Method not implemented.');
    }

    public abort(error: Error): never;
    public abort(error: ErrorConstructor): never;
    public abort(error: string): never;
    public abort(error: any): never {
        switch (typeof error) {
            case 'string': 
                throw new Error(error);

            case 'function':
                throw new error();

            case 'object':
                throw error;

            default:
                throw new Error('Unexpected error.');
        }
    }

    public dispose(): void {
        throw new Error('Method not implemented.');
    }
    
    public notify(message: string, tags?: string[] | undefined, payload?: any): void {
        this._notify(message, tags, payload);
    }
    
    public warn(message: string, tags?: string[] | undefined, payload?: any): void {
        this._warn(message, tags, payload);
    }
    
    public debug(message: string, tags?: string[] | undefined, payload?: any): void {
        this._debug(message, tags, payload);
    }

    private readonly _notify: Diagnostics['notify'];
    private readonly _warn: Diagnostics['warn'];
    private readonly _debug: Diagnostics['debug'];

    private readonly eventEmitter: EventEmitter;
}

export {
    UniversalRuntimeExecutionDomain,
};
