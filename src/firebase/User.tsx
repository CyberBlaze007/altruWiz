class User {
	name: any;
	avatar: any;
	rank: string;
	expTotal: number;
	eventsJoined: Int32Array;
	badgesCollected: Int32Array;
	constructor(
		name: string,
		avatar: any,
		rank: string,
		expTotal: number,
		eventsJoined: Int32Array,
		badgesCollected: Int32Array
	) {
		this.name = name;
		this.avatar = avatar;
		this.rank = rank;
		this.expTotal = expTotal;
		this.eventsJoined = eventsJoined;
		this.badgesCollected = badgesCollected;
	}
	toString() {
		return (
			this.name +
			', ' +
			this.avatar +
			', ' +
			this.rank +
			', ' +
			this.expTotal +
			', ' +
			this.badgesCollected +
			', ' +
			this.eventsJoined
		);
	}
}

// Firestore data converter
const userConverter = {
	toFirestore: (Indiv: User) => {
		return {
			name: Indiv.name,
			avatar: Indiv.avatar,
			rank: Indiv.rank,
			expTotal: Indiv.expTotal,
			eventsJoined: Indiv.eventsJoined,
			badgesCollected: Indiv.badgesCollected,
		};
	},
	fromFirestore: (snapshot: any, options: any) => {
		const data = snapshot.data(options);
		return new User(
			data.name,
			data.avatar,
			data.rank,
			data.expTotal,
			data.badgesCollected,
			data.eventsJoined
		);
	},
};

export default userConverter;
