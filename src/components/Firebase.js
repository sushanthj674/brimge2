// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { username } from './LandingForm';
import { getDatabase, ref, push, onChildAdded,remove } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBu_bGHqaivuF-PftTVZ5nBHPJWbtbOabg",
    authDomain: "brimge-42fb4.firebaseapp.com",
    databaseURL: "https://brimge-42fb4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "brimge-42fb4",
    storageBucket: "brimge-42fb4.appspot.com",
    messagingSenderId: "1010479699025",
    appId: "1:1010479699025:web:5b38fca266a2bb6027d470",
    measurementId: "G-8DSYYXRV7H"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase real-time database
const database = getDatabase(app);
const messagesRef = ref(database, 'messages');

// Function to push a message to Firebase real-time database
export async function pushMessage(message) {
   

    // Get a reference to the 'messages' path in the database
    var messagesRef = ref(database, 'messages');
    // Push the message to the database
    try {  

        function getCurrentTime12hr() {
            const currentTime = new Date();
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
          
            // Convert hours to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // 12-hour clock: '0' should be '12'
            
            // Add leading zero to minutes if needed
            minutes = minutes < 10 ? '0' + minutes : minutes;
          
            // Construct the time string
            const timeString = hours + ':' + minutes + ' ' + ampm;
            
            return timeString;
          }
           
        var newMessageRef = await push(messagesRef, {
            message: message,
            now:getCurrentTime12hr(),
            timestamp: Date.now(),
            user:username==null ?window.location.href="http://192.168.1.8:3000":username
        });
        return newMessageRef;
    } catch (error) {
        console.error('Error pushing message:', error);
        throw error; // Rethrow the error for further handling
    }
}

// Function to listen for newly added data at a specified path in Firebase real-time database
export function listenForNewData(callback) {
    // Get a reference to the specified path in the database
    const dataRef = ref(database, 'messages');

    // Listen for new child nodes added to the specified path
    onChildAdded(dataRef, (snapshot) => {
        // Get the newly inserted data
        const newData = snapshot.val();

        // Call the provided callback function with the newly inserted data
        if (callback) {
            callback(newData);
        }
    }, (error) => {
        console.error('Error listening for new data:', error);
    });
}

export async function storeUser(user) {
    // Reference to the 'users' path in the database
    const useref = ref(database, 'users');

    try {
        const newUserRef = await push(useref, {
            username: user
        });
        console.log("User pushed successfully:", newUserRef);
        return newUserRef;
    } catch (error) {
        console.error('Error pushing user:', error);
        throw error; 
    }
}

export function DelectChat(){
    remove(messagesRef);
     
}