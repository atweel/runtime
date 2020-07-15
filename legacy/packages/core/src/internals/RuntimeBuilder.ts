import { Runtime } from '~/internals/Runtime';

interface RuntimeBuilder<R extends Runtime> {
    build(): R;
}

export {
    RuntimeBuilder,
};
