import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/functions'
import store from './store'

// firebase init goes here
const config = {
    apiKey: "AIzaSyAwl1kaqGItRqbHIpdDc_k9kPHpdQHDqSQ",
    authDomain: process.env.VUE_APP_authDomain,
    databaseURL: process.env.VUE_APP_databaseURL,
    projectId: "archimood-c4cc2",
    storageBucket: process.env.VUE_APP_storageBucket,
    messagingSenderId: process.env.VUE_APP_FmessagingSenderId,
    appId: process.env.VUE_APP_appId,
    measurementId: process.env.VUE_APP_measurementId
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const currentUser = auth.currentUser

// date issue fix according to firebase
/*const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)
*/
// firebase collections
const usersCollection = db.collection('users')
const projectsCollection = db.collection('projects')

const functions = {
     testFunction: function() {
         console.log('fb function working')
     },
     logOut: function() {
        auth.signOut()
        .then(function() {
          location.replace('/')
        })
        .catch(function(error) {
          window.alert('Logout failed. Please refresh the page and try again.');
          console.log('Logout error: ', error)
        });
     },
     setDocumentDataWithMerge: function(collection, document, data) {
        let ref = db.collection(collection).doc(document);
  
        ref.set({data}, { merge: true })
        .then(function() {
            console.log(`${document} successfully written!`);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      },
      setDocumentDataWithAutoId: function(collection, data) {
        let ref = db.collection(collection);
  
        ref.add(data)
        .then(function() {
            console.log(`${collection} successfully written!`);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      },
      initialFetch: function() {

        this.fetchOwnUser();
        this.fetchOwnProjects();
        console.log('initial fetch');

      },
      fetchOwnUser: function() {
        let uid = store.getters.getUid;
        usersCollection.doc(uid)
            .onSnapshot(function(snapshot) {
                console.log(snapshot);
                let ownUser =snapshot.data();
                ownUser.uid = snapshot.id;
                store.dispatch('setCurrentUser', ownUser);
            },
            function(error) {
                console.log('error while loading initial data: ', error)
            });
      },
      fetchOwnProjects: function() {
        let uid = store.getters.getUid;

        projectsCollection.where("projectClient", "==", uid)
            .onSnapshot(function(querySnapshot) {
                let projects = [];
                console.log(querySnapshot);
                querySnapshot.docs.forEach(snapshot => {
                    let projectSnap = snapshot.data();
                    projectSnap.projectId = snapshot.id;
                    projects.push(projectSnap);
                })
                store.dispatch('setProjects', projects);
                projects = [];
            },
            
            function(error) {
                console.log('error while loading initial data: ', error)
            });
      }

}



export {
    db,
    auth,
    storage,
    functions,
    currentUser,
    usersCollection,
    projectsCollection,
}