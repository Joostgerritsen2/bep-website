import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message, source, systems, challenge, plan, score, phone, preference } = body

    // Showcase/score leads only require name + email (no message)
    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (source !== 'integration-showcase' && source !== 'data-silo-score' && source !== 'chat-widget' && !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'info@bep.expert'

    if (resendKey && resendKey !== 'your_resend_api_key') {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      if (source === 'data-silo-score') {
        // Lead from Data Silo Score assessment
        const systemCount = systems ? systems.split(',').length : 0
        await resend.emails.send({
          from: 'BEP Website <noreply@bep.expert>',
          to: contactEmail,
          subject: `Data Silo Score ${score}/100: ${name}${company ? ` (${company})` : ''} — gesprek aangevraagd`,
          html: `
            <h2>Nieuw lead via Data Silo Score</h2>
            <div style="background:#F5861D;color:white;padding:24px;text-align:center;border-radius:8px;margin-bottom:24px;">
              <div style="font-size:48px;font-weight:bold;">${score}/100</div>
              <div style="font-size:14px;opacity:0.9;">Data Silo Score</div>
            </div>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefoon:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Bedrijf:</strong> ${company}</p>` : ''}
            ${preference ? `<p><strong>Voorkeur moment:</strong> ${preference}</p>` : ''}
            <hr>
            <h3>Geselecteerde systemen (${systemCount})</h3>
            <p>${systems || '(geen)'}</p>
            <h3>Assessment antwoorden</h3>
            <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;">${message || ''}</div>
          `,
        })
      } else if (source === 'integration-showcase') {
        // Legacy: Lead from integration showcase with AI plan
        const systemCount = systems ? systems.split(',').length : 0
        await resend.emails.send({
          from: 'BEP Website <noreply@bep.expert>',
          to: contactEmail,
          subject: `Nieuw BEP plan: ${name}${company ? ` (${company})` : ''} — ${systemCount} systemen`,
          html: `
            <h2>Nieuw lead via BEP Plan Generator</h2>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Bedrijf:</strong> ${company}</p>` : ''}
            <hr>
            <h3>Geselecteerde systemen</h3>
            <p>${systems || '(geen)'}</p>
            ${challenge ? `<h3>Uitdaging</h3><p>${challenge}</p>` : ''}
            <h3>Gegenereerd plan</h3>
            <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;">${plan || '(geen plan)'}</div>
          `,
        })
      } else if (source === 'chat-widget') {
        // Chat widget message
        await resend.emails.send({
          from: 'BEP Website <noreply@bep.expert>',
          to: contactEmail,
          subject: `💬 Chat bericht: ${name}`,
          html: `
            <h2>Nieuw chatbericht via bep.expert</h2>
            <div style="background:#F5861D;color:white;padding:16px 24px;border-radius:8px;margin-bottom:24px;">
              <div style="font-size:14px;font-weight:bold;">💬 Live Chat</div>
            </div>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Bericht:</strong></p>
            <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;color:#333;">${message}</div>
            <br>
            <p style="color:#666;font-size:13px;">Beantwoord direct via e-mail of WhatsApp.</p>
          `,
        })
      } else {
        // Regular contact form
        await resend.emails.send({
          from: 'BEP Website <noreply@bep.expert>',
          to: contactEmail,
          subject: `Nieuw contactformulier: ${name}${company ? ` (${company})` : ''}`,
          html: `
            <h2>Nieuw bericht via bep.expert</h2>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Bedrijf:</strong> ${company}</p>` : ''}
            <p><strong>Bericht:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
