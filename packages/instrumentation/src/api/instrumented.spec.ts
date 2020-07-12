/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'jest';

import { mark, annotate } from '@atweel/primitives';

import { Instrumentable } from '~/internals/Instrumentable';
import { InstrumentationConfiguration, InstrumentationHookHandler, SyncInstrumentationHook, AsyncInstrumentationHook } from '~/types';
import { InstrumentationHook } from '~/types';
import instrumented from './instrumented';
import { AsyncInstrumentable } from '~/internals/AsyncInstrumentable';

class SampleInstrumentation {
    
}

class SampleInstrumentable implements Instrumentable<SampleInstrumentation> {
    public constructor() {
        const hook = (instrumentation: SampleInstrumentation, configuration: InstrumentationConfiguration<SampleInstrumentation>): object => {
            return Object.entries(configuration)
                .map(([ name, parameters ]) => parameters ? (instrumentation as any)[name](...parameters) : {})
                .reduce((previous, current) => ({  ...previous, ...current }), {});
        };

        this[InstrumentationHook] = SyncInstrumentationHook.from(hook);
    }

    public readonly [InstrumentationHook]: SyncInstrumentationHook<SampleInstrumentation>;
}

class SampleAsyncInstrumentable implements AsyncInstrumentable<SampleInstrumentation> {
    public constructor() {
        const hook = async (instrumentation: SampleInstrumentation, configuration: InstrumentationConfiguration<SampleInstrumentation>): Promise<object> => {
            return Object.entries(configuration)
                .map(([ name, parameters ]) => parameters ? (instrumentation as any)[name](...parameters) : {})
                .reduce((previous, current) => ({  ...previous, ...current }), {});
        };

        this[InstrumentationHook] = AsyncInstrumentationHook.from(hook);
    }

    public readonly [InstrumentationHook]: AsyncInstrumentationHook<SampleInstrumentation>;
}

interface SampleInstrumentation1Result {
    callInstrumentation1(parameter: string): void;
}

interface SampleInstrumentation {
    instrument1(parameter: number): SampleInstrumentation1Result;
}

interface SampleInstrumentation2Result {
    callInstrumentation2(): void;
}

interface SampleInstrumentation {
    instrument2(parameter: string): SampleInstrumentation2Result;
}

SampleInstrumentation.prototype.instrument1 = function (parameter: number): SampleInstrumentation1Result {
    return {
        callInstrumentation1: (): void => {},
    };
};

SampleInstrumentation.prototype.instrument2 = function (parameter: string): SampleInstrumentation2Result {
    return {
        callInstrumentation2: (): void => {},
    };
};

describe('instrumented', () => {
    it('yields output that is a combination of outputs of individual instruments for a synchronous instrumentable', () => {
        const instrumentable = new SampleInstrumentable();

        const result = instrumented(instrumentable, SampleInstrumentation)
            .with('instrument1', 20)
            .with('instrument2', '10')
            .complete();

        result.callInstrumentation1('test');
        result.callInstrumentation2();
    });

    it('yields output that is a combination of outputs of individual instruments for an asynchronous instrumentable and a synchronous instrumentation', async () => {
        const instrumentable = new SampleAsyncInstrumentable();

        return instrumented(instrumentable, SampleInstrumentation)
            .with('instrument1', 20)
            .with('instrument2', '10')
            .ready()
            .then((result) => {
                result.callInstrumentation1('test');
                result.callInstrumentation2();
            });
    });
});
