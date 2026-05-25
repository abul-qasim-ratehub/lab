export async function GET(req) {
  const product = req.nextUrl.searchParams.get('product');
  console.log('[API] GET /profile/pre-fill?product=' + product);

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

    const preFillData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@ratehub.ca',
      phone: '416-555-0123',
      propertyValue: 550000,
      mortgage: 400000,
      product,
    };

    console.log('[API] Returning pre-fill data for', product);
    return new Response(JSON.stringify(preFillData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API] Pre-fill error:', error);
    return new Response(JSON.stringify({ error: 'Pre-fill failed' }), { status: 500 });
  }
}
