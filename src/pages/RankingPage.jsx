import { useState } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Badge, Button, Modal } from '../design-system'
import { getRanking, deleteUser, setCurrentUser, getCurrentUser } from '../utils/users'
import { generateShareLink } from '../utils/share'

export function RankingPage({ results, knockoutResults, onViewUser }) {
  const [deleteModal, setDeleteModal] = useState(null)
  const [copiedUserId, setCopiedUserId] = useState(null)
  const ranking = getRanking(results, knockoutResults || {})
  const currentUser = getCurrentUser()
  const hasResults = Object.values(results).some((r) => r.home !== '' && r.away !== '')

  const handleDelete = (userId) => {
    deleteUser(userId)
    setDeleteModal(null)
    window.location.reload()
  }

  const handleSetCurrent = (userId) => {
    setCurrentUser(userId)
    window.location.reload()
  }

  const handleShare = async (user) => {
    const link = generateShareLink(user.name, user.predictions)
    try {
      await navigator.clipboard.writeText(link)
      setCopiedUserId(user.id)
      setTimeout(() => setCopiedUserId(null), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = link
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedUserId(user.id)
      setTimeout(() => setCopiedUserId(null), 2000)
    }
  }

  if (ranking.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-tertiary)' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>👥</p>
        <p style={{ fontSize: '18px', fontWeight: '600' }}>No hay usuarios aún</p>
        <p style={{ fontSize: '14px' }}>Compartí tu link para que otros se unan</p>
      </div>
    )
  }

  return (
    <div>
      {!hasResults && (
        <div style={{
          padding: '16px',
          background: 'var(--color-warning-bg)',
          borderRadius: '8px',
          border: '1px solid var(--color-warning)',
          marginBottom: '24px',
          fontSize: '14px',
          color: 'var(--text-secondary)',
        }}>
          ⚠️ Los puntos se calcularán cuando se ingresen resultados reales desde el panel de Admin.
        </div>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell as="th">#</TableCell>
            <TableCell as="th">Usuario</TableCell>
            <TableCell as="th">Pts</TableCell>
            <TableCell as="th">Aciertos</TableCell>
            <TableCell as="th">Exactos</TableCell>
            <TableCell as="th">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((user, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''
            const rowBg =
              index === 0
                ? 'rgba(255, 215, 0, 0.3)'
                : index === 1
                ? 'rgba(192, 192, 192, 0.3)'
                : index === 2
                ? 'rgba(205, 127, 50, 0.3)'
                : 'transparent'

            return (
              <TableRow key={user.id} style={{ background: rowBg }}>
                <TableCell>
                  {medal && <span style={{ fontSize: '20px', marginRight: '8px' }}>{medal}</span>}
                  <Badge variant={index < 3 ? 'secondary' : 'default'}>
                    {index + 1}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{ fontWeight: '600', cursor: 'pointer' }}
                      onClick={() => handleSetCurrent(user.id)}
                    >
                      {user.name}
                    </span>
                    {user.id === currentUser?.id && (
                      <Badge variant="success" size="sm">Vos</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell style={{ fontWeight: '700', fontSize: '18px' }}>
                  {user.totalPoints}
                  {user.knockoutPoints > 0 && (
                    <span style={{ fontSize: '12px', fontWeight: '400', color: 'var(--text-tertiary)', display: 'block' }}>
                      {user.groupPoints}G + {user.knockoutPoints}E
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {user.correctResults}/{user.totalMatches}
                </TableCell>
                <TableCell>{user.exactMatches}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="ghost" size="sm" onClick={() => onViewUser(user)}>
                      👁 Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(user)}
                      title="Compartir"
                    >
                      {copiedUserId === user.id ? '✓' : '📋'}
                    </Button>
                    {user.id === currentUser?.id && (
                      <Button variant="ghost" size="sm" onClick={() => setDeleteModal(user)}>
                        🗑
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Eliminar usuario"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancelar</Button>
            <Button variant="danger" onClick={() => handleDelete(deleteModal?.id)}>Eliminar</Button>
          </>
        }
      >
        <p style={{ color: 'var(--text-secondary)' }}>
          ¿Estás seguro de eliminar a <strong>{deleteModal?.name}</strong>?
          Esta acción no se puede deshacer.
        </p>
      </Modal>
    </div>
  )
}
