import OpenAI from 'openai';

const openai = new OpenAI();

export class GptService {
	static async calculateCorrectnessScore(userAnswer, definition, partOfSpeech) {
		const prompt = `
            Given the definition "${definition}" and part of speech "${partOfSpeech}", rate the correctness of the answer "${userAnswer}" on a scale of 0 to 1 in decimal format. 
            Always return the result in JSON format. If there's an error or nothing to compare, provide an appropriate error message in the JSON.
            {
                "score": [score],
                "error": "[error_message]"
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
