import { useState, useEffect } from 'react'
import { Layout, Header, Main, Footer, PageHeader, Avatar, Badge, Button, Modal } from './design-system'
import { GroupsPage } from './pages/GroupsPage'
import { groups } from './data/groups'

const PREDICTIONS_KEY = 'quiniela-mundial-2026-predictions'
const RESULTS_KEY = 'quiniela-mundial-2026-results'

export default function App() {
  const [predictions, setPredictions] = useState(() => {
    const saved = localStorage.getItem(PREDICTIONS_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem(RESULTS_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  const [activePage, setActivePage] = useState('grupos')
  const [adminOpen, setAdminOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(predictions))
  }, [predictions])

  useEffect(() => {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  }, [results])

  const handlePredictionChange = (matchId, value) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: value,
    }))
  }

  const handleResultChange = (matchId, value) => {
    setResults((prev) => ({
      ...prev,
      [matchId]: value,
    }))
  }

  const totalPredictions = Object.values(predictions).filter(
    (p) => p.home !== '' || p.away !== ''
  ).length

  const totalResults = Object.values(results).filter(
    (r) => r.home !== '' && r.away !== ''
  ).length

  const navLinks = [
    { href: '#', label: 'Grupos', active: activePage === 'grupos' },
    { href: '#', label: 'Eliminatorias', active: activePage === 'eliminatorias' },
    { href: '#', label: 'Ranking', active: activePage === 'ranking' },
  ]

  return (
    <Layout>
      <Header
        navLinks={navLinks}
        user={{ name: 'Alejandro' }}
      >
        <Button variant="ghost" size="sm" onClick={() => setAdminOpen(true)}>
          Admin
        </Button>
        <Avatar initials="AP" size="sm" />
      </Header>

      <Main>
        <PageHeader
          title="Quiniela Mundial 2026"
          subtitle={`Fase de grupos · ${totalPredictions}/72 predicciones · ${totalResults}/72 resultados ingresados`}
        />

        {activePage === 'grupos' && (
          <GroupsPage
            predictions={predictions}
            onPredictionChange={handlePredictionChange}
            results={results}
            onResultChange={handleResultChange}
          />
        )}

        {activePage === 'eliminatorias' && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-tertiary)' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>&#127942;</p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>Eliminatorias próximamente</p>
            <p style={{ fontSize: '14px' }}>Se habilitará cuando termine la fase de grupos</p>
          </div>
        )}

        {activePage === 'ranking' && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-tertiary)' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>&#128200;</p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>Ranking próximamente</p>
            <p style={{ fontSize: '14px' }}>Se habilitará cuando comience el torneo</p>
          </div>
        )}
      </Main>

      <Footer>
        Quiniela Mundial 2026 - Fase de Grupos
      </Footer>

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        results={results}
        onResultChange={handleResultChange}
      />
    </Layout>
  )
}

function AdminModal({ isOpen, onClose, results, onResultChange }) {
  const [selectedGroup, setSelectedGroup] = useState('A')
  const currentGroup = groups.find((g) => g.id === selectedGroup)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Admin - Ingresar Resultados"
      size="lg"
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                background: selectedGroup === group.id
                  ? 'var(--color-primary-500)'
                  : 'var(--color-neutral-100)',
                color: selectedGroup === group.id
                  ? 'var(--text-inverse)'
                  : 'var(--text-secondary)',
              }}
            >
              Grupo {group.id}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '12px', maxHeight: '400px', overflow: 'auto' }}>
        {currentGroup.matches.map((match) => {
          const homeTeam = currentGroup.teams.find((t) => t.id === match.homeTeam)
          const awayTeam = currentGroup.teams.find((t) => t.id === match.awayTeam)
          const result = results[match.id] || { home: '', away: '' }

          return (
            <div
              key={match.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: 'var(--color-neutral-50)',
                borderRadius: '8px',
              }}
            >
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', minWidth: '60px' }}>
                {match.date.slice(5)}
              </span>
              <span style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>
                {homeTeam.name} vs {awayTeam.name}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  min="0"
                  max="99"
                  style={{
                    width: '48px',
                    textAlign: 'center',
                    padding: '6px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: '6px',
                  }}
                  value={result.home}
                  onChange={(e) =>
                    onResultChange(match.id, { ...result, home: e.target.value })
                  }
                  placeholder="-"
                />
                <span style={{ fontWeight: '700', color: 'var(--text-tertiary)' }}>-</span>
                <input
                  type="number"
                  min="0"
                  max="99"
                  style={{
                    width: '48px',
                    textAlign: 'center',
                    padding: '6px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: '2px solid var(--color-neutral-300)',
                    borderRadius: '6px',
                  }}
                  value={result.away}
                  onChange={(e) =>
                    onResultChange(match.id, { ...result, away: e.target.value })
                  }
                  placeholder="-"
                />
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
