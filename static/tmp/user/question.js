export default {
		id: 1,
		text: 'First driving experience?',
		author: [
			{
				id: 6564,
				name: 'Grigoriy',
				img: require('~/assets/images/source/girls/2.jpg')
			},
			{
				id: 123,
				name: 'Malvina',
				img: require('~/assets/images/source/girls/1.jpg')
			}
		],
		// Варианты ответов
		answerVariables: [
			{
				id: 1,
				text: 'Lorem ipsum dolor sit amet',
				selected: false
			},
			{
				id: 2,
				text: 'Сonsectetur adipisicing elit',
				selected: false
			},
			{
				id: 3,
				text: 'Sed do eiusmod tempor incididunt',
				selected: false
			},
			{
				id: 4,
				text: 'Ut labore et dolore magna aliqua',
				selected: false
			},
			{
				id: 5,
				text: 'Ut enim ad minim veniam, quis nostrud',
				selected: false
			},
			{
				id: 6,
				text: 'Indicate your option',
				selected: false
			}
		],
		plusProcentQuestion: 5,
		plusBalanceQuestion: 15,
		muliptle: true,
		max_variants: 3
	}