export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('userId');
      const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
  
      if (!userId || !idToken) {
        return new Response(JSON.stringify({ error: 'Missing userId or token' }), {
          status: 400,
        });
      }
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stocks/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
  
      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await res.text(); // get the raw HTML
        console.error('❌ Backend did not return JSON:', text);
        return new Response(JSON.stringify({ error: 'Backend returned non-JSON response' }), {
          status: 502,
        });
      }
  
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
  