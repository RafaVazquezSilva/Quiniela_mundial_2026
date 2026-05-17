import { useState, useEffect } from 'react'
import { Layout, Header, Main, Footer, PageHeader, Avatar, Badge, Button, Modal } from './design-system'
import { GroupsPage } from './pages/GroupsPage'
import { RankingPage } from './pages/RankingPage'
import { UserPredictions } from './pages/UserPredictions'
import { EliminatoriasPage } from './pages/EliminatoriasPage'
import { ShareModal } from './components/ShareModal'
import { UserNameModal } from './components/UserNameModal'
import { groups } from './data/groups'
import { knockoutMatches } from './data/knockout'
import { getCurrentUser } from './utils/users'
import { decodePredictions } from './utils/share'
import { importUser, setCurrentUser } from './utils/users'

const RESULTS_KEY = 'quiniela-mundial-2026-results'
const KNOCKOUT_RESULTS_KEY = 'quiniela-mundial-2026-knockout-results'

export default function App() {
  const [currentUser, setCurrentUserState] = useState(() => getCurrentUser())
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem(RESULTS_KEY)
    return saved ? JSON.parse(saved) : {}
  })
  const [knockoutResults, setKnockoutResults] = useState(() => {
    const saved = localStorage.getItem(KNOCKOUT_RESULTS_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  const [activePage, setActivePage] = useState('grupos')
  const [adminOpen, setAdminOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [viewingUser, setViewingUser] = useState(null)
  const [showNameModal, setShowNameModal] = useState(false)
  const [sharedData, setSharedData] = useState(null)

  useEffect(() => {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  }, [results])

  useEffect(() => {
    localStorage.setItem(KNOCKOUT_RESULTS_KEY, JSON.stringify(knockoutResults))
  }, [knockoutResults])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userName = params.get('user')
    const data = params.get('data')

    if (userName && data) {
      try {
        const predictions = decodePredictions(data)
        const user = importUser(userName, predictions)
        setCurrentUser(user.id)
        setCurrentUserState(user)
        setSharedData({ userName, predictions })
      } catch {
        // Invalid data, ignore
      }

      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    }

    if (!getCurrentUser()) {
      setShowNameModal(true)
    }
  }, [])

  const handleResultChange = (matchId, value) => {
    setResults((prev) => ({
      ...prev,
      [matchId]: value,
    }))
  }

  const handleKnockoutResultChange = (matchId, value) => {
    setKnockoutResults((prev) => ({
      ...prev,
      [matchId]: value,
    }))
  }

  const handleViewUser = (user) => {
    setViewingUser(user)
    setActivePage('user-predictions')
  }

  const handleBackToRanking = () => {
    setViewingUser(null)
    setActivePage('ranking')
  }

  const handleNameModalClose = () => {
    setShowNameModal(false)
    setCurrentUserState(getCurrentUser())
  }

  const totalResults = Object.values(results).filter(
    (r) => r.home !== '' && r.away !== ''
  ).length

  const navLinks = [
    { label: 'Grupos', page: 'grupos', active: activePage === 'grupos' },
    { label: 'Eliminatorias', page: 'eliminatorias', active: activePage === 'eliminatorias' },
    { label: 'Ranking', page: 'ranking', active: activePage === 'ranking' || activePage === 'user-predictions' },
  ]

  const handleNavigate = (page) => {
    setActivePage(page)
    if (page !== 'user-predictions') {
      setViewingUser(null)
    }
  }

  return (
    <Layout>
      <Header
        navLinks={navLinks}
        onNavigate={handleNavigate}
        user={currentUser ? { name: currentUser.name } : null}
      >
        {currentUser && (
          <Button variant="ghost" size="sm" onClick={() => setShareModalOpen(true)}>
            Compartir
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={() => setAdminOpen(true)}>
          Admin
        </Button>
        {currentUser && <Avatar initials={currentUser.name.substring(0, 2).toUpperCase()} size="sm" />}
      </Header>

      <Main>
        <PageHeader
          title={activePage === 'user-predictions' ? viewingUser?.name : 'Quiniela Mundial 2026'}
          subtitle={
            activePage === 'user-predictions'
              ? `Predicciones de ${viewingUser?.name}`
              : `Fase de grupos · ${totalResults}/72 resultados ingresados`
          }
        />

        {activePage === 'grupos' && currentUser && (
          <GroupsPage
            currentUser={currentUser}
            results={results}
            onResultChange={handleResultChange}
          />
        )}

        {activePage === 'ranking' && (
          <RankingPage
            results={results}
            knockoutResults={knockoutResults}
            onViewUser={handleViewUser}
          />
        )}

        {activePage === 'user-predictions' && viewingUser && (
          <UserPredictions
            user={viewingUser}
            results={results}
            onBack={handleBackToRanking}
          />
        )}

        {activePage === 'eliminatorias' && currentUser && (
          <EliminatoriasPage
            currentUser={currentUser}
            results={results}
            knockoutResults={knockoutResults}
            onKnockoutPredictionChange={handleKnockoutResultChange}
          />
        )}

        {activePage === 'eliminatorias' && !currentUser && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-tertiary)' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>&#127942;</p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>Eliminatorias próximamente</p>
            <p style={{ fontSize: '14px' }}>Se habilitará cuando termine la fase de grupos</p>
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
        knockoutResults={knockoutResults}
        onKnockoutResultChange={handleKnockoutResultChange}
      />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        user={currentUser}
      />

      <UserNameModal
        isOpen={showNameModal}
        onClose={handleNameModalClose}
        sharedData={sharedData}
      />
    </Layout>
  )
}

function AdminModal({ isOpen, onClose, results, onResultChange, knockoutResults, onKnockoutResultChange }) {
  const [selectedGroup, setSelectedGroup] = useState('A')
  const [adminTab, setAdminTab] = useState('groups')
  const [selectedKnockoutRound, setSelectedKnockoutRound] = useState('r32')
  const currentGroup = groups.find((g) => g.id === selectedGroup)

  const knockoutRounds = [
    { id: 'r32', label: '16avos' },
    { id: 'r16', label: 'Octavos' },
    { id: 'qf', label: 'Cuartos' },
    { id: 'sf', label: 'Semis' },
    { id: 'third', label: '3er Puesto' },
    { id: 'final', label: 'Final' },
  ]

  const getTeamName = (slot, allStandings, qualifiedThirds, thirdAssignment) => {
    if (!slot) return 'TBD'
    if (slot.type === 'group') {
      const standings = allStandings?.[slot.group]
      if (!standings || standings.length < slot.position) return 'TBD'
      return standings[slot.position - 1].teamName
    }
    return 'TBD'
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Admin - Ingresar Resultados"
      size="lg"
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button
            onClick={() => setAdminTab('groups')}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: adminTab === 'groups' ? 'var(--color-primary-500)' : 'var(--color-neutral-100)',
              color: adminTab === 'groups' ? 'var(--text-inverse)' : 'var(--text-secondary)',
            }}
          >
            Fase de Grupos
          </button>
          <button
            onClick={() => setAdminTab('knockout')}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: adminTab === 'knockout' ? 'var(--color-primary-500)' : 'var(--color-neutral-100)',
              color: adminTab === 'knockout' ? 'var(--text-inverse)' : 'var(--text-secondary)',
            }}
          >
            Eliminatorias
          </button>
        </div>

        {adminTab === 'groups' && (
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
        )}

        {adminTab === 'knockout' && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {knockoutRounds.map((round) => (
              <button
                key={round.id}
                onClick={() => setSelectedKnockoutRound(round.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: selectedKnockoutRound === round.id
                    ? 'var(--color-primary-500)'
                    : 'var(--color-neutral-100)',
                  color: selectedKnockoutRound === round.id
                    ? 'var(--text-inverse)'
                    : 'var(--text-secondary)',
                }}
              >
                {round.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {adminTab === 'groups' && (
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
      )}

      {adminTab === 'knockout' && (
        <div style={{ display: 'grid', gap: '12px', maxHeight: '400px', overflow: 'auto' }}>
          {Object.values(knockoutMatches)
            .filter((m) => m.round === selectedKnockoutRound)
            .map((match) => {
              const result = knockoutResults?.[match.id] || { home: '', away: '' }
              const slot1Label = match.slot1.type === 'group'
                ? `${match.slot1.position === 1 ? '1°' : '2°'} Grupo ${match.slot1.group}`
                : match.slot1.type === 'third'
                ? `3° (${match.slot1.eligibleGroups.join('/')})`
                : `Ganador ${match.slot1.match}`
              const slot2Label = match.slot2.type === 'group'
                ? `${match.slot2.position === 1 ? '1°' : '2°'} Grupo ${match.slot2.group}`
                : match.slot2.type === 'third'
                ? `3° (${match.slot2.eligibleGroups.join('/')})`
                : `Ganador ${match.slot2.match}`

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
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', minWidth: '40px' }}>
                    #{match.matchNumber || '-'}
                  </span>
                  <span style={{ flex: 1, fontSize: '13px', fontWeight: '500' }}>
                    {slot1Label} vs {slot2Label}
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
                        onKnockoutResultChange(match.id, { ...result, home: e.target.value })
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
                        onKnockoutResultChange(match.id, { ...result, away: e.target.value })
                      }
                      placeholder="-"
                    />
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </Modal>
  )
}
