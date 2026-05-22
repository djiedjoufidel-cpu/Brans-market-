import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  const { phone, amount, userId } = await request.json();
  const externalId = uuidv4();
  
  const momoRes = await fetch('https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MOMO_ACCESS_TOKEN}`,
      'X-Reference-Id': externalId,
      'X-Target-Environment': 'sandbox',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY
    },
    body: JSON.stringify({
      amount: "10", // 10 EUR en sandbox = ~6500 FCFA
      currency: 'EUR',
      externalId: externalId,
      payer: { partyIdType: 'MSISDN', partyId: phone },
      payerMessage: 'Abonnement Pro Brans Market',
      payeeNote: `User: ${userId}`
    })
  });

  if (momoRes.status === 202) {
    return NextResponse.json({ success: true, externalId });
  } else {
    const error = await momoRes.text();
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
