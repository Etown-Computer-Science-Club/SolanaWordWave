const OpenAI = require('openai-api');

const openai = new OpenAI();

class OpenAIService {
	static async calculateCorrectnessScore(userAnswer, definition, partOfSpeech) {
		const prompt = `
            Given the definition "${definition}" and part of speech "${partOfSpeech}", rate the correctness of the answer "${userAnswer}" on a scale of 0 to 1 in decimal format. 
            Always return the result in JSON format. If there's an error or nothing to compare, you should reflect that in the score of the JSON.
            {
                "score": [score],
            }
        `;

		const response = await openai.complete({
			model: 'gpt-3.5-turbo',
			prompt: prompt,
			max_tokens: 1000,
			n: 1,
			stop: null,
			temperature: 0.5
		});

		const jsonResponse = JSON.parse(response.choices[0].text.trim());

		return jsonResponse;
	}
}

module.exports = OpenAIService;