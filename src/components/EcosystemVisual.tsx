'use client'
import { useLang } from '@/lib/language'

export function EcosystemVisual() {
  const { t } = useLang()

  return (
    <div className="eco">
      {/* Layer 4: Humans */}
      <div className="eco-layer eco-layer-humans">
        <div className="eco-layer-label">{t('Mensen', 'Humans')}</div>
        <div className="eco-nodes">
          <div className="eco-node eco-node-human" style={{ animationDelay: '0s' }}>
            <span className="eco-node-icon">👤</span>
            <span className="eco-node-label">Review</span>
          </div>
          <div className="eco-node eco-node-human" style={{ animationDelay: '0.2s' }}>
            <span className="eco-node-icon">✓</span>
            <span className="eco-node-label">Approve</span>
          </div>
          <div className="eco-node eco-node-human" style={{ animationDelay: '0.4s' }}>
            <span className="eco-node-icon">⚡</span>
            <span className="eco-node-label">Escalate</span>
          </div>
        </div>
      </div>

      {/* Connection lines humans → agents */}
      <div className="eco-connectors">
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Layer 3: AI Agents */}
      <div className="eco-layer eco-layer-agents">
        <div className="eco-layer-label">AI Agents</div>
        <div className="eco-nodes">
          <div className="eco-node eco-node-agent" style={{ animationDelay: '0.6s' }}>
            <span className="eco-node-glow" />
            <span className="eco-node-label">Sales Agent</span>
          </div>
          <div className="eco-node eco-node-agent eco-node-orchestrator" style={{ animationDelay: '0.8s' }}>
            <span className="eco-node-glow" />
            <span className="eco-node-label">Orchestrator</span>
          </div>
          <div className="eco-node eco-node-agent" style={{ animationDelay: '1.0s' }}>
            <span className="eco-node-glow" />
            <span className="eco-node-label">Support Agent</span>
          </div>
          <div className="eco-node eco-node-agent" style={{ animationDelay: '1.2s' }}>
            <span className="eco-node-glow" />
            <span className="eco-node-label">Finance Agent</span>
          </div>
        </div>
        {/* Inter-agent connections */}
        <svg className="eco-agent-lines" viewBox="0 0 400 20" preserveAspectRatio="none">
          <line x1="60" y1="10" x2="160" y2="10" className="eco-svg-line" />
          <line x1="160" y1="10" x2="260" y2="10" className="eco-svg-line" />
          <line x1="260" y1="10" x2="350" y2="10" className="eco-svg-line" />
        </svg>
      </div>

      {/* Connection lines agents → processes */}
      <div className="eco-connectors">
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '1.0s' }} />
      </div>

      {/* Layer 2: Operational Processes */}
      <div className="eco-layer eco-layer-processes">
        <div className="eco-layer-label">{t('Processen', 'Processes')}</div>
        <div className="eco-lanes">
          <div className="eco-lane">
            <span className="eco-lane-label">Sales</span>
            <div className="eco-lane-track">
              <div className="eco-work-item" style={{ animationDelay: '0s' }}>Lead</div>
              <div className="eco-work-item" style={{ animationDelay: '1.5s' }}>Quote</div>
            </div>
          </div>
          <div className="eco-lane">
            <span className="eco-lane-label">Onboarding</span>
            <div className="eco-lane-track">
              <div className="eco-work-item" style={{ animationDelay: '0.8s' }}>Ticket</div>
            </div>
          </div>
          <div className="eco-lane">
            <span className="eco-lane-label">Finance</span>
            <div className="eco-lane-track">
              <div className="eco-work-item" style={{ animationDelay: '0.4s' }}>Invoice</div>
              <div className="eco-work-item" style={{ animationDelay: '2s' }}>Report</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection lines processes → systems */}
      <div className="eco-connectors">
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '0.9s' }} />
        <div className="eco-line eco-line-pulse" style={{ animationDelay: '1.6s' }} />
      </div>

      {/* Layer 1: Systems & Data */}
      <div className="eco-layer eco-layer-systems">
        <div className="eco-layer-label">{t('Systemen', 'Systems')}</div>
        <div className="eco-nodes eco-nodes-systems">
          {['CRM', 'ERP', 'Email', 'Docs', 'Calendar'].map((sys, i) => (
            <div key={sys} className="eco-node eco-node-system" style={{ animationDelay: `${i * 0.15}s` }}>
              <span className="eco-node-label">{sys}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
