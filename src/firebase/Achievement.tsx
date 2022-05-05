class Achievement {
    name: string;
    desc: string;
    image: string;
    constructor (name:string, desc:string, image:string) {
        this.name = name;
        this.desc = desc;
        this.image = image;
    }
    toString() {
        return this.name + ', ' + this.desc + ', ' + this.image;
    }
}

// Firestore data converter
const achievementConverter = {
    toFirestore: (Achievement:Achievement) => {
        return {
            name: Achievement.name,
            desc: Achievement.desc,
            image: Achievement.image
            };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new Achievement(data.name, data.desc, data.image);
    }
};

export default achievementConverter;