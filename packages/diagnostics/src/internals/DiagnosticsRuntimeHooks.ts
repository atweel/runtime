import { Diagnostics } from '@atweel/diagnostics';

type DiagnosticsRuntimeHooks = Omit<Diagnostics, 'abort'>;

export {
    DiagnosticsRuntimeHooks,
};
