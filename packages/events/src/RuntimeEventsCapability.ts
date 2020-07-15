import { EventEmitter } from 'events';

import { RuntimeEvents } from '~/RuntimeEvents';

class RuntimeEventsCapability implements RuntimeEvents {
    public emit(event: string, payload: any): void {
        this.eventEmitter.emit(event, payload);
    }

    private readonly eventEmitter: EventEmitter = new EventEmitter();
}

export {
    RuntimeEventsCapability,
};
