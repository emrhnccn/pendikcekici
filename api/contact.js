const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST istekleri kabul edilir.' });
  }

  const { isim, email, telefon, konu, mesaj } = req.body;

  if (!isim || !email || !telefon || !konu || !mesaj) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
  }

  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'pendikcekici@gmail.com',
    subject: `Web Sitesi İletişim: ${konu}`,
    text: `İsim: ${isim}\nE-mail: ${email}\nTelefon: ${telefon}\nKonu: ${konu}\nMesaj: ${mesaj}`,
    html: `<b>İsim:</b> ${isim}<br><b>E-mail:</b> ${email}<br><b>Telefon:</b> ${telefon}<br><b>Konu:</b> ${konu}<br><b>Mesaj:</b> ${mesaj}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Mail gönderilemedi.' });
  }
}; 