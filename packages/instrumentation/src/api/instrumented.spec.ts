/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'jest';

import { Instrumentable } from '~/internals/Instrumentable';
import { InstrumentationConfiguration } from '~/types';
import { InstrumentationHook } from '~/constants';
import instrumented from './instrumented';

class SampleInstrumentation {
    
}

class SampleInstrumentable implements Instrumentable<SampleInstrumentation> {
    public [InstrumentationHook](instrumentation: SampleInstrumentation, configuration: InstrumentationConfiguration<SampleInstrumentation>): object {
        return Object.entries(configuration)
            .map(([ name, parameters ]) => parameters ? (this as any)[name](...parameters) : {})
            .reduce((previous, current) => ({  ...previous, ...current }), {});
    }
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
    it('', () => {
        const instrumentable = new SampleInstrumentable();

        const result = instrumented(instrumentable, new SampleInstrumentation())
            .with('instrument1', 20)
            .with('instrument2', '10')
            .complete();

        result.callInstrumentation1('test');
        result.callInstrumentation2();
    });
});
