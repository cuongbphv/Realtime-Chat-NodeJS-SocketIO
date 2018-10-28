const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./mesage');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Bui Cuong';
        let text = "Xin chao";
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        let from = 'Bui Cuong';
        let latitude = 15;
        let longtitude = 100;
        let url = `https://www.google.com/maps/search/15,100`
        let message = generateLocationMessage(from, latitude, longtitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    });
});