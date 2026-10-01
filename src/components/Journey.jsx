import { Check } from 'lucide-react'
import { stages } from '../data'

export default function Journey({ stageIndex, onSelect, compact = false }) {
  return (
    <div className={`journey ${compact ? 'journey-compact' : ''}`} aria-label="Project journey">
      {stages.map((stage, index) => {
        const complete = index < stageIndex
        const current = index === stageIndex
        return (
          <button
            className={`journey-step ${complete ? 'is-complete' : ''} ${current ? 'is-current' : ''}`}
            type="button"
            key={stage.id}
            onClick={() => onSelect?.(stage, index)}
            aria-current={current ? 'step' : undefined}
            aria-label={`Stage ${stage.number}: ${stage.name}${complete ? ', complete' : current ? ', current stage' : ''}`}
          >
            <span className="journey-dot">{complete ? <Check size={14} strokeWidth={2.5} /> : stage.number}</span>
            <span className="journey-copy">
              <strong>{stage.name}</strong>
              {!compact && <small>{stage.short}</small>}
            </span>
            {index < stages.length - 1 && <span className="journey-connector" aria-hidden="true" />}
          </button>
        )
      })}
    </div>
  )
}
