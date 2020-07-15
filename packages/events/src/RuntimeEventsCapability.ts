import { RuntimeEvents } from '~/RuntimeEvents';

class RuntimeEventsCapability implements RuntimeEvents {
    public emit(event: string, payload: any): void {
        throw new Error('Method not implemented.');
    }
}

export {
    RuntimeEventsCapability,
};
