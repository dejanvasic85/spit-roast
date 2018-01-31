import type {SpitContext} from '../lib/spit-context';

export default function (context: SpitContext) {

    const event = context.event;
    context.body = decodeAllRecords(event.Records);

    event.Records.forEach(r => {
        context.body = parser.parseEvents(context.event);
    });

    return context;
};

const decodeAllRecords = (records): Array<Object> => {
    var result = [];

    this.logger.info(`Total Kinesis records: ${records.length}`);

    for (var i = 0; i < records.length; i++) {
        const record = records[i];
        try {

            const kinesisRecordData = extractKinesisRecordData(record);

            const parsedJson = this.parseJson(kinesisRecordData);

            this.logger.info("Decoded and Parsed JSON event", parsedJson);

            result.push({
                eventPayload: parsedJson,
                recordId: record.eventID,
                sequenceNumber: record.kinesis.sequenceNumber
            });
        } catch (e) {

            this.logger.error("error parsing Kinesis Record.  Exception:" + e.message, record);
        }
    }

    return result;
};

const extractKinesisRecordData = (record) => {

    if (!record) {
        throw new Error("kinesis record is null or undefined");
    }

    if (!record.kinesis) {
        throw new Error("kinesis record does not contain .kinesis field. ");
    }
    if (!record.kinesis.data) {
        throw new Error("kinesis record does not contain .kinesis.data field. ");
    }

    return record.kinesis.data;
}

const parseJson = (encodedJson) => {
    let decodedJson = Buffer(encodedJson, 'base64').toString('utf-8');
    let parsedJson;

    try {
        parsedJson = JSON.parse(decodedJson);
    } catch (e) {
        this.logger.error("Invalid JSON payload inside Kinesis event:" + e.message + " Decoded json:" + decodedJson);
        throw e;
    }

    return parsedJson;
}