const Parser = require('binary-parser').Parser;

const headerParser = Parser.start()
  .uint16('transactionID')
  .nest('flags', {
    type: Parser.start()
      .bit1('type')
      .bit4('operationCode')
      .bit1('authoritativeAnswer')
      .bit1('truncation')
      .bit1('recursionDesired')
      .bit1('recursionAvailable')
      .bit3('reserved')
      .bit4('returnCode')
  })
  .uint16('questions')
  .uint16('answerRRs')
  .uint16('authorityRRs')
  .uint16('additionalRRs');

const questionParser = Parser.start()
  .array('labels', {
    type: nParser.start()
      .uint8('length')
      .string('label', {
        encoding: 'utf8',
        length: 'length'
      }),
    readUntil: function(item, buffer) {
      return item.length === 0
    }
  })
  .string('type', {
    encoding: 'hex',
    length: 2
  })
  .uint16('class');

const resourceRecordParser = Parser.start()
  .array('labels', {
    type: nParser.start()
      .uint8('length')
      .string('label', {
        encoding: 'utf8',
        length: 'length'
      }),
    readUntil: function(item, buffer) {
      return item.length === 0
    }
  })
  .string('type', {
    encoding: 'hex',
    length: 2
  })
  .uint16('class')
  .uint32('TTL')
  .uint16('length')
  .string('data': {
    encoding: 'utf8',
    length: 'length'
  });

const messageParser = Parser.start()
  .nest('header', {
    type:
  })
  .array('questions', {
    type: questionParser,
    length: 'header.questions'
  })
  .array('answers', {
    type: resourceRecordParser,
    length: 'header.answerRRs'
  })
  .array('authorities', {
    type: resourceRecordParser,
    length: 'header.authorityRRs'
  })
  .array('additionnals', {
    type: resourceRecordParser,
    length: 'header.additionalRRs'
  });

class DNS {

  constructor(store) {
    this._store = store;
  }

  handleRequest(data) {
    let request = parse(data);


  }

  parse(data) {
    console.log(JSON.stringify(messageParser.parse(data)));
  }
}

module.exports = DNS;
