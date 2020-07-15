interface Abortable {
    abort(error: Error): never;
    abort(error: ErrorConstructor): never;
    abort(error: string): never;
}

export {
    Abortable,
};
