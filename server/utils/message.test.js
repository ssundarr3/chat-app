const expect = require('expect');
const {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate the correct message', () => {
    const from = 'fromName';
    const text = 'the message that is sent';
    const message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
