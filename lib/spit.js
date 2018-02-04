// @flow

import type {SpitContext} from './spit-context';
import Promise from 'bluebird';

export default class Spit {

    middleware: Array<Promise<SpitContext>>; // Per Batch
    context: SpitContext;

    constructor(logger: Object) {

        this.middleware = [];
        this.context = {
            logger: logger || console.log,
            config: null,
            body: null
        }
    }

    use(func: Function) {
        this.middleware.push(func);
        return this;
    }

    roast(event: Object): Promise {
        this.context.body = event;

        // Process all middleware
        return Promise.mapSeries(this.middleware, m => {

            return m(this.context);

        });
    }
}