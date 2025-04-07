export async function POST(req) {
  try {
    const { userId, symbol, companyName, latestPrice, idToken } = await req.json();
    console.log('✅ Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL);


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ userId, symbol, companyName, latestPrice }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Next.js API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to save stock' }), {
      status: 500,
    });
  }
}
