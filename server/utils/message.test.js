var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		const from = 'Jen';
		const text = 'This is for the test message';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			text
		});
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const from = 'Jen';
		const latitude = 15;
		const longitude = 19;
		var url = 'https://www.google.com/maps?q=15,19'
		
		var message = generateLocationMessage(from, latitude, longitude);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			url
		});
	});
});
