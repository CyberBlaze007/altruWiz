import { firestore } from "../firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";

function StreamConnection () {
    const userCol = collection(firestore, 'user'); 
    const eventOrgCol = collection(firestore, 'eventOrganizer');
    const eventsCol = collection(firestore, 'events');
    const ranksCol = collection(firestore, 'ranks');
    const achievementCol = collection(firestore, 'achievements');
    const badgesCol = collection(firestore, 'badges');

    //Function to Read
        //import converter functions here

    //Function to Update
        //import converter functions here

    //Function to Delete
        //import converter functions here
}

export default StreamConnection;