export const handler = async (event: { httpMethod: string; body: string | null }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let body: Record<string, string>
  try {
    body = JSON.parse(event.body ?? '{}')
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { name, email, phone, message } = body

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Champs requis manquants' }),
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const notificationEmail = process.env.NOTIFICATION_EMAIL

  if (!apiKey || !notificationEmail) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Configuration serveur incomplète' }),
    }
  }

  const htmlNotif = `
    <p><strong>Nom :</strong> ${name}</p>
    <p><strong>Téléphone :</strong> ${phone}</p>
    <p><strong>Email :</strong> ${email}</p>
    ${message ? `<p><strong>Message :</strong> ${message}</p>` : ''}
  `

  const htmlConfirm = `
    <p>Bonjour ${name},</p>
    <p>Merci pour votre demande de rendez-vous !</p>
    <p>Je vous recontacte dans les 24h pour confirmer votre créneau.</p>
    <br />
    <p>À très vite,</p>
    <p><strong>Sandrine</strong><br />Sandrine Coiffure — Béziers</p>
  `

  const post = (subject: string, to: string, html: string) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sandrine Coiffure <hello@sandrine-coiffure-beziers.fr>',
        to: [to],
        subject,
        html,
      }),
    })

  const [notifRes] = await Promise.all([
    post(`Nouvelle demande de RDV — ${name}`, notificationEmail, htmlNotif),
    post('Votre demande de rendez-vous — Sandrine Coiffure', email, htmlConfirm),
  ])

  if (!notifRes.ok) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Erreur envoi email' }) }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true }),
  }
}
