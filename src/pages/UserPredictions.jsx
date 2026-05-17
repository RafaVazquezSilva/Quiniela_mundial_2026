import { useState } from 'react'
import { MatchCard, Button } from '../design-system'
import { groups, getFlagUrl } from '../data/groups'
import { generateShareLink } from '../utils/share'

function calculatePoints(prediction, result) {
  if (!result || result.home === '' || result.away === '') return 0
  if (!prediction || prediction.home === '' || prediction.away === '') return 0

  const predHome = parseInt(prediction.home)
  const predAway = parseInt(prediction.away)
  const resHome = parseInt(result.home)
  const resAway = parseInt(result.away)

  if (isNaN(predHome) || isNaN(predAway) || isNaN(resHome) || isNaN(resAway)) return 0

  if (predHome === resHome && predAway === resAway) return 10
  if (predHome - predAway === resHome - resAway) return 7
  if (
    (predHome > predAway && resHome > resAway) ||
    (predHome < predAway && resHome < resAway) ||
    (predHome === predAway && resHome === resAway)
  ) {
    return 3
  }

  return 0
}

export function UserPredictions({ user, results, onBack }) {
  const [copied, setCopied] = useState(false)
  let totalPoints = 0
  let correctResults = 0
  let exactMatches = 0
  let totalMatches = 0

  groups.forEach((group) => {
    group.matches.forEach((match) => {
      const prediction = user.predictions[match.id]
      const result = results?.[match.id]
      if (!prediction || prediction.home === '' || prediction.away === '') return
      if (!result || result.home === '' || result.away === '') return

      totalMatches++
      const pts = calculatePoints(prediction, result)
      totalPoints += pts
      if (pts > 0) correctResults++
      if (pts === 10) exactMatches++
    })
  })

  const handleShare = async () => {
    const link = generateShareLink(user.name, user.predictions)
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = link
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Button variant="ghost" onClick={onBack}>← Volver al Ranking</Button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        padding: '16px 24px',
        background: 'var(--color-neutral-50)',
        borderRadius: '12px',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px' }}>{user.name}</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
            Predicciones de {user.name}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--color-primary-600)' }}>
            {totalPoints} pts
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {correctResults}/{totalMatches} aciertos · {exactMatches} exactos
          </div>
          <Button variant="outline" size="sm" onClick={handleShare} style={{ marginTop: '8px' }}>
            {copied ? '✓ Copiado' : '📋 Compartir'}
          </Button>
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.id} style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid var(--color-neutral-200)',
          }}>
            Grupo {group.id}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {group.matches.map((match) => {
              const homeTeam = group.teams.find((t) => t.id === match.homeTeam)
              const awayTeam = group.teams.find((t) => t.id === match.awayTeam)
              const prediction = user.predictions[match.id] || { home: '', away: '' }
              const result = results?.[match.id]
              const points = calculatePoints(prediction, result)

              return (
                <MatchCard
                  key={match.id}
                  homeTeam={homeTeam.name}
                  awayTeam={awayTeam.name}
                  homeFlag={getFlagUrl(homeTeam.code)}
                  awayFlag={getFlagUrl(awayTeam.code)}
                  date={`${match.time} - ${match.stadium}`}
                  group={`Grupo ${group.id}`}
                  prediction={prediction}
                  result={result ? `${result.home} - ${result.away}` : null}
                  points={points}
                  isLocked={true}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
