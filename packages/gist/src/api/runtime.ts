import { instrumented, AsyncInstrumentationSyntax } from '@atweel/runtime-instrumentation';

import { RuntimeKernel } from '~/internals/RuntimeKernel';
import { Runtime } from '~/internals/Runtime';

const kernel = new RuntimeKernel();

export default (): AsyncInstrumentationSyntax<Runtime> => {
    return instrumented(kernel, kernel.createRuntime.bind(kernel));
};
