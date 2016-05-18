const Parser = require('binary-parser').Parser;

class DNS {

    constructor() {}

    parse(data) {

        let message = new Parser()
            .nest('header', {
                type: new Parser()
                    .uint16('transactionID')
                    .nest('flags', {
                        type: new Parser()
                            .bit1('type')
                            .bit4('operationCode')
                            .bit1('authoritativeAnswer')
                            .bit1('truncation')
                            .bit1('recursionDesired')
                            .bit1('recursionAvailable')
                            .bit3('reserved')
                            .bit4('returnCode')
                    })
                    .uint16('question')
                    .uint16('answer')
                    .uint16('authority')
                    .uint16('additional')
            })
            .array('questions', {
                type: new Parser()
                    .array('labels', {
                        type: new Parser()
                            .uint8('length')
                            .string('label', {
                                encoding: 'utf8',
                                length: 'length'
                            }),
                        readUntil: function(item, buffer) {
                            return item.length === 0
                        }
                    })
                    .string('questionType', {
                        encoding: 'hex',
                        length: 2
                    })
                    .uint16('class'),
                length: 'header.question'
            });

        console.time("parse")
        console.log(JSON.stringify(message.parse(data)));
        console.timeEnd("parse")
    }
}

module.exports = DNS;
