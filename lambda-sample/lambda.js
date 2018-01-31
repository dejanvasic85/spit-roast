import type {SpitContext} from "../lib/spit-context";

import Spit from "../lib/spit";
import kinesis from "./kinesis-middleware";
import logger from "./logger-middlerware";

const spit = new Spit()
    .pre(kinesis)
    .use((context, event) => {
        // Todo - some processing on the event
    })
    .use((context, event) => {
        // Todo - some MORE processing on the event
    })
    .post(logger);



// Entry point to an AWS Lambda
module.exports = (event) => {
    return spit.roast(event)
};