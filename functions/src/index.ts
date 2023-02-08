import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    db.collection("users")
      .doc(user.uid)
      .set(JSON.parse(JSON.stringify(user)));
  });

exports.scheduledFirestoreDelete = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("EST")
  .onRun(async () => {
    const collectionRef = db.collection("trending");

    return collectionRef.get().then((snapshot) => {
      const batch = db.batch();
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    });
  });
