import pako from 'pako'
import { groups } from '../data/groups'
import { knockoutMatches, roundLabels } from '../data/knockout'

export function encodePredictions(predictions) {
  const json = JSON.stringify(predictions)
  const compressed = pako.gzip(json)
  const base64 = btoa(String.fromCharCode(...compressed))
  return base64
}

export function decodePredictions(encoded) {
  const binary = atob(encoded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  const decompressed = pako.ungzip(bytes)
  const json = new TextDecoder().decode(decompressed)
  return JSON.parse(json)
}

export function generateUserId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function generateShareLink(userName, predictions) {
  const baseUrl = window.location.origin + window.location.pathname
  const encoded = encodePredictions(predictions)
  return `${baseUrl}?user=${encodeURIComponent(userName)}&data=${encoded}`
}

export function exportToJSON(userName, predictions) {
  const data = {
    user: userName,
    exportedAt: new Date().toISOString(),
    predictions,
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `quiniela-${userName}-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToCSV(userName, predictions) {
  const headers = ['MatchID', 'Ronda', 'Fecha', 'Local', 'Visitante', 'PredLocal', 'PredVisitante']
  const rows = [headers.join(',')]

  groups.forEach((group) => {
    group.matches.forEach((match) => {
      const pred = predictions[match.id] || { home: '', away: '' }
      const homeTeam = group.teams.find((t) => t.id === match.homeTeam)
      const awayTeam = group.teams.find((t) => t.id === match.awayTeam)
      rows.push([
        match.id,
        `Grupo ${group.id}`,
        match.date,
        homeTeam.name,
        awayTeam.name,
        pred.home,
        pred.away,
      ].join(','))
    })
  })

  Object.values(knockoutMatches).forEach((match) => {
    const pred = predictions[match.id] || { home: '', away: '' }
    const slot1Label = match.slot1.type === 'group'
      ? `${match.slot1.position}° Grupo ${match.slot1.group}`
      : match.slot1.type === 'third'
      ? `3° (${match.slot1.eligibleGroups.join('/')})`
      : `Ganador ${match.slot1.match}`
    const slot2Label = match.slot2.type === 'group'
      ? `${match.slot2.position}° Grupo ${match.slot2.group}`
      : match.slot2.type === 'third'
      ? `3° (${match.slot2.eligibleGroups.join('/')})`
      : `Ganador ${match.slot2.match}`

    rows.push([
      match.id,
      roundLabels[match.round],
      match.date,
      slot1Label,
      slot2Label,
      pred.home,
      pred.away,
    ].join(','))
  })

  const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `quiniela-${userName}-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
