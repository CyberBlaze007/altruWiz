class User {
    name: string;
    avatar: any;
    rank: string;
    expTotal: Int32Array;
    constructor (name:string, avatar:any, rank:string, expTotal:Int32Array) {
        this.name = name;
        this.avatar = avatar;
        this.rank = rank;
        this.expTotal = expTotal;
    }
    toString() {
        return this.name + ', ' + this.avatar + ', ' + this.rank + ', ' + this.expTotal;
    }
}

// Firestore data converter
const userConverter = {
    toFirestore: (Indiv:User) => {
        return {
            name: Indiv.name,
            avatar: Indiv.avatar,
            rank: Indiv.rank,
            expTotal: Indiv.expTotal
            };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new User(data.name, data.avatar, data.rank, data.expTotal);
    }
};

export default userConverter;