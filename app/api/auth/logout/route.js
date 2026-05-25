export async function POST(req) {
  console.log('[API] POST /auth/logout');

  try {
    const response = new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'sessionId=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
        },
      }
    );

    console.log('[API] Logout successful, session cleared');
    return response;
  } catch (error) {
    console.error('[API] Logout error:', error);
    return new Response(JSON.stringify({ error: 'Logout failed' }), { status: 500 });
  }
}
