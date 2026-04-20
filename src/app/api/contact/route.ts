import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message, source, systems, challenge, plan, score, phone, preference, date, time } = body

    // Showcase/score leads only require name + email (no message)
    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (source !== 'integration-showcase' && source !== 'data-silo-score' && source !== 'chat-widget' && source !== 'demo-booking' && !message) {
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
        // Format transcript lines with colour coding
        const transcriptHtml = (message || '')
          .split('\n\n')
          .map((line: string) => {
            if (line.startsWith('👤 Bezoeker:')) {
              const text = line.replace('👤 Bezoeker:', '').trim()
              return `<div style="margin-bottom:12px;">
                <div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:4px;">👤 Bezoeker</div>
                <div style="background:#fff;border:1px solid #e5e7eb;padding:10px 14px;color:#111;">${text}</div>
              </div>`
            }
            if (line.startsWith('🤖 BEP:')) {
              const text = line.replace('🤖 BEP:', '').trim()
              return `<div style="margin-bottom:12px;">
                <div style="font-size:11px;font-weight:700;color:#F5861D;text-transform:uppercase;margin-bottom:4px;">🤖 BEP</div>
                <div style="background:#FEF3E7;border:1px solid #F5861D33;padding:10px 14px;color:#333;">${text}</div>
              </div>`
            }
            return `<div style="color:#666;padding:8px 0;">${line}</div>`
          })
          .join('')

        await resend.emails.send({
          from: 'BEP Website <noreply@bep.expert>',
          to: contactEmail,
          subject: `💬 Nieuwe chat-lead: ${name} (${email})`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#0f1d2f;color:white;padding:20px 24px;margin-bottom:24px;">
                <div style="font-size:18px;font-weight:bold;">💬 Nieuwe lead via BEP chat</div>
              </div>

              <div style="background:#F5861D;color:white;padding:16px 24px;margin-bottom:24px;">
                <div style="font-size:22px;font-weight:bold;">${name}</div>
                <div style="font-size:15px;margin-top:4px;opacity:0.9;">${email}</div>
              </div>

              <h3 style="color:#0f1d2f;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;">Volledig gesprek</h3>
              <div style="border:1px solid #e5e7eb;padding:16px;">
                ${transcriptHtml || '<p style="color:#888;">Geen gesprekshistorie beschikbaar.</p>'}
              </div>

              <p style="color:#888;font-size:12px;margin-top:24px;">
                Beantwoord direct via <a href="mailto:${email}" style="color:#F5861D;">${email}</a>
              </p>
            </div>
          `,
        })
      } else if (source === 'demo-booking') {
        await resend.emails.send({
          from: 'BEP Website <noreply@bep.expert>',
          to: contactEmail,
          subject: `📅 Demo aanvraag: ${name}${company ? ` (${company})` : ''} — ${date} om ${time}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#0f1d2f;color:white;padding:20px 24px;margin-bottom:24px;">
                <div style="font-size:18px;font-weight:bold;">📅 Nieuwe demo aanvraag</div>
              </div>

              <div style="background:#F5861D;color:white;padding:20px 24px;margin-bottom:24px;text-align:center;">
                <div style="font-size:32px;font-weight:bold;">${date}</div>
                <div style="font-size:20px;margin-top:4px;opacity:0.9;">om ${time}</div>
              </div>

              <p><strong>Naam:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#F5861D;">${email}</a></p>
              ${phone ? `<p><strong>Telefoon:</strong> ${phone}</p>` : ''}
              ${company ? `<p><strong>Bedrijf:</strong> ${company}</p>` : ''}
              ${message ? `<hr><h3>Toelichting</h3><p style="white-space:pre-wrap;">${message}</p>` : ''}
            </div>
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
