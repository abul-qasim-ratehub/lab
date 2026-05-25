export async function GET(req) {
  console.log('[API] GET /auth/login');

  try {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    const response = new Response(
      JSON.stringify({
        success: true,
        sessionId,
        authenticated: true,
        user: {
          id: 'test-user-123',
          email: 'test@ratehub.ca',
          firstName: 'Test',
          lastName: 'User',
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
        },
      }
    );

    console.log('[API] Login successful, sessionId:', sessionId);
    return response;
  } catch (error) {
    console.error('[API] Login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
  }
}
