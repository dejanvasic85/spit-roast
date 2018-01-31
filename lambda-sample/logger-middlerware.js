import type {SpitContext} from '../lib/spit-context';

export default function (context: SpitContext) {
    console.log('CUSTOM LOGGER: Body looks like this', context.body);

    return context;
};