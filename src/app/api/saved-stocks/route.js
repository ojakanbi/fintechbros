export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('userId');
      const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
      console.log('✅ Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

  
      if (!userId || !idToken) {
        return new Response(JSON.stringify({ error: 'Missing userId or token' }), {
          status: 400,
        });
      }
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stocks/user/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
  
      const data = await res.json();
  
      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('❌ Error in Next.js API:', err);
      return new Response(JSON.stringify({ error: 'Failed to fetch saved stocks' }), {
        status: 500,
      });
    }
  }
  