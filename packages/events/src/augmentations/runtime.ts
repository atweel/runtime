import { Runtime } from '@atweel/runtime/lib/internals/Runtime';
import { RuntimeEvents } from '~/RuntimeEvents';
import { AsyncInstrumentationLike } from '@atweel/runtime-instrumentation';
import { RuntimeLayer } from '@atweel/runtime/lib/internals/RuntimeLayer';
import { RuntimeEventsCapability } from '~/RuntimeEventsCapability';

declare module '@atweel/runtime/lib/internals/Runtime' {
    interface Runtime extends AsyncInstrumentationLike<Runtime, object, any[], RuntimeLayer> {
        events(layer: RuntimeLayer): RuntimeEvents;
    }
}

Runtime.prototype.events = function (layer: RuntimeLayer): RuntimeEvents {
    const inheritedCapability = layer.capabilitites['events'];

    if (!!inheritedCapability && !(inheritedCapability instanceof RuntimeEventsCapability)) {
        throw new Error();
    }

    return inheritedCapability || new RuntimeEventsCapability();
};
