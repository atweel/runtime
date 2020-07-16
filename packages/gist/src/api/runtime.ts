import { instrument, AsyncInstrumentationSyntax } from '@atweel/instrumentation';

import { RuntimeKernel } from '~/internals/RuntimeKernel';
import { Runtime } from '~/internals/Runtime';

const kernel = new RuntimeKernel();

export default (): AsyncInstrumentationSyntax<Runtime> => {
    return instrument(kernel, Runtime);
};
