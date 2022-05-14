class Achievement {
    id: string;
    rank: string;
    expGain: number;
    expReq: number;
    joined: number;
    badges: number;
    events: string;
    constructor (
        id: string,
        rank: string,
        expGain: number,
        expReq: number,
        joined: number,
        badges: number,
        events: string
        ) {
        this.id = id;
        this.rank = rank;
        this.expGain = expGain;
        this.expReq = expReq;
        this.joined = joined;
        this.badges = badges;
        this.events = events;
    }
    toString() {
        return this.id + ', '
        + this.rank + ', '
        + this.expGain + ', '
        + this.expReq + ', '
        + this.joined + ', '
        + this.badges + ', '
        + this.events;
    }
}

// Firestore data converter
const achievementConverter = {
    toFirestore: (Achievement:Achievement) => {
        return {
            id: Achievement.id,
            rank: Achievement.rank,
            expGain: Achievement.expGain,
            expReq: Achievement.expReq,
            joined: Achievement.joined,
            badges: Achievement.badges,
            events: Achievement.events
            };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new Achievement(
            data.id,
            data.rank,
            data.expGain,
            data.expReq,
            data.joined,
            data.badges,
            data.events
        );
    }
};

export default achievementConverter;