// Cloudflare Pages Function — proxies order to Telegram
// Secrets set in Cloudflare dashboard: TG_TOKEN, TG_CHAT_ID
export async function onRequestPost(context) {
  const { env, request } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return new Response(JSON.stringify({ ok: false, error: 'missing text' }), {
        status: 400, headers: corsHeaders
      });
    }

    const TG_TOKEN   = env.TG_TOKEN;
    const TG_CHAT_ID = env.TG_CHAT_ID;

    if (!TG_TOKEN || !TG_CHAT_ID) {
      return new Response(JSON.stringify({ ok: false, error: 'bot not configured' }), {
        status: 500, headers: corsHeaders
      });
    }

    const BASE = `https://api.telegram.org/bot${TG_TOKEN}`;

    // Step 1: send placeholder to reserve order number
    const placeholderRes = await fetch(`${BASE}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: '⏳' }),
    });

    const placeholderData = await placeholderRes.json();
    if (!placeholderData.ok) {
      return new Response(JSON.stringify({ ok: false, error: 'telegram error', detail: placeholderData }), {
        status: 502, headers: corsHeaders
      });
    }

    const msgId = placeholderData.result.message_id;

    // Step 2: edit with real content
    await fetch(`${BASE}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, message_id: msgId, text }),
    });

    return new Response(JSON.stringify({ ok: true, message_id: msgId }), {
      status: 200, headers: corsHeaders
    });

  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500, headers: corsHeaders
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
