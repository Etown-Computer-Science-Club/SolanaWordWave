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
			model: 'gpt-3.5-turbo-1106',
			response_format: { "type": "json_object" },
		};

		const response = await openai.chat.completions.create(params);

		const jsonResponse = JSON.parse(response.choices[0].message.content.trim());

		return jsonResponse;
	}

	static async generateNextWord() {
		const prompt = `Generate a new word of the day that someone can learn for the day. This word should be at least 5 characters wrong.
			With the word, you will also need to provide the definition and part of speech of the word.
			You will also need to provide 4 multiple choice options, where a user has to select the sentence that uses the word correctly.
			By using a word correctly, the word should fit the definition and align with the part of speech in the context of the sentence.
			Please provide the answer to the multiple choice, matching exactly one of the options.
			For example, if opt1 is the correct answer, please provide the value of opt1 as the answer rather than the text "opt1".
			Please return the data in JSON format:
			{
				"word": [word],
				"opt1": { // 4 multiple choice options
					value: [opt1]
					isAnswer: true/false
				},	
				"opt2": {
					value: [opt2]
					isAnswer: true/false
				},
				"opt3": {
					value: [opt3]
					isAnswer: true/false
				},
				"opt4": {
					value: [opt4]
					isAnswer: true/false
				},
				"pos": [pos], // part of speech
				"def": [def], // definition
			}`;

		const params = {
			messages: [{ role: 'user', content: prompt }],
			model: 'gpt-3.5-turbo-1106',
			response_format: { "type": "json_object" },
		};

		const response = await openai.chat.completions.create(params);

		const jsonResponse = JSON.parse(response.choices[0].message.content.trim());

		return jsonResponse;
	}
}

module.exports = OpenAIService;