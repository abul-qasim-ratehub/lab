export async function POST(req) {
  console.log('[API] POST /applications');

  try {
    const body = await req.json();
    console.log('[API] Application logged:', body);

    const cookieHeader = req.headers.get('cookie') || '';
    const sessionId = cookieHeader
      .split('; ')
      .find((row) => row.startsWith('sessionId='))
      ?.split('=')[1];

    if (!sessionId) {
      console.log('[API] No session, returning 401');
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    const application = {
      id: `app_${Date.now()}`,
      productType: body.productType,
      status: body.status,
      lender: body.lender,
      createdAt: new Date().toISOString(),
    };

    console.log('[API] Application created:', application.id);
    return new Response(JSON.stringify(application), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API] Application error:', error);
    return new Response(JSON.stringify({ error: 'Application logging failed' }), { status: 500 });
  }
}

export async function GET(req) {
  console.log('[API] GET /applications');

  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const sessionId = cookieHeader
      .split('; ')
      .find((row) => row.startsWith('sessionId='))
      ?.split('=')[1];

    if (!sessionId) {
      console.log('[API] No session, returning 401');
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    const applications = [
      {
        id: 'app_1',
        productType: 'mortgage',
        status: 'started',
        lender: 'RBC',
        createdAt: '2026-05-01T10:00:00Z',
      },
    ];

    console.log('[API] Returning applications');
    return new Response(JSON.stringify(applications), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API] Applications fetch error:', error);
    return new Response(JSON.stringify({ error: 'Applications fetch failed' }), { status: 500 });
  }
}
