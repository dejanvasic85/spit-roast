# Spit Roast Lambda

Spit roast is a library aimed to provide an express-like engine
(using middelware) to incoming events.

Also ability to provide some common middleware
such as KinesisParser.

Example:

```
import Spit from 'spit-roast';

const spit = new Spit()
    .use()
    .use()


// Entry point to an AWS Lambda
module.exports = (event) => {
    return spit.roast(event);
};
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