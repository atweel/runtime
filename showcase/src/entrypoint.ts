import runtime from '@atweel/runtime';

import '@atweel/runtime-containers';
import '@atweel/runtime-events';
import '@atweel/runtime-diagnostics';

import container from './container';

runtime()
    .with('containers', container)
    .with('events')
    .with('domains')
    .with('diagnostics')
    .ready()
    .then(({ diagnostics, domains, events, containers } ) => {
        diagnostics.notify('Runtime ready');

        containers.get('service');

        events.emit('test-event', { value: true });
        // console.log(runtime);s
        // runtime.exposeRuntimeContextHooks.notify(`Runtime ready.`);
    })
    .catch(console.error);
    
