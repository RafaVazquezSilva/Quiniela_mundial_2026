import { useState, useEffect } from 'react'
import { MatchCard, StandingsTable } from '../design-system'
import { getFlagUrl } from '../data/groups'
import { getUsers, saveUser } from '../utils/users'

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function calculateStandings(group, results) {
  const standings = group.teams.map((team) => ({
    id: team.id,
    name: team.name,
    flag: getFlagUrl(team.code),
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  }))

  group.matches.forEach((match) => {
    const result = results?.[match.id]
    if (!result || result.home === '' || result.away === '') return

    const homeGoals = parseInt(result.home) || 0
    const awayGoals = parseInt(result.away) || 0

    const homeTeam = standings.find((t) => t.id === match.homeTeam)
    const awayTeam = standings.find((t) => t.id === match.awayTeam)

    homeTeam.played++
    awayTeam.played++
    homeTeam.goalsFor += homeGoals
    homeTeam.goalsAgainst += awayGoals
    awayTeam.goalsFor += awayGoals
    awayTeam.goalsAgainst += homeGoals

    if (homeGoals > awayGoals) {
      homeTeam.won++
      homeTeam.points += 3
      awayTeam.lost++
    } else if (homeGoals < awayGoals) {
      awayTeam.won++
      awayTeam.points += 3
      homeTeam.lost++
    } else {
      homeTeam.drawn++
      awayTeam.drawn++
      homeTeam.points += 1
      awayTeam.points += 1
    }
  })

  standings.forEach((t) => {
    t.goalDifference = t.goalsFor - t.goalsAgainst
  })

  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    return b.goalsFor - a.goalsFor
  })
}

export function GroupView({ group, user, results, onResultChange }) {
  const [standings, setStandings] = useState([])
  const [localPredictions, setLocalPredictions] = useState(user?.predictions || {})

  useEffect(() => {
    setLocalPredictions(user?.predictions || {})
  }, [user])

  useEffect(() => {
    setStandings(calculateStandings(group, results))
  }, [group, results])

  const handlePredictionChange = (matchId, value) => {
    const newPredictions = {
      ...localPredictions,
      [matchId]: value,
    }
    setLocalPredictions(newPredictions)

    // Save to user in localStorage
    const users = getUsers()
    if (users[user?.id]) {
      users[user.id].predictions = newPredictions
      localStorage.setItem('quiniela-users', JSON.stringify(users))
    }
  }

  const matchesByDate = {}
  group.matches.forEach((match) => {
    if (!matchesByDate[match.date]) {
      matchesByDate[match.date] = []
    }
    matchesByDate[match.date].push(match)
  })

  const sortedDates = Object.keys(matchesByDate).sort()

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <StandingsTable group={group.id} teams={standings} />
      </div>

      {sortedDates.map((date) => (
        <div key={date} style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            textTransform: 'capitalize',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid var(--color-neutral-200)',
          }}>
            {formatDate(date)}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {matchesByDate[date].map((match) => {
              const homeTeam = group.teams.find((t) => t.id === match.homeTeam)
              const awayTeam = group.teams.find((t) => t.id === match.awayTeam)
              const prediction = localPredictions?.[match.id] || { home: '', away: '' }
              const result = results?.[match.id]
              const isLocked = new Date(match.date + 'T' + match.time) < new Date()

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
                  onPredictionChange={(val) => handlePredictionChange(match.id, val)}
                  result={result ? `${result.home} - ${result.away}` : null}
                  isLocked={isLocked}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
