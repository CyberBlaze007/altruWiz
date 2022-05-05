class Badges {
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
const badgesConverter = {
    toFirestore: (Badges:Badges) => {
        return {
            name: Badges.name,
            desc: Badges.desc,
            image: Badges.image
            };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new Badges(data.name, data.desc, data.image);
    }
};

export default badgesConverter;