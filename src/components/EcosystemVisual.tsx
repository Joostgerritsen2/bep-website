'use client'
import { useLang } from '@/lib/language'

export function EcosystemVisual() {
  const { t } = useLang()

  return (
    <div className="eco">
      {/* Layer 4: Humans */}
      <div className="eco-layer">
        <div className="eco-layer-label">{t('Mensen', 'Humans')}</div>
        <div className="eco-nodes">
          <div className="eco-node eco-node-human">
            <span className="eco-node-dot eco-dot-teal" />
            <span className="eco-node-label">Review</span>
          </div>
          <div className="eco-node eco-node-human">
            <span className="eco-node-dot eco-dot-teal" />
            <span className="eco-node-label">Approve</span>
          </div>
          <div className="eco-node eco-node-human">
            <span className="eco-node-dot eco-dot-teal" />
            <span className="eco-node-label">Escalate</span>
          </div>
        </div>
      </div>

      {/* Connector */}
      <div className="eco-connector-line" />

      {/* Layer 3: AI Agents */}
      <div className="eco-layer">
        <div className="eco-layer-label eco-label-orange">AI Agents</div>
        <div className="eco-nodes">
          <div className="eco-node eco-node-agent">
            <span className="eco-node-dot eco-dot-orange" />
            <span className="eco-node-label">Sales</span>
          </div>
          <div className="eco-node eco-node-agent eco-node-main">
            <span className="eco-node-dot eco-dot-orange" />
            <span className="eco-node-label">Orchestrator</span>
          </div>
          <div className="eco-node eco-node-agent">
            <span className="eco-node-dot eco-dot-orange" />
            <span className="eco-node-label">Support</span>
          </div>
          <div className="eco-node eco-node-agent">
            <span className="eco-node-dot eco-dot-orange" />
            <span className="eco-node-label">Finance</span>
          </div>
        </div>
      </div>

      {/* Connector */}
      <div className="eco-connector-line" />

      {/* Layer 2: Processes */}
      <div className="eco-layer">
        <div className="eco-layer-label">{t('Processen', 'Processes')}</div>
        <div className="eco-lanes">
          <div className="eco-lane">
            <span className="eco-lane-label">Sales</span>
            <div className="eco-lane-track">
              <span className="eco-lane-item">Lead</span>
              <span className="eco-lane-item">Quote</span>
            </div>
          </div>
          <div className="eco-lane">
            <span className="eco-lane-label">Onboarding</span>
            <div className="eco-lane-track">
              <span className="eco-lane-item">Ticket</span>
            </div>
          </div>
          <div className="eco-lane">
            <span className="eco-lane-label">Finance</span>
            <div className="eco-lane-track">
              <span className="eco-lane-item">Invoice</span>
              <span className="eco-lane-item">Report</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connector */}
      <div className="eco-connector-line" />

      {/* Layer 1: Systems */}
      <div className="eco-layer">
        <div className="eco-layer-label">{t('Systemen', 'Systems')}</div>
        <div className="eco-nodes">
          {['CRM', 'ERP', 'Email', 'Docs', 'Calendar'].map(sys => (
            <div key={sys} className="eco-node eco-node-system">
              <span className="eco-node-label">{sys}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
