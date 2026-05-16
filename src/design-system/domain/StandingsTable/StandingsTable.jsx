import { useState } from 'react'

export function StandingsTable({ group, teams, className = '' }) {
  const [expandedTeam, setExpandedTeam] = useState(null)

  return (
    <div className={`ds-standings ${className}`}>
      <div className="ds-standings__cell ds-standings__cell--header">#</div>
      <div className="ds-standings__cell ds-standings__cell--header ds-standings__cell--team">Equipo</div>
      <div className="ds-standings__cell ds-standings__cell--header">PJ</div>
      <div className="ds-standings__cell ds-standings__cell--header ds-standings__cell--hide-mobile">G</div>
      <div className="ds-standings__cell ds-standings__cell--header ds-standings__cell--hide-mobile">E</div>
      <div className="ds-standings__cell ds-standings__cell--header ds-standings__cell--hide-mobile">P</div>
      <div className="ds-standings__cell ds-standings__cell--header ds-standings__cell--hide-mobile">GF</div>
      <div className="ds-standings__cell ds-standings__cell--header ds-standings__cell--hide-mobile">GC</div>
      <div className="ds-standings__cell ds-standings__cell--header ds-standings__cell--hide-mobile">DG</div>
      <div className="ds-standings__cell ds-standings__cell--header">Pts</div>

      {teams.map((team, index) => {
        const isExpanded = expandedTeam === team.id
        return (
          <div
            key={team.id}
            className={`ds-standings__row ${isExpanded ? 'ds-standings__row--expanded' : ''}`}
            onClick={() => setExpandedTeam(isExpanded ? null : team.id)}
          >
            <div className="ds-standings__cell ds-standings__cell--row">
              <span className={`ds-standings__position ${index < 2 ? 'ds-standings__position--qualified' : 'ds-standings__position--eliminated'}`}>
                {index + 1}
              </span>
            </div>
            <div className="ds-standings__cell ds-standings__cell--row ds-standings__cell--team">
              {team.flag && <img className="ds-standings__team-flag" src={team.flag} alt={team.name} />}
              <span className="ds-standings__team-name">{team.name}</span>
            </div>
            <div className="ds-standings__cell ds-standings__cell--row">{team.played}</div>
            <div className="ds-standings__cell ds-standings__cell--row ds-standings__cell--hide-mobile">{team.won}</div>
            <div className="ds-standings__cell ds-standings__cell--row ds-standings__cell--hide-mobile">{team.drawn}</div>
            <div className="ds-standings__cell ds-standings__cell--row ds-standings__cell--hide-mobile">{team.lost}</div>
            <div className="ds-standings__cell ds-standings__cell--row ds-standings__cell--hide-mobile">{team.goalsFor}</div>
            <div className="ds-standings__cell ds-standings__cell--row ds-standings__cell--hide-mobile">{team.goalsAgainst}</div>
            <div className="ds-standings__cell ds-standings__cell--row ds-standings__cell--hide-mobile">
              {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
            </div>
            <div className="ds-standings__cell ds-standings__cell--row ds-standings__cell--points">{team.points}</div>

            <div className="ds-standings__details">
              <div className="ds-standings__details-grid">
                <div>
                  <div className="ds-standings__detail-label">Ganados</div>
                  <div className="ds-standings__detail-value">{team.won}</div>
                </div>
                <div>
                  <div className="ds-standings__detail-label">Empatados</div>
                  <div className="ds-standings__detail-value">{team.drawn}</div>
                </div>
                <div>
                  <div className="ds-standings__detail-label">Goles a favor</div>
                  <div className="ds-standings__detail-value">{team.goalsFor}</div>
                </div>
                <div>
                  <div className="ds-standings__detail-label">Diferencia</div>
                  <div className="ds-standings__detail-value">
                    {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
