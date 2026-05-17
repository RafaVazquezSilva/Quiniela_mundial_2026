import { useState } from 'react'
import { Modal, Button } from '../design-system'
import { generateShareLink, exportToJSON, exportToCSV } from '../utils/share'

export function ShareModal({ isOpen, onClose, user }) {
  const [copied, setCopied] = useState(false)

  if (!user) return null

  const shareLink = generateShareLink(user.name, user.predictions)
  const totalPredictions = Object.values(user.predictions).filter(
    (p) => p.home !== '' || p.away !== ''
  ).length

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = shareLink
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compartir mis predicciones"
    >
      <div style={{ display: 'grid', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
            📤 Compartir link:
          </label>
          <div style={{
            display: 'flex',
            gap: '8px',
            padding: '12px',
            background: 'var(--color-neutral-50)',
            borderRadius: '8px',
            border: '1px solid var(--color-neutral-200)',
          }}>
            <input
              type="text"
              value={shareLink}
              readOnly
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                outline: 'none',
              }}
            />
            <Button variant="primary" size="sm" onClick={handleCopy}>
              {copied ? '✓ Copiado' : '📋 Copiar'}
            </Button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-neutral-200)' }} />

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
            📥 Exportar predicciones:
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline" onClick={() => exportToJSON(user.name, user.predictions)}>
              📄 JSON
            </Button>
            <Button variant="outline" onClick={() => exportToCSV(user.name, user.predictions)}>
              📊 CSV
            </Button>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          background: 'var(--color-primary-50)',
          borderRadius: '8px',
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              Predicciones
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-primary-600)' }}>
              {totalPredictions}/72
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              Usuario
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {user.name}
            </div>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0 }}>
          Enviá este link por WhatsApp, Telegram o email. Quien lo abra podrá ver tus predicciones y se agregará al ranking.
        </p>
      </div>
    </Modal>
  )
}
