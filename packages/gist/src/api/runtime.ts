import { instrumented } from '@atweel/runtime-instrumentation';

import { RuntimeKernel } from '~/internals/RuntimeKernel';
import { Runtime } from '~/internals/Runtime';
import { AsyncInstrumentationSyntax } from '@atweel/runtime-instrumentation/lib/internals/AsyncInstrumentationSyntax';

const kernel = new RuntimeKernel();

export default (): AsyncInstrumentationSyntax<Runtime> => {
    return instrumented(kernel, Runtime);
};
