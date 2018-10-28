const expect = require('expect');
var {generateMessage} = require('./mesage');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Bui Cuong';
        let text = "Xin chao";
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});