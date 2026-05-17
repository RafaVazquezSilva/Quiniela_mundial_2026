import { groups } from '../data/groups'
import { knockoutMatches, roundOrder } from '../data/knockout.js'

export function calculateGroupStandings(group, results) {
  const standings = group.teams.map((team) => ({
    teamId: team.id,
    teamName: team.name,
    teamCode: team.code,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  }))

  const standingsMap = {}
  standings.forEach((s) => {
    standingsMap[s.teamId] = s
  })

  group.matches.forEach((match) => {
    const result = results?.[match.id]
    if (!result || result.home === '' || result.away === '') return

    const homeGoals = parseInt(result.home)
    const awayGoals = parseInt(result.away)
    if (isNaN(homeGoals) || isNaN(awayGoals)) return

    const home = standingsMap[match.homeTeam]
    const away = standingsMap[match.awayTeam]

    home.played++
    away.played++
    home.goalsFor += homeGoals
    home.goalsAgainst += awayGoals
    away.goalsFor += awayGoals
    away.goalsAgainst += homeGoals
    home.goalDifference = home.goalsFor - home.goalsAgainst
    away.goalDifference = away.goalsFor - away.goalsAgainst

    if (homeGoals > awayGoals) {
      home.won++
      home.points += 3
      away.lost++
    } else if (homeGoals < awayGoals) {
      away.won++
      away.points += 3
      home.lost++
    } else {
      home.drawn++
      away.drawn++
      home.points += 1
      away.points += 1
    }
  })

  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
    return a.teamId.localeCompare(b.teamId)
  })
}

export function getAllGroupStandings(results) {
  const allStandings = {}
  groups.forEach((group) => {
    allStandings[group.id] = calculateGroupStandings(group, results)
  })
  return allStandings
}

export function getThirdPlaceTeams(allStandings) {
  const thirds = []
  for (const groupId of Object.keys(allStandings)) {
    const standings = allStandings[groupId]
    if (standings.length >= 3) {
      thirds.push({
        ...standings[2],
        group: groupId,
      })
    }
  }

  return thirds.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
    return a.group.localeCompare(b.group)
  })
}

export function getQualifiedThirds(allStandings) {
  const thirds = getThirdPlaceTeams(allStandings)
  return thirds.slice(0, 8)
}

export function getThirdPlaceAssignment(qualifiedThirdGroups) {
  const sorted = [...qualifiedThirdGroups].sort()
  const key = sorted.join('')

  const assignmentTable = {
    'ABCD': { r32_2: 'A', r32_5: 'B', r32_7: 'C', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'ABCE': { r32_2: 'A', r32_5: 'B', r32_7: 'C', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'ABCF': { r32_2: 'A', r32_5: 'B', r32_7: 'C', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'ABDE': { r32_2: 'A', r32_5: 'B', r32_7: 'D', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'ABDF': { r32_2: 'A', r32_5: 'B', r32_7: 'D', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'ABEF': { r32_2: 'A', r32_5: 'B', r32_7: 'E', r32_8: 'F', r32_9: 'H', r32_10: 'I', r32_13: 'J', r32_15: 'K' },
    'ACDE': { r32_2: 'A', r32_5: 'C', r32_7: 'D', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'ACDF': { r32_2: 'A', r32_5: 'C', r32_7: 'D', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'ACEF': { r32_2: 'A', r32_5: 'C', r32_7: 'E', r32_8: 'F', r32_9: 'H', r32_10: 'I', r32_13: 'J', r32_15: 'K' },
    'ADEF': { r32_2: 'A', r32_5: 'D', r32_7: 'E', r32_8: 'F', r32_9: 'H', r32_10: 'I', r32_13: 'J', r32_15: 'K' },
    'BCDE': { r32_2: 'B', r32_5: 'C', r32_7: 'D', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'BCDF': { r32_2: 'B', r32_5: 'C', r32_7: 'D', r32_8: 'E', r32_9: 'F', r32_10: 'H', r32_13: 'I', r32_15: 'J' },
    'BCEF': { r32_2: 'B', r32_5: 'C', r32_7: 'E', r32_8: 'F', r32_9: 'H', r32_10: 'I', r32_13: 'J', r32_15: 'K' },
    'BDEF': { r32_2: 'B', r32_5: 'D', r32_7: 'E', r32_8: 'F', r32_9: 'H', r32_10: 'I', r32_13: 'J', r32_15: 'K' },
    'CDEF': { r32_2: 'C', r32_5: 'D', r32_7: 'E', r32_8: 'F', r32_9: 'H', r32_10: 'I', r32_13: 'J', r32_15: 'K' },
  }

  if (assignmentTable[key]) {
    return assignmentTable[key]
  }

  return computeThirdAssignment(qualifiedThirdGroups)
}

function computeThirdAssignment(qualifiedThirdGroups) {
  const sortedThirds = [...qualifiedThirdGroups].sort()
  const assignment = {}

  const slotDefinitions = [
    { match: 'r32_2', eligible: ['A', 'B', 'C', 'D', 'F'] },
    { match: 'r32_5', eligible: ['C', 'D', 'F', 'G', 'H'] },
    { match: 'r32_7', eligible: ['C', 'E', 'F', 'H', 'I'] },
    { match: 'r32_8', eligible: ['E', 'H', 'I', 'J', 'K'] },
    { match: 'r32_9', eligible: ['B', 'E', 'F', 'I', 'J'] },
    { match: 'r32_10', eligible: ['A', 'E', 'H', 'I', 'J'] },
    { match: 'r32_13', eligible: ['E', 'F', 'G', 'I', 'J'] },
    { match: 'r32_15', eligible: ['D', 'E', 'I', 'J', 'L'] },
  ]

  const assigned = new Set()

  for (const slot of slotDefinitions) {
    for (const group of sortedThirds) {
      if (!assigned.has(group) && slot.eligible.includes(group)) {
        assignment[slot.match] = group
        assigned.add(group)
        break
      }
    }
  }

  return assignment
}

export function getTeamFromSlot(slot, allStandings, qualifiedThirds, thirdAssignment) {
  if (slot.type === 'group') {
    const standings = allStandings[slot.group]
    if (!standings || standings.length < slot.position) return null
    return standings[slot.position - 1]
  }

  if (slot.type === 'third') {
    if (!thirdAssignment || !thirdAssignment[slot.match]) return null
    const assignedGroup = thirdAssignment[slot.match]
    const standings = allStandings[assignedGroup]
    if (!standings || standings.length < 3) return null
    return { ...standings[2], group: assignedGroup }
  }

  return null
}

export function resolveBracket(allStandings, knockoutResults) {
  const qualifiedThirds = getQualifiedThirds(allStandings)
  const thirdAssignment = getThirdPlaceAssignment(qualifiedThirds.map((t) => t.group))

  const resolved = {}
  const matchOrder = []

  for (const round of roundOrder) {
    const roundMatches = Object.values(knockoutMatches).filter((m) => m.round === round)
    matchOrder.push(...roundMatches)
  }

  for (const match of matchOrder) {
    const existingResult = knockoutResults?.[match.id]
    if (existingResult && existingResult.home !== '' && existingResult.away !== '') {
      resolved[match.id] = {
        home: parseInt(existingResult.home),
        away: parseInt(existingResult.away),
        winner: parseInt(existingResult.home) > parseInt(existingResult.away) ? 'home' : parseInt(existingResult.home) < parseInt(existingResult.away) ? 'away' : 'draw',
      }
      continue
    }

    const team1 = getTeamFromSlot(match.slot1, allStandings, qualifiedThirds, thirdAssignment)
    const team2 = getTeamFromSlot(match.slot2, allStandings, qualifiedThirds, thirdAssignment)

    if (match.slot1.type === 'winner' || match.slot1.type === 'loser') {
      const sourceResult = resolved[match.slot1.match]
      if (!sourceResult) continue
      if (match.slot1.type === 'winner') {
        if (sourceResult.winner === 'draw') continue
      }
    }
    if (match.slot2.type === 'winner' || match.slot2.type === 'loser') {
      const sourceResult = resolved[match.slot2.match]
      if (!sourceResult) continue
      if (match.slot2.type === 'winner') {
        if (sourceResult.winner === 'draw') continue
      }
    }

    resolved[match.id] = {
      team1: team1,
      team2: team2,
      isReady: !!(team1 && team2),
    }
  }

  return { resolved, thirdAssignment, qualifiedThirds }
}

export function resolveBracketWithTeams(allStandings, knockoutResults) {
  const qualifiedThirds = getQualifiedThirds(allStandings)
  const thirdAssignment = getThirdPlaceAssignment(qualifiedThirds.map((t) => t.group))

  const resolved = {}
  const matchResults = {}

  for (const round of roundOrder) {
    const roundMatches = Object.values(knockoutMatches).filter((m) => m.round === round)

    for (const match of roundMatches) {
      let team1, team2

      if (match.slot1.type === 'group' || match.slot1.type === 'third') {
        team1 = getTeamFromSlot(match.slot1, allStandings, qualifiedThirds, thirdAssignment)
      } else if (match.slot1.type === 'winner') {
        const sourceMatch = matchResults[match.slot1.match]
        team1 = sourceMatch?.winner
      } else if (match.slot1.type === 'loser') {
        const sourceMatch = matchResults[match.slot1.match]
        team1 = sourceMatch?.loser
      }

      if (match.slot2.type === 'group' || match.slot2.type === 'third') {
        team2 = getTeamFromSlot(match.slot2, allStandings, qualifiedThirds, thirdAssignment)
      } else if (match.slot2.type === 'winner') {
        const sourceMatch = matchResults[match.slot2.match]
        team2 = sourceMatch?.winner
      } else if (match.slot2.type === 'loser') {
        const sourceMatch = matchResults[match.slot2.match]
        team2 = sourceMatch?.loser
      }

      if (team1 && team2) {
        const matchResult = knockoutResults?.[match.id]
        let winner = null
        let loser = null

        if (matchResult && matchResult.home !== '' && matchResult.away !== '') {
          const homeGoals = parseInt(matchResult.home)
          const awayGoals = parseInt(matchResult.away)

          if (homeGoals > awayGoals) {
            winner = team1
            loser = team2
          } else if (awayGoals > homeGoals) {
            winner = team2
            loser = team1
          }
        }

        resolved[match.id] = {
          team1: { ...team1, name: team1.teamName, teamCode: team1.teamCode },
          team2: { ...team2, name: team2.teamName, teamCode: team2.teamCode },
          winner,
          loser,
          result: matchResult,
        }

        matchResults[match.id] = { winner, loser }
      }
    }
  }

  return { resolved, thirdAssignment, qualifiedThirds }
}

export function getKnockoutPoints(user, knockoutResults) {
  let totalPoints = 0
  let correctPredictions = 0
  let exactMatches = 0
  let totalMatches = 0

  for (const matchId of Object.keys(knockoutMatches)) {
    const prediction = user.predictions?.[matchId]
    const result = knockoutResults?.[matchId]

    if (!prediction || prediction.home === '' || prediction.away === '') continue
    if (!result || result.home === '' || result.away === '') continue

    totalMatches++

    const predHome = parseInt(prediction.home)
    const predAway = parseInt(prediction.away)
    const resHome = parseInt(result.home)
    const resAway = parseInt(result.away)

    if (predHome === resHome && predAway === resAway) {
      totalPoints += 15
      exactMatches++
      correctPredictions++
    } else if (
      (predHome > predAway && resHome > resAway) ||
      (predHome < predAway && resHome < resAway)
    ) {
      totalPoints += 10
      correctPredictions++
    } else if (
      (predHome > predAway && resHome === resAway) ||
      (predHome < predAway && resHome === resAway) ||
      (predHome === predAway && resHome !== resAway)
    ) {
      totalPoints += 5
    }
  }

  return { totalPoints, correctPredictions, exactMatches, totalMatches }
}

export function getGroupStandingsString(group) {
  return `${group.id}`
}

export function getSlotLabel(slot, allStandings, thirdAssignment) {
  if (slot.type === 'group') {
    const pos = slot.position === 1 ? '1°' : '2°'
    return `${pos} Grupo ${slot.group}`
  }

  if (slot.type === 'third') {
    if (thirdAssignment && thirdAssignment[slot.match]) {
      return `3° Grupo ${thirdAssignment[slot.match]}`
    }
    return `3° (${slot.eligibleGroups.join('/')})`
  }

  if (slot.type === 'winner') {
    return `Ganador ${slot.match}`
  }

  if (slot.type === 'loser') {
    return `Perdedor ${slot.match}`
  }

  return 'TBD'
}
