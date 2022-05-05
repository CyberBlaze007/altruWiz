class Rank {
    name: string;
    image: any;
    expNeeded: Int32Array;
    constructor (name:string, image:any, expNeeded:Int32Array) {
        this.name = name;
        this.image = image;
        this.expNeeded = expNeeded;
    }
    toString() {
        return this.name + ', ' + this.image + ', ' + this.expNeeded;
    }
}

// Firestore data converter
const rankConverter = {
    toFirestore: (Rank:Rank) => {
        return {
            name: Rank.name,
            image: Rank.image,
            expNeeded: Rank.expNeeded
            };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new Rank(data.name, data.image, data.expNeeded);
    }
};

export default rankConverter;