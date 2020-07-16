import { Runtime } from '@atweel/runtime/lib/internals/Runtime';
import { RuntimeEvents } from '~/RuntimeEvents';
import { AsyncInstrumentationLike } from '@atweel/instrumentation';
import { RuntimeLayer } from '@atweel/runtime/lib/internals/RuntimeLayer';
import { RuntimeEventsCapability } from '~/RuntimeEventsCapability';

declare module '@atweel/runtime/lib/internals/Runtime' {
    interface Runtime extends AsyncInstrumentationLike<Runtime, object, any[], RuntimeLayer | null> {
        events(layer: RuntimeLayer | null): RuntimeEvents;
    }
}

Runtime.prototype.events = function (layer: RuntimeLayer | null): RuntimeEvents {
    const inheritedCapability = layer?.capabilitites['events'];

    if (!!inheritedCapability && !(inheritedCapability instanceof RuntimeEventsCapability)) {
        throw new Error();
    }

    return inheritedCapability || new RuntimeEventsCapability();
};
