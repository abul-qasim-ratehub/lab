export async function GET(req) {
  console.log('[API] GET /auth/me');

  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const sessionId = cookieHeader
      .split('; ')
      .find((row) => row.startsWith('sessionId='))
      ?.split('=')[1];

    console.log('[API] Session ID from cookie:', sessionId);

    if (!sessionId) {
      console.log('[API] No session ID found');
      return new Response(
        JSON.stringify({
          authenticated: false,
          user: null,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[API] Session found, returning user data');
    return new Response(
      JSON.stringify({
        authenticated: true,
        user: {
          id: 'test-user-123',
          email: 'test@ratehub.ca',
          firstName: 'Test',
          lastName: 'User',
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[API] /auth/me error:', error);
    return new Response(
      JSON.stringify({ authenticated: false, user: null }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
