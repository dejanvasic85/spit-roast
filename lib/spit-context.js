// @flow

export type SpitContext = {
    logger : Object,
    config : Object,
    redis : ?Object,
    event : Object,
    body: ?Array<Object>
}