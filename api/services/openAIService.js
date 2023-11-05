const OpenAI = require('openai');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

class OpenAIService {
	static async calculateCorrectnessScore(word, userAnswer, definition, partOfSpeech) {
		const prompt = `Evaluate the given sentence based on the definition and part of speech provided. 
		Rate the correctness of the sentence "${userAnswer}" on a scale of 0 to 1 in decimal format. 
		A correct usage means the word "${word}" fits the definition "${definition}" and aligns with the part of speech "${partOfSpeech}" in the context of the sentence.
			Return the result in JSON format. For errors or inconclusive evaluations, please reflect that in the JSON score.
			{
				"score": [score],
			}
		`;



		const params = {
			messages: [{ role: 'user', content: prompt }],
			model: 'gpt-3.5-turbo',
		};

		const response = await openai.chat.completions.create(params);

		const jsonResponse = JSON.parse(response.choices[0].message.content.trim());

		return jsonResponse;
	}
}

module.exports = OpenAIService;