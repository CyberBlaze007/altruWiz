class EventOrganizer {
    name: string;
    avatar: any;
    constructor (name:string, avatar:any) {
        this.name = name;
        this.avatar = avatar;
    }
    toString() {
        return this.name + ', ' + this.avatar;
    }
}

// Firestore data converter
const cityConverter = {
    toFirestore: (EventOrganizer:EventOrganizer) => {
        return {
            name: EventOrganizer.name,
            avatar: EventOrganizer.avatar,
            };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new EventOrganizer(data.name, data.avatar);
    }
};

export default cityConverter;