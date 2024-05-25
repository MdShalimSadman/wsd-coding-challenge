const request = require('supertest');
const app = require('../index');
const textAnalyzer = require('../utils/textAnalyzer');

describe('Text Analyzer API', () => {
    it('should create a new text entry', async () => {
        const response = await request(app)
            .post('/texts')
            .send({ text: 'The quick brown fox jumps over the lazy dog.' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should analyze text and return correct metrics', () => {
        const text = 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';
        const analysis = textAnalyzer.analyzeText(text);
        expect(analysis.wordCount).toBe(16);
        expect(analysis.characterCount).toBe(60);
        expect(analysis.sentenceCount).toBe(2);
        expect(analysis.paragraphCount).toBe(1);
        expect(analysis.longestWord).toBe('quick');
    });
});
