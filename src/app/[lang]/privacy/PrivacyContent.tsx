'use client'
import { useLang } from '@/lib/language'

export function PrivacyContent() {
  const { t } = useLang()

  return (
    <div className="privacy-content">
      <div className="container-narrow">
        <h1>Privacy Policy</h1>

        <p>
          {t(
            'Deze privacy policy is van toepassing op de website bep.expert en alle diensten van BEP.',
            'This privacy policy applies to the website bep.expert and all services of BEP.'
          )}
        </p>

        <h2>{t('Welke gegevens verzamelen we?', 'What data do we collect?')}</h2>
        <p>
          {t(
            'We verzamelen gegevens die je zelf aan ons verstrekt via het contactformulier of de Data Scan: naam, e-mailadres, bedrijfsnaam en je antwoorden op de Data Scan vragen.',
            'We collect data that you provide to us through the contact form or Data Scan: name, email address, company name and your answers to the Data Scan questions.'
          )}
        </p>

        <h2>{t('Hoe gebruiken we je gegevens?', 'How do we use your data?')}</h2>
        <ul>
          <li>{t('Om contact met je op te nemen naar aanleiding van je vraag of aanvraag', 'To contact you regarding your question or request')}</li>
          <li>{t('Om je een persoonlijk Data Scan rapport te sturen', 'To send you a personal Data Scan report')}</li>
          <li>{t('Om onze website en dienstverlening te verbeteren', 'To improve our website and services')}</li>
        </ul>

        <h2>{t('Cookies', 'Cookies')}</h2>
        <p>
          {t(
            'We gebruiken functionele cookies om de website goed te laten werken en analytische cookies om het gebruik van de website te begrijpen. Je kunt cookies weigeren via de cookiebanner.',
            'We use functional cookies to make the website work properly and analytical cookies to understand website usage. You can decline cookies via the cookie banner.'
          )}
        </p>

        <h2>{t('Je rechten', 'Your rights')}</h2>
        <p>
          {t(
            'Je hebt het recht om je gegevens in te zien, te corrigeren of te verwijderen. Neem contact op via info@bep.expert.',
            'You have the right to access, correct or delete your data. Contact us at info@bep.expert.'
          )}
        </p>

        <h2>Contact</h2>
        <p>
          {t(
            'Vragen over deze privacy policy? Neem contact op via ',
            'Questions about this privacy policy? Contact us at '
          )}
          <a href="mailto:info@bep.expert" style={{ color: '#F5861D' }}>info@bep.expert</a>
        </p>
      </div>
    </div>
  )
}
