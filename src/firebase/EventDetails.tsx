class EventDetails {
    name: string;
    attendanceCode: string;
    image: string;
    desc: string;
    eventDate: string;
    timestamp: string; //review the data type returned by auto generation
    constructor (
        name:string, 
        attendanceCode:string, 
        image:string, 
        desc:string, 
        eventDate:string, 
        timestamp:string
        ) {
        this.name = name;
        this.attendanceCode = attendanceCode;
        this.image = image;
        this.desc = desc;
        this.eventDate = eventDate;
        this.timestamp = timestamp;
    }
    toString() {
        return this.name + ', ' + this.attendanceCode + ',' + this.image + ',' 
        + this.desc + ',' + this.eventDate + ',' + this.timestamp;
    }
}

// Firestore data converter
const eventConverter = {
    toFirestore: (EventDetails:EventDetails) => {
        return {
            name: EventDetails.name,
            attendanceCode: EventDetails.attendanceCode,
            image: EventDetails.image
        };
    },
    fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return new EventDetails(
            data.name, 
            data.attendanceCode, 
            data.image,
            data.desc,
            data.eventDate,
            data.timestamp
            );
    }
};

export default eventConverter;