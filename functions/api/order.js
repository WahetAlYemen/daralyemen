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
    const { orderData } = body;

    if (!orderData) {
      return new Response(JSON.stringify({ ok: false, error: 'missing orderData' }), {
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

    // Step 1: send placeholder to reserve sequential order number
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

    const msgId    = placeholderData.result.message_id;
    const orderNum = 9019 + msgId;

    // Step 2: build the full message with the real order number
    const { name, phone, address, isDelivery, items, total, currency, notes } = orderData;

    const itemLines = items.map(i => `  • ${i.qty}× ${i.name} — ${i.total} ${currency}`).join('\n');
    const orderTypeIcon = isDelivery ? '🛵 توصيل' : '🏪 استلام في المطعم';

    const fullMsg = [
      `📦 رقم الطلب: #${orderNum}`,
      '',
      orderTypeIcon,
      `👤 الاسم: ${name}`,
      `📞 الهاتف: ${phone}`,
      isDelivery ? `📍 العنوان: ${address}` : `📍 الاستلام: في المطعم`,
      '',
      `🧾 الطلب:`,
      itemLines,
      '',
      `💰 الإجمالي: ${total} ${currency}`,
      isDelivery ? `💵 الدفع: كاش عند التوصيل` : `💵 الدفع: كاش عند الاستلام`,
      notes ? `📝 ملاحظات: ${notes}` : ''
    ].filter(Boolean).join('\n');

    // Step 3: edit placeholder with real content
    await fetch(`${BASE}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, message_id: msgId, text: fullMsg }),
    });

    return new Response(JSON.stringify({ ok: true, message_id: msgId, orderNum }), {
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
