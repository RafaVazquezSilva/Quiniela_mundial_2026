import { useState, useMemo } from 'react'
import { knockoutMatches, roundLabels, roundOrder, getMatchesByRound } from '../data/knockout'
import { BracketView } from '../design-system/domain/BracketView/BracketView'
import { getAllGroupStandings, resolveBracketWithTeams, getSlotLabel, getTeamFromSlot } from '../utils/knockout'
import { getFlagUrl } from '../data/groups'

export function EliminatoriasPage({ currentUser, results, knockoutResults, onKnockoutPredictionChange }) {
  const [selectedRound, setSelectedRound] = useState('all')

  const allStandings = useMemo(() => getAllGroupStandings(results), [results])

  const { resolved, thirdAssignment, qualifiedThirds } = useMemo(
    () => resolveBracketWithTeams(allStandings, knockoutResults),
    [allStandings, knockoutResults]
  )

  const groupStageComplete = useMemo(() => {
    const totalGroupMatches = 72
    const completedResults = Object.values(results).filter(
      (r) => r.home !== '' && r.away !== ''
    ).length
    return completedResults >= totalGroupMatches
  }, [results])

  const resolvedTeams = useMemo(() => {
    const teams = {}
    for (const matchId of Object.keys(resolved)) {
      teams[matchId] = {
        team1: resolved[matchId].team1,
        team2: resolved[matchId].team2,
      }
    }
    return teams
  }, [resolved])

  const roundsForDisplay = useMemo(() => {
    const matchesByRound = getMatchesByRound()
    const rounds = []

    for (const round of roundOrder) {
      const matches = matchesByRound[round].map((match) => {
        const teamData = resolvedTeams[match.id]
        return {
          id: match.id,
          teams: teamData ? [teamData.team1, teamData.team2] : [],
          stadium: match.stadium,
          date: match.date,
          time: match.time,
        }
      })

      rounds.push({
        name: roundLabels[round],
        matches,
      })
    }

    return rounds
  }, [resolvedTeams])

  const filteredRounds = selectedRound === 'all'
    ? roundsForDisplay
    : roundsForDisplay.filter((r) => r.name === roundLabels[selectedRound])

  const predictionsCount = currentUser?.predictions
    ? Object.keys(knockoutMatches).filter(
        (id) => currentUser.predictions[id]?.home !== '' && currentUser.predictions[id]?.away !== ''
      ).length
    : 0

  const totalKnockoutMatches = Object.keys(knockoutMatches).length

  if (!groupStageComplete) {
    const completedResults = Object.values(results).filter(
      (r) => r.home !== '' && r.away !== ''
    ).length

    return (
      <div className="eliminatorias-page">
        <div className="eliminatorias-placeholder">
          <div className="eliminatorias-placeholder__icon">&#127942;</div>
          <h2 className="eliminatorias-placeholder__title">Fase eliminatoria</h2>
          <p className="eliminatorias-placeholder__text">
            Se habilitará cuando se completen los resultados de la fase de grupos
          </p>
          <div className="eliminatorias-placeholder__progress">
            <div className="eliminatorias-placeholder__progress-bar">
              <div
                className="eliminatorias-placeholder__progress-fill"
                style={{ width: `${(completedResults / 72) * 100}%` }}
              />
            </div>
            <span>{completedResults}/72 partidos completados</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="eliminatorias-page">
      <div className="eliminatorias-header">
        <div className="eliminatorias-header__info">
          <h2 className="eliminatorias-header__title">Fase Eliminatoria</h2>
          <p className="eliminatorias-header__subtitle">
            {predictionsCount}/{totalKnockoutMatches} predicciones realizadas
          </p>
        </div>
        {qualifiedThirds.length === 8 && (
          <div className="eliminatorias-thirds">
            <h4 className="eliminatorias-thirds__title">Mejores terceros</h4>
            <div className="eliminatorias-thirds__list">
              {qualifiedThirds.map((team) => (
                <span key={team.group} className="eliminatorias-thirds__badge">
                  <img src={getFlagUrl(team.teamCode)} alt={team.teamName} className="eliminatorias-thirds__flag" />
                  {team.teamName} ({team.group})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="eliminatorias-tabs">
        <button
          className={`eliminatorias-tabs__btn ${selectedRound === 'all' ? 'eliminatorias-tabs__btn--active' : ''}`}
          onClick={() => setSelectedRound('all')}
        >
          Todo
        </button>
        {roundOrder.map((round) => (
          <button
            key={round}
            className={`eliminatorias-tabs__btn ${selectedRound === round ? 'eliminatorias-tabs__btn--active' : ''}`}
            onClick={() => setSelectedRound(round)}
          >
            {roundLabels[round]}
          </button>
        ))}
      </div>

      <div className="eliminatorias-bracket-container">
        <BracketView
          rounds={filteredRounds}
          predictions={currentUser?.predictions || {}}
          knockoutResults={knockoutResults || {}}
          resolvedTeams={resolvedTeams}
          onPredictionChange={onKnockoutPredictionChange}
        />
      </div>
    </div>
  )
}
