// @flow
import type {SpitContext} from './spit-context';
import Promise from 'bluebird';

let context,
    logger = console.log;


export default class Spit {

    middleware: Array<Promise<SpitContext>>; // Per Batch
    eventMiddleware: Array<Promise<SpitContext>>; // Per Event
    context: SpitContext;

    constructor() {

        this.preMiddleware = [];
        this.postMiddleware = [];
        this.eventMiddleware = [];
        this.context = {
            logger: logger,
            event: null,
            body: []
        }

    }

    pre(func: Function<Promise<SpitContext>>) {
        this.preMiddleware.push(func);
        return this;
    }

    post(func: Function<Promise<SpitContext>>) {
        this.postMiddleware.push(func)
        return this;
    }

    use(func: Function<Promise<SpitContext>>) {
        this.eventMiddleware.push(func);
        return this;
    }

    roast(event: Object): Promise {
        this.context.event = event;

        // Process all middleware
        return Promise.mapSeries(this.preMiddleware, preMiddle => {

            return preMiddle(this.context);

        }).then(results => {

            this.context.logger.info('Pre-Middleware completed', results);

        }).then(() => {

            // Process each event
            return Promise.mapSeries(this.context.body, event => {

                return Promise.mapSeries(this.eventMiddleware, em => {

                    em(this.context, event);

                });

            });

        }).then(() => {

            return Promise.mapSeries(this.postMiddleware, pm => {
                return pm(this.context);
            });

        }).catch(middlewareException => {
            this.context.logger.error('error in middleware', middlewareException);
        });
    }
}