import { useState } from 'react'
import { Modal, Button, Input } from '../design-system'
import { createCurrentUser, importUser, setCurrentUser } from '../utils/users'
import { decodePredictions } from '../utils/share'

export function UserNameModal({ isOpen, onClose, sharedData }) {
  const [name, setName] = useState('')
  const [importCode, setImportCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Ingresá tu nombre')
      return
    }
    createCurrentUser(name.trim())
    onClose()
  }

  const handleImport = () => {
    if (!importCode.trim()) {
      setError('Ingresá un link')
      return
    }

    try {
      let predictions
      if (importCode.includes('?user=')) {
        const url = new URL(importCode)
        const userName = url.searchParams.get('user')
        const data = url.searchParams.get('data')
        if (userName && data) {
          predictions = decodePredictions(data)
          const user = importUser(userName, predictions)
          setCurrentUser(user.id)
          onClose()
          return
        }
      }

      predictions = decodePredictions(importCode)
      const user = importUser('Usuario', predictions)
      setCurrentUser(user.id)
      onClose()
    } catch {
      setError('Link inválido')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bienvenido a la Quiniela"
    >
      <div style={{ display: 'grid', gap: '24px' }}>
        <div>
          <Input
            label="¿Cómo te llamás?"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => { setName(e.target.value); setError('') }}
            error={error}
          />
          <Button variant="primary" fullWidth onClick={handleSubmit} style={{ marginTop: '16px' }}>
            Empezar a jugar
          </Button>
        </div>

        {sharedData && (
          <div style={{
            padding: '16px',
            background: 'var(--color-info-bg)',
            borderRadius: '8px',
            border: '1px solid var(--color-info)',
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '600' }}>
              📥 Predicciones compartidas detectadas
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
              Se detectaron predicciones compartidas en el link.
              Ingresá tu nombre para empezar y las predicciones se importarán automáticamente.
            </p>
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--color-neutral-200)', paddingTop: '24px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
            ¿Tenés un link de otro usuario?
          </p>
          <Input
            placeholder="Pegá el link acá"
            value={importCode}
            onChange={(e) => { setImportCode(e.target.value); setError('') }}
          />
          <Button variant="outline" fullWidth onClick={handleImport} style={{ marginTop: '12px' }}>
            Importar predicciones
          </Button>
        </div>
      </div>
    </Modal>
  )
}
