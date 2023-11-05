import axios from 'axios';
const API_URL = 'http://localhost:5000/game';

export default class GameService {
	static async getGameDetails() {
		const data = {
			wordOfTheDay: "Velocity",
			wordDate: " ",
			options: [
					"The car's velocity steadily increased as it accelerated down the highway",
					"The velocity of the soccer ball is very round.",
					"I can't believe the velocity of that delicious pizza, it's so cheesy",
					"Her velocity of cooking skills is impressive; she makes the best lasagna."
				],
			partOfSpeach: "Noun",
			definition: "Velocity is a measure of an object's speed in a specific direction. It is a vector quantity that describes the rate of change of an object's position with respect to time and includes both the magnitude and direction of motion. Velocity is commonly expressed in units like meters per second (m/s) in the International System of Units (SI) and is essential in the field of physics to describe the motion of objects."
		}
		
		return(
			data
		)

	}

	static async submitGame() {

	}
}