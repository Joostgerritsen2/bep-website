// src/components/HeroAgent.tsx
'use client'
import { useEffect, useState } from 'react'
import { Database, Mail, FileText, Users, Calendar, Bot } from 'lucide-react'

const systems = [
  { icon: Database, label: 'CRM' },
  { icon: FileText, label: 'ERP' },
  { icon: Mail, label: 'E-mail' },
  { icon: FileText, label: 'Docs' },
  { icon: Calendar, label: 'Agenda' },
]

const actions = [
  { emoji: '📊', text: 'Factuur #1234 is 30 dagen over tijd', action: 'actie voorgesteld' },
  { emoji: '🎯', text: 'Klant Rijkswaterstaat heeft 3 weken niets gehoord', action: 'follow-up aangemaakt' },
  { emoji: '📋', text: 'Tender deadline aankomende vrijdag', action: 'voorstel bijna klaar' },
  { emoji: '✅', text: 'Onboarding dossier compleet', action: 'team genotificeerd' },
]

export function HeroAgent() {
  const [activeAction, setActiveAction] = useState(0)
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    const actionInterval = setInterval(() => {
      setActiveAction(prev => (prev + 1) % actions.length)
    }, 2800)
    const dotInterval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % systems.length)
    }, 600)
    return () => {
      clearInterval(actionInterval)
      clearInterval(dotInterval)
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '280px',
    }}>

      {/* Achtergrond glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(245,134,29,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Systemen links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
        {systems.map((sys, i) => {
          const Icon = sys.icon
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: activeDot === i
                ? 'rgba(245,134,29,0.12)'
                : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeDot === i ? 'rgba(245,134,29,0.3)' : 'rgba(255,255,255,0.07)'}`,
              padding: '7px 10px',
              transition: 'all 0.3s ease',
            }}>
              <Icon size={13} color={activeDot === i ? '#F5861D' : 'rgba(255,255,255,0.4)'} />
              <span style={{
                fontSize: '11px', fontWeight: 600,
                color: activeDot === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.3s',
              }}>
                {sys.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Verbindingslijn links */}
      <div style={{ flex: '0 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '24px', height: '1px',
          background: 'linear-gradient(to right, rgba(245,134,29,0.6), rgba(245,134,29,0.2))',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            width: '5px', height: '5px',
            background: '#F5861D',
            borderRadius: '50%',
            top: '-2px',
            animation: 'dot-flow-left 1.2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* BEP hub midden */}
      <div style={{
        flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}>
        <div style={{
          width: '52px', height: '52px',
          background: 'linear-gradient(135deg, #F5861D, #D97316)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(245,134,29,0.35)',
          animation: 'hub-pulse 2s ease-in-out infinite',
        }}>
          <Bot size={22} color="white" />
        </div>
        <span style={{
          fontSize: '10px', fontWeight: 800,
          color: '#F5861D', letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>
          BEP
        </span>
      </div>

      {/* Verbindingslijn rechts */}
      <div style={{ flex: '0 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '24px', height: '1px',
          background: 'linear-gradient(to right, rgba(245,134,29,0.2), rgba(245,134,29,0.6))',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            width: '5px', height: '5px',
            background: '#F5861D',
            borderRadius: '50%',
            top: '-2px',
            animation: 'dot-flow-right 1.2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Actiekaartjes rechts */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {actions.map((action, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', gap: '3px',
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${i === activeAction ? 'rgba(245,134,29,0.35)' : 'rgba(255,255,255,0.06)'}`,
            padding: '8px 10px',
            marginBottom: '6px',
            opacity: i === activeAction ? 1 : 0.3,
            transform: i === activeAction ? 'translateX(0)' : 'translateX(4px)',
            transition: 'all 0.4s ease',
          }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>{action.emoji}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {action.text}
              </span>
            </div>
            <div style={{
              fontSize: '10px', color: '#F5861D', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <span>→</span> {action.action}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes hub-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(245,134,29,0.35); }
          50%       { box-shadow: 0 0 32px rgba(245,134,29,0.55); }
        }
        @keyframes dot-flow-left {
          0%   { left: 0; opacity: 0; }
          30%  { opacity: 1; }
          100% { left: calc(100% - 5px); opacity: 0; }
        }
        @keyframes dot-flow-right {
          0%   { left: 0; opacity: 0; }
          30%  { opacity: 1; }
          100% { left: calc(100% - 5px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
