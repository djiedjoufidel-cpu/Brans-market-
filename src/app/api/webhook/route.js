import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import crypto from 'crypto';

export async function POST(request) {
  const body = await request.json();

  // 1. Vérif signature CinetPay
  const token = crypto.createHash('sha256').update(
    body.cpm_site_id + body.cpm_trans_id + body.cpm_trans_date + body.cpm_amount + body.cpm_currency + process.env.CINETPAY_SECRET_KEY
  ).digest('hex');

  if (token!== body.signature) {
    return new Response('Signature invalide', { status: 401 });
  }

  // 2. Anti double traitement
  const transRef = doc(db, 'transactions', body.cpm_trans_id);
  const transSnap = await getDoc(transRef);
  if (transSnap.exists()) {
    return new Response('Déjà traité', { status: 200 });
  }

  if (body.cpm_result === '00') {
    const [type, userId, extra] = body.cpm_custom.split('_');

    if (type === 'sub') {
      await updateDoc(doc(db, 'users', userId), {
        plan: 'pro',
        planEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
    }

    if (type === 'product') {
      await addDoc(collection(db, 'sales'), {
        userId: extra,
        buyerId: userId,
        productId: body.cpm_custom.split('_')[3],
        amount: parseInt(body.cpm_amount),
        createdAt: serverTimestamp()
      });
    }

    await setDoc(transRef, {...body, processedAt: serverTimestamp() });
  }

  return new Response('OK', { status: 200 });
}
