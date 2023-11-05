import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'production'
	? 'https://api.wordwave.us/game'
	: 'http://localhost:3001/game';

export default class GameService {
	static async getGameDetails(details) {
		const { data } = await axios.post(API_URL, details)
		return (data)
	}

	static async submitGame(details) {
		const { data } = await axios.post(`${API_URL}/submit`, details)
		return (data)
	}
}