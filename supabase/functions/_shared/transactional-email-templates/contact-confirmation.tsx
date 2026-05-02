import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'THRIFT 56'

interface Props {
  name?: string
  message?: string
}

const ContactConfirmationEmail = ({ name, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We got your message — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={kicker}>FOUND. TRANSFORMED. RELEASED.</Text>
        <Heading style={h1}>
          {name ? `Thanks, ${name}.` : 'Thanks for reaching out.'}
        </Heading>
        <Text style={text}>
          Your message landed in the studio. We read every one — expect a
          reply soon.
        </Text>
        {message && (
          <Section style={quoteBox}>
            <Text style={quoteLabel}>YOU WROTE</Text>
            <Text style={quoteText}>{message}</Text>
          </Section>
        )}
        <Text style={signoff}>— The {SITE_NAME} crew</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'We got your message — THRIFT 56',
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane', message: 'Love the latest drop!' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const kicker = { fontFamily: 'Arial, sans-serif', fontSize: '11px', letterSpacing: '0.18em', color: '#9a3412', margin: '0 0 12px', fontWeight: 700 }
const h1 = { fontFamily: 'Arial Black, Arial, sans-serif', fontSize: '32px', fontWeight: 900, color: '#0c0a09', letterSpacing: '-0.02em', margin: '0 0 16px', textTransform: 'uppercase' as const }
const text = { fontSize: '15px', color: '#44403c', lineHeight: '1.6', margin: '0 0 20px' }
const quoteBox = { borderLeft: '3px solid #9a3412', backgroundColor: '#F9F6F0', padding: '14px 18px', margin: '20px 0' }
const quoteLabel = { fontFamily: 'Arial, sans-serif', fontSize: '10px', letterSpacing: '0.18em', color: '#78716c', margin: '0 0 6px', fontWeight: 700 }
const quoteText = { fontStyle: 'italic' as const, fontSize: '14px', color: '#1c1917', lineHeight: '1.5', margin: 0 }
const signoff = { fontSize: '13px', color: '#78716c', margin: '28px 0 0' }
