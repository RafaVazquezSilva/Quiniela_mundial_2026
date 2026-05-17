import { generateUserId } from './share'
import { groups } from '../data/groups'
import { knockoutMatches } from '../data/knockout'
import { getKnockoutPoints } from './knockout'

const USERS_KEY = 'quiniela-users'
const CURRENT_USER_KEY = 'quiniela-current-user'

export function getUsers() {
  const saved = localStorage.getItem(USERS_KEY)
  return saved ? JSON.parse(saved) : {}
}

export function saveUser(user) {
  const users = getUsers()
  users[user.id] = user
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getCurrentUser() {
  const id = localStorage.getItem(CURRENT_USER_KEY)
  if (!id) return null
  const users = getUsers()
  return users[id] || null
}

export function setCurrentUser(id) {
  localStorage.setItem(CURRENT_USER_KEY, id)
}

export function createCurrentUser(name) {
  const id = generateUserId()
  const user = {
    id,
    name,
    predictions: {},
    createdAt: new Date().toISOString(),
  }
  saveUser(user)
  setCurrentUser(id)
  return user
}

export function importUser(name, predictions) {
  const users = getUsers()
  const existing = Object.values(users).find(
    (u) => JSON.stringify(u.predictions) === JSON.stringify(predictions)
  )
  if (existing) return existing

  const id = generateUserId()
  const user = {
    id,
    name,
    predictions,
    createdAt: new Date().toISOString(),
  }
  saveUser(user)
  return user
}

export function deleteUser(userId) {
  const users = getUsers()
  delete users[userId]
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

  if (localStorage.getItem(CURRENT_USER_KEY) === userId) {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function calculateUserPoints(user, results, knockoutResults = {}) {
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

      const predHome = parseInt(prediction.home)
      const predAway = parseInt(prediction.away)
      const resHome = parseInt(result.home)
      const resAway = parseInt(result.away)

      if (predHome === resHome && predAway === resAway) {
        totalPoints += 10
        exactMatches++
        correctResults++
        return
      }

      if (predHome - predAway === resHome - resAway) {
        totalPoints += 7
        correctResults++
        return
      }

      if (
        (predHome > predAway && resHome > resAway) ||
        (predHome < predAway && resHome < resAway) ||
        (predHome === predAway && resHome === resAway)
      ) {
        totalPoints += 3
        correctResults++
      }
    })
  })

  const knockoutPoints = getKnockoutPoints(user, knockoutResults)

  return {
    totalPoints: totalPoints + knockoutPoints.totalPoints,
    groupPoints: totalPoints,
    knockoutPoints: knockoutPoints.totalPoints,
    correctResults: correctResults + knockoutPoints.correctPredictions,
    exactMatches: exactMatches + knockoutPoints.exactMatches,
    totalMatches: totalMatches + knockoutPoints.totalMatches,
  }
}

export function getRanking(results, knockoutResults = {}) {
  const users = getUsers()
  return Object.values(users)
    .filter((user) => {
      const hasPredictions = Object.values(user.predictions).some(
        (p) => p.home !== '' || p.away !== ''
      )
      return hasPredictions
    })
    .map((user) => ({
      ...user,
      ...calculateUserPoints(user, results, knockoutResults),
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
}
