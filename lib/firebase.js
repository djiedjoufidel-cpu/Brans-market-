import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { getAuth, signInAnonymously } from 'firebase/auth'

// Ton config Firebase Brans-market
const firebaseConfig = {
  apiKey: "AIzaSyAnh9sO-g52xpfLbIY2f329OoYbZnW3xM8",
  authDomain: "brans-market.firebaseapp.com",
  projectId: "brans-market",
  storageBucket: "brans-market.firebasestorage.app",
  messagingSenderId: "764644444128",
  appId: "1:764644444128:web:061059bf6582b7ddc20d85",
  measurementId: "G-FRLEDHPWS2"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export const initAuth = async () => {
  try {
    await signInAnonymously(auth)
    return auth.currentUser
  } catch (error) {
    console.error("Auth error:", error)
    return { uid: 'guest_' + Date.now() }
  }
}

export const saveCommande = async (commandeData) => {
  const docRef = await addDoc(collection(db, "commandes"), {
   ...commandeData,
    createdAt: new Date().toISOString(),
    status: 'En cours'
  })
  return docRef.id
}

export const listenToCommandes = (userId, callback) => {
  const q = query(
    collection(db, "commandes"),
    where("client.userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  return onSnapshot(q, (snapshot) => {
    const commandes = snapshot.docs.map(doc => ({ id: doc.id,...doc.data() }))
    callback(commandes)
  })
}
