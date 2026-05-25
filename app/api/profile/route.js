export async function PATCH(req) {
  console.log('[API] PATCH /profile');

  try {
    const body = await req.json();
    console.log('[API] Profile update:', body);

    const cookieHeader = req.headers.get('cookie') || '';
    const sessionId = cookieHeader
      .split('; ')
      .find((row) => row.startsWith('sessionId='))
      ?.split('=')[1];

    if (!sessionId) {
      console.log('[API] No session, returning 401');
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    const updatedUser = {
      id: 'test-user-123',
      email: body.email || 'test@ratehub.ca',
      first_name: body.firstName || 'Test',
      last_name: body.lastName || 'User',
      phone: body.phone || '416-555-0123',
    };

    console.log('[API] Profile updated successfully');
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API] Profile update error:', error);
    return new Response(JSON.stringify({ error: 'Profile update failed' }), { status: 500 });
  }
}

export async function GET(req) {
  console.log('[API] GET /profile');

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

    const profile = {
      id: 'test-user-123',
      email: 'test@ratehub.ca',
      first_name: 'Test',
      last_name: 'User',
      phone: '416-555-0123',
    };

    console.log('[API] Returning profile');
    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API] Profile fetch error:', error);
    return new Response(JSON.stringify({ error: 'Profile fetch failed' }), { status: 500 });
  }
}
