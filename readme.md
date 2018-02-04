# Spit Roast Lambda

Spit roast is a library aimed to provide an express-like engine
(using middelware) to incoming events for streams like kinesis or SNS or even Azure Event Hubs.

Also ability to provide some common middleware such as the `kinesisParser`.

Example:

```
import {Spit, kinesisParser} from 'spit-roast';

const spit = new Spit()
    .use(kinesisParser)
    .use(spitcontext => {
        console.log('kinesisParser should parse', spitContext.body);
    });

// Entry point to an AWS Lambda
module.exports = spit.roast(event);

```

# The Spit Context

This is the context object that is received and returned
by all middleware. The three common properties are:

- Logger
- Config
- Body

Just like the express `request` object, you can add
and mutate the context object as you like so that
other middleware can use it.