import { useState } from 'react'
import { ArrowRight, Check, CreditCard, ExternalLink, MessageCircle, ShieldCheck } from 'lucide-react'
import { websitePricing } from '../data'

const phoneNumber = '08120996497'
const whatsappNumber = '2348120996497'
const transactionStorageKey = 'ideavision-test-transactions'

function formatUsd(amount) {
  return `$${amount.toLocaleString('en-US')}`
}

function readTransactions() {
  try {
    const saved = localStorage.getItem(transactionStorageKey)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function createTestTransaction({ stage, amount, name, message, method }) {
  const createdAt = new Date()
  return {
    reference: `IVF-TEST-${createdAt.getTime().toString().slice(-8)}`,
    stage,
    amount,
    name,
    message,
    method,
    status: 'TEST ONLY - NOT PAID',
    createdAt: createdAt.toISOString(),
  }
}

export default function Pricing() {
  const [selectedId, setSelectedId] = useState(websitePricing[0].id)
  const [transactions, setTransactions] = useState(readTransactions)
  const [latestTransaction, setLatestTransaction] = useState(() => transactions[0] || null)
  const selectedPrice = websitePricing.find((stage) => stage.id === selectedId) || websitePricing[0]

  const runTestTransaction = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name')).trim()
    const message = String(form.get('message')).trim()
    const method = String(form.get('method'))
    const transaction = createTestTransaction({ stage: selectedPrice.title, amount: selectedPrice.amount, name, message, method })
    const nextTransactions = [transaction, ...transactions].slice(0, 20)
    localStorage.setItem(transactionStorageKey, JSON.stringify(nextTransactions))
    setTransactions(nextTransactions)
    setLatestTransaction(transaction)
  }

  const testMessage = latestTransaction && `Hi IdeaVision Forge, I just tried the demo payment for ${latestTransaction.stage} (${formatUsd(latestTransaction.amount)}). Test reference: ${latestTransaction.reference}. This was a test only; no payment was made.${latestTransaction.message ? ` Note: ${latestTransaction.message}` : ''}`
  const messageLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(testMessage || `Hi IdeaVision Forge, I would like to ask about a website quote. My phone number is ${phoneNumber}.`)}`

  return (
    <>
      <div className="page-heading pricing-heading">
        <div><p className="eyebrow">CLEAR STEPS, CLEAR COSTS</p><h1>Website pricing, stage by stage.</h1><p className="page-description">A transparent starting estimate for a simple, responsive five-page business website. Confirm the final scope and quote before starting.</p></div>
        <a className="button button-outline" href={`tel:${phoneNumber}`}><MessageCircle size={16} /> Call {phoneNumber}</a>
      </div>

      <section className="price-overview"><div><span className="price-kicker">INDICATIVE PROJECT TOTAL · USD</span><strong>{formatUsd(websitePricing.reduce((sum, stage) => sum + stage.amount, 0))}</strong><p>Pay by stage after agreeing the deliverable. No payment is due from this preview.</p></div><div className="price-scope"><ShieldCheck size={19} /><p><strong>What this estimate assumes</strong><span>Up to five standard pages, a responsive layout, and a basic contact section. Domain, hosting, copywriting, e-commerce, and custom backend work are quoted separately.</span></p></div></section>

      <section className="pricing-layout">
        <div className="pricing-stage-column"><div className="pricing-section-heading"><div><p className="eyebrow">THE SIX PROJECT STAGES</p><h2>Choose a deliverable to test</h2></div><span>USD · $</span></div><div className="price-stage-list">{websitePricing.map((stage) => <button type="button" className={`price-stage ${selectedId === stage.id ? 'price-stage-selected' : ''}`} key={stage.id} onClick={() => { setSelectedId(stage.id); setLatestTransaction(null) }} aria-pressed={selectedId === stage.id}><span className="price-stage-number">{stage.stage}</span><span className="price-stage-copy"><strong>{stage.title}</strong><small>{stage.detail}</small></span><strong className="price-stage-amount">{formatUsd(stage.amount)}</strong><span className="price-stage-check">{selectedId === stage.id && <Check size={14} />}</span></button>)}</div><p className="estimate-caveat">These are suggested starting rates, not a binding offer. A written scope and final quote should be agreed before any real work or payment.</p></div>

        <aside className="test-payment-panel"><div className="test-payment-heading"><span><CreditCard size={18} /></span><div><p className="eyebrow">SAFE INTERACTION PREVIEW</p><h2>Run a fake transaction</h2></div></div><div className="selected-charge"><span>SELECTED STAGE</span><strong>{selectedPrice.title}</strong><b>{formatUsd(selectedPrice.amount)}</b></div><div className="demo-warning"><ShieldCheck size={16} /><p><strong>TEST MODE ONLY</strong><span>No card or bank details are collected. This does not charge money or mark a real invoice as paid.</span></p></div><form className="demo-payment-form" onSubmit={runTestTransaction}><label className="field-label">Test name<input name="name" required placeholder="e.g. Demo Customer" /></label><label className="field-label">Payment method<select name="method"><option>Simulated bank transfer</option><option>Simulated card payment</option></select></label><label className="field-label">Message for the quote (optional)<textarea name="message" rows="3" placeholder="e.g. Please contact me about the five-page package." /></label><button className="button button-primary" type="submit">Simulate test payment <ArrowRight size={16} /></button></form>
          {latestTransaction && <section className="test-receipt" aria-live="polite"><div className="receipt-status"><Check size={14} /> TEST RECEIPT · NOT PAID</div><h3>{formatUsd(latestTransaction.amount)} <span>demo</span></h3><p>{latestTransaction.stage} · {latestTransaction.name}</p><code>{latestTransaction.reference}</code>{latestTransaction.message && <blockquote>“{latestTransaction.message}”</blockquote>}<a className="button button-whatsapp" href={messageLink} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Open pre-filled WhatsApp message <ExternalLink size={14} /></a></section>}
        </aside>
      </section>

      <section className="transaction-history"><div className="pricing-section-heading"><div><p className="eyebrow">THIS DEVICE ONLY</p><h2>Demo transaction history</h2></div><span>{transactions.length} saved</span></div>{transactions.length ? <div className="transaction-list">{transactions.map((transaction) => <article className="transaction-row" key={transaction.reference}><span className="transaction-mark"><Check size={15} /></span><span className="transaction-copy"><strong>{transaction.stage} · {transaction.name}</strong><small>{transaction.reference} · {new Date(transaction.createdAt).toLocaleString()}</small></span><strong className="transaction-amount">{formatUsd(transaction.amount)}</strong><span className="transaction-demo-tag">TEST ONLY</span></article>)}</div> : <p className="transaction-empty">No demo transactions yet. Select a stage above and run a test to see a sample receipt here.</p>}</section>

      <section className="database-note"><div><p className="eyebrow">WHEN YOU ARE READY TO STORE REAL DATA</p><h2>Browser storage is only for this preview.</h2><p>For real accounts and project records, create a Supabase PostgreSQL project and apply <strong>supabase/schema.sql</strong>. Keep row-level security enabled. A real payment provider must confirm payments through a server-side webhook; never store card numbers or secret keys in this website.</p></div><a className="button button-outline" href={messageLink} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Ask about setup</a></section>
      <div className="pricing-contact-line"><span>Questions about scope, price, or database setup?</span><a href={`tel:${phoneNumber}`}>Call {phoneNumber}</a><a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi IdeaVision Forge, I have a question about the website stages and quote.')}`} target="_blank" rel="noreferrer">WhatsApp <ExternalLink size={13} /></a></div>
    </>
  )
}