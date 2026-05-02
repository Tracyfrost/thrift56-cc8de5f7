import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  message?: string
}

const ContactNotificationEmail = ({ name, email, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact message from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={kicker}>NEW CONTACT MESSAGE</Text>
        <Heading style={h1}>{name || 'Anonymous'}</Heading>
        <Text style={meta}>{email}</Text>
        <Section style={quoteBox}>
          <Text style={quoteText}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (d: Record<string, any>) => `New contact: ${d.name || 'Anonymous'}`,
  to: 'hello@thrift56.com',
  displayName: 'Contact form notification (owner)',
  previewData: { name: 'Jane', email: 'jane@example.com', message: 'Love the latest drop!' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const kicker = { fontSize: '11px', letterSpacing: '0.18em', color: '#9a3412', margin: '0 0 12px', fontWeight: 700 }
const h1 = { fontFamily: 'Arial Black, Arial, sans-serif', fontSize: '28px', fontWeight: 900, color: '#0c0a09', letterSpacing: '-0.02em', margin: '0 0 6px', textTransform: 'uppercase' as const }
const meta = { fontSize: '13px', color: '#57534e', margin: '0 0 18px' }
const quoteBox = { borderLeft: '3px solid #9a3412', backgroundColor: '#F9F6F0', padding: '16px 18px', margin: '12px 0' }
const quoteText = { fontSize: '14px', color: '#1c1917', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' as const }
