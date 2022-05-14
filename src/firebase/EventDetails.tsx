class EventDetails {
    id: number;
    title: string;
    thumbnail: string;
    date: string;
    time: string;
    limit: number;
    org: string;
    location: string;
    quests: string;
    badges: string;
    xp: number;
    desc: string;
    attendanceCode: string;
    timestamp: string; //review the data type returned by auto generation
    constructor (
        id: number,
        title:string,
        thumbnail: string,
        date: string,
        time: string,
        limit: number,
        org: string,
        location: string,
        quests: string,
        badges: string,
        xp: number,
        desc:string,  
        attendanceCode:string, 
        timestamp:string
        ) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.date = date;
        this.time = time;
        this.limit =limit;
        this.org =org;
        this.location =location;
        this.quests = quests;
        this.badges = badges;
        this.xp = xp;
        this.desc = desc;
        this.attendanceCode = attendanceCode;
        this.timestamp = timestamp;
    }
    toString() {
        return this.id + ', ' 
        + this.title + ', ' 
        + this.thumbnail + ', ' 
        + this.date + ', '
        + this.time + ', ' 
        + this.limit + ', ' 
        + this.org + ', ' 
        + this.location + ', ' 
        + this.quests + ', ' 
        + this.badges + ', ' 
        + this.xp + ','
        + this.desc + ','
        + this.attendanceCode + ',' 
        + this.timestamp;
    }
}

// Firestore data converter
const eventConverter = {
    toFirestore: (EventDetails:EventDetails) => {
        return {
            id: EventDetails.id,
            title: EventDetails.title,
            thumbnail: EventDetails.thumbnail,
            date: EventDetails.date,
            time: EventDetails.time,
            limit: EventDetails.limit,
            org: EventDetails.org,
            location: EventDetails.location,
            quests: EventDetails.quests,
            badges: EventDetails.badges,
            xp: EventDetails.xp,
            desc: EventDetails.desc,
            attendanceCode: EventDetails.attendanceCode,
            timestamp: EventDetails.timestamp
        };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new EventDetails(
            data.id,
            data.title, 
            data.thumbnail, 
            data.date, 
            data.time, 
            data.limit, 
            data.org, 
            data.location, 
            data.quests, 
            data.badges, 
            data.xp,
            data.desc,
            data.attendanceCode,
            data.timestamp
            );
    }
};

export default eventConverter;