class BadgeDetails {
    id: string;
    image: string;
    name: string;
    desc: string;
    date: string;
    constructor (id:string, name:string, desc:string, image:string, date:string) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.desc = desc;
        this.date = date;
    }
    toString() {
        return this.id + ', ' 
        + this.image + ', '
        + this.name + ', ' 
        + this.desc + ', ' 
        + this.date;
    }
}

// Firestore data converter
const badgesConverter = {
    toFirestore: (Badges:BadgeDetails) => {
        return {
            id: Badges.id,
            image: Badges.image,
            name: Badges.name,
            desc: Badges.desc,
            date: Badges.date
            };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new BadgeDetails(
            data.id,
            data.image,
            data.name,
            data.desc,
            data.date
            );
    }
};

export default badgesConverter;