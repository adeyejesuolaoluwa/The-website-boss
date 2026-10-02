import { ArrowRight, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { websiteStages } from '../data'

const phoneNumber = '08120996497'
const whatsappNumber = '2348120996497'
const whatsappLink = `https://wa.me/${whatsappNumber}`

export default function Pricing() {
  return (
    <>
      <div className="page-heading pricing-heading">
        <div>
          <p className="eyebrow">NO UNCONFIRMED PRICES</p>
          <h1>Request a website quote.</h1>
          <p className="page-description">Share your project scope and get a price directly from IdeaVision Forge. No rate is published here until it has been confirmed.</p>
        </div>
        <a className="button button-outline" href={`tel:${phoneNumber}`}><Phone size={16} /> Call {phoneNumber}</a>
      </div>

      <section className="quote-contact-panel">
        <div className="quote-contact-copy"><span className="eyebrow">START WITH A REAL CONVERSATION</span><h2>Tell us what you want to build.</h2><p>Include your goals, page count, features, deadline, and any examples you can share. The final scope, stages, and price will be agreed with you before work or payment starts.</p></div>
        <a className="button button-primary quote-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Request a quote on WhatsApp <ArrowRight size={16} /></a>
      </section>

      <section className="quote-stages"><div className="pricing-section-heading"><div><p className="eyebrow">POSSIBLE PROJECT STAGES</p><h2>Scope is confirmed with you first</h2></div><span>NO FEES SHOWN</span></div><div className="price-stage-list">{websiteStages.map((stage) => <article className="price-stage quote-stage" key={stage.id}><span className="price-stage-number">{stage.stage}</span><span className="price-stage-copy"><strong>{stage.title}</strong><small>{stage.detail}</small></span></article>)}</div><p className="estimate-caveat">These are planning stages, not a fixed package or a promise of delivery. The agreed quote will depend on your actual requirements.</p></section>

      <section className="real-payment-note"><ShieldCheck size={19} /><div><strong>No online payment is set up on this website.</strong><p>Do not send payment details through this page. Payment arrangements must be agreed directly after you receive and approve a written quote.</p></div></section>

      <section className="database-note"><div><p className="eyebrow">PROJECT DATA</p><h2>The database plan is not connected yet.</h2><p>A Supabase schema is prepared at <strong>supabase/schema.sql</strong>, but no database account or connection has been configured. Read <strong>DATABASE.md</strong> for setup steps.</p></div><a className="button button-outline" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Ask about setup</a></section>
      <div className="pricing-contact-line"><span>Contact directly:</span><a href={`tel:${phoneNumber}`}>Call {phoneNumber}</a><a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp <ArrowRight size={13} /></a></div>
    </>
  )
}
