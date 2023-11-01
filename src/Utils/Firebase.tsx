import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp, getApps, getApp} from 'firebase/app';
import {DocumentData, collection, getFirestore, onSnapshot, query, where} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';

import Authentication from './Authentication';

const firebaseConfigProduction = {
  apiKey: Authentication.API_KEY_FIREBASE,
  authDomain: Authentication.AUTH_DOMAIN_FIREBASE,
  projectId: Authentication.PROJECT_ID_FIREBASE,
  storageBucket: Authentication.STORAGE_BUCKETS_FIREBASE,
  messagingSenderId: Authentication.MESSAGING_SENDER_ID,
  appId: Authentication.APP_ID,
  measurementId: Authentication.MEASUREMENT_ID,
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfigProduction);
} else {
  firebaseApp = getApp();
}

const db = getFirestore();

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage(firebaseApp);

const uploadNewImage = (uri: string, name: string): Promise<string | null> => {
  return fetch(uri)
    .then(fetchImage => fetchImage.blob())
    .then(currentBlob => {
      console.log(currentBlob)
      const imageRef = ref(storage, `ProfilePictures/${name}`);
      const uploadTask = uploadBytesResumable(imageRef, currentBlob);

      return new Promise<string | null>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            console.error(error);
            reject(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(downloadURL => {
                console.log('File available at', downloadURL);
                resolve(downloadURL);
              })
              .catch(error => {
                console.error('Error getting download URL:', error);
                reject(null);
              });
          },
        );
      });
    })
    .catch(error => {
      console.error('Error fetching image or creating blob:', error);
      return null;
    });
};

const grabProfile = (userId: string) => {
  const collectionRef = collection(db, 'Profiles');
  const q = query(collectionRef, where('userId', '==', userId));

  return new Promise((resolve, reject) => {
    onSnapshot(q, snapshot => {
      const profiles = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data() as DocumentData;
        profiles.push({...data, id: doc.id});
      });
      console.log(profiles.length);
      if (profiles.length > 0) {
        resolve(profiles[0]);
      } else {
        reject("Profile not found");
      }
    });
  });
};

const checkForValidUsername = (username: string): Promise<boolean | null> => {
  const collectionRef = collection(db, 'Profiles');
  const q = query(collectionRef, where('username', '==', username));

  return new Promise((resolve, reject) => {
    onSnapshot(q, snapshot => {
      const profiles = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data() as DocumentData;
        profiles.push({...data, id: doc.id});
      });

      if (profiles.length > 0) {
        resolve(false); // if there is profile, it will return false
      } else {
        resolve(true); // if there is no profile, it will return true
      }
    });
  });
};

export {
  db,
  auth,
  firebaseApp,
  storage,
  uploadNewImage,
  grabProfile,
  checkForValidUsername,
};
