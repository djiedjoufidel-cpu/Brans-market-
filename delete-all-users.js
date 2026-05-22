const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

async function deleteAllUsers() {
  try {
    // 1. Auth users
    const listUsers = await auth.listUsers(1000);
    const uids = listUsers.users.map(u => u.uid);
    
    if (uids.length > 0) {
      await auth.deleteUsers(uids);
      console.log(`Auth: ${uids.length} comptes supprimés`);
    } else {
      console.log('Auth: aucun compte');
    }

    // 2. Firestore docs
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    
    if (!snapshot.empty) {
      const batch = db.batch();
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      console.log(`Firestore: ${snapshot.size} docs supprimés`);
    } else {
      console.log('Firestore: aucun doc');
    }
    
    console.log('✅ Tout est clean');
  } catch (err) {
    console.error('Erreur:', err.message);
  }
  process.exit(0);
}

deleteAllUsers();
