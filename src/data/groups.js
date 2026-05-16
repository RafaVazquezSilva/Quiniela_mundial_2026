export const groups = [
  {
    id: 'A',
    teams: [
      { id: 'mex', name: 'México', code: 'mx' },
      { id: 'rsa', name: 'Sudáfrica', code: 'za' },
      { id: 'kor', name: 'Corea del Sur', code: 'kr' },
      { id: 'cze', name: 'Rep. Checa', code: 'cz' },
    ],
    matches: [
      { id: 'a1', homeTeam: 'mex', awayTeam: 'rsa', date: '2026-06-11', time: '21:00', stadium: 'Estadio Azteca (CDMX)' },
      { id: 'a2', homeTeam: 'kor', awayTeam: 'cze', date: '2026-06-12', time: '04:00', stadium: 'Estadio Akron (Guadalajara)' },
      { id: 'a3', homeTeam: 'cze', awayTeam: 'rsa', date: '2026-06-18', time: '18:00', stadium: 'Mercedes-Benz Stadium (Atlanta)' },
      { id: 'a4', homeTeam: 'mex', awayTeam: 'kor', date: '2026-06-19', time: '03:00', stadium: 'Estadio Akron (Guadalajara)' },
      { id: 'a5', homeTeam: 'cze', awayTeam: 'mex', date: '2026-06-25', time: '03:00', stadium: 'Estadio Azteca (CDMX)' },
      { id: 'a6', homeTeam: 'rsa', awayTeam: 'kor', date: '2026-06-25', time: '03:00', stadium: 'Estadio BBVA (Monterrey)' },
    ],
  },
  {
    id: 'B',
    teams: [
      { id: 'can', name: 'Canadá', code: 'ca' },
      { id: 'bih', name: 'Bosnia y Herzegovina', code: 'ba' },
      { id: 'qat', name: 'Qatar', code: 'qa' },
      { id: 'sui', name: 'Suiza', code: 'ch' },
    ],
    matches: [
      { id: 'b1', homeTeam: 'can', awayTeam: 'bih', date: '2026-06-12', time: '21:00', stadium: 'BMO Field (Toronto)' },
      { id: 'b2', homeTeam: 'qat', awayTeam: 'sui', date: '2026-06-13', time: '21:00', stadium: "Levi's Stadium (San Francisco)" },
      { id: 'b3', homeTeam: 'sui', awayTeam: 'bih', date: '2026-06-18', time: '21:00', stadium: 'SoFi Stadium (Los Ángeles)' },
      { id: 'b4', homeTeam: 'can', awayTeam: 'qat', date: '2026-06-19', time: '00:00', stadium: 'BC Place (Vancouver)' },
      { id: 'b5', homeTeam: 'sui', awayTeam: 'can', date: '2026-06-24', time: '21:00', stadium: 'BC Place (Vancouver)' },
      { id: 'b6', homeTeam: 'bih', awayTeam: 'qat', date: '2026-06-24', time: '21:00', stadium: 'Lumen Field (Seattle)' },
    ],
  },
  {
    id: 'C',
    teams: [
      { id: 'bra', name: 'Brasil', code: 'br' },
      { id: 'mar', name: 'Marruecos', code: 'ma' },
      { id: 'hai', name: 'Haití', code: 'ht' },
      { id: 'sco', name: 'Escocia', code: 'gb-sct' },
    ],
    matches: [
      { id: 'c1', homeTeam: 'bra', awayTeam: 'mar', date: '2026-06-14', time: '00:00', stadium: 'MetLife Stadium (NY/NJ)' },
      { id: 'c2', homeTeam: 'hai', awayTeam: 'sco', date: '2026-06-14', time: '03:00', stadium: 'Gillette Stadium (Boston)' },
      { id: 'c3', homeTeam: 'sco', awayTeam: 'mar', date: '2026-06-20', time: '00:00', stadium: 'Gillette Stadium (Boston)' },
      { id: 'c4', homeTeam: 'bra', awayTeam: 'hai', date: '2026-06-20', time: '03:00', stadium: 'Lincoln Financial Field (Filadelfia)' },
      { id: 'c5', homeTeam: 'bra', awayTeam: 'sco', date: '2026-06-25', time: '00:00', stadium: 'Hard Rock Stadium (Miami)' },
      { id: 'c6', homeTeam: 'mar', awayTeam: 'hai', date: '2026-06-25', time: '00:00', stadium: 'Mercedes-Benz Stadium (Atlanta)' },
    ],
  },
  {
    id: 'D',
    teams: [
      { id: 'usa', name: 'Estados Unidos', code: 'us' },
      { id: 'par', name: 'Paraguay', code: 'py' },
      { id: 'aus', name: 'Australia', code: 'au' },
      { id: 'tur', name: 'Turquía', code: 'tr' },
    ],
    matches: [
      { id: 'd1', homeTeam: 'usa', awayTeam: 'par', date: '2026-06-13', time: '03:00', stadium: 'SoFi Stadium (Los Ángeles)' },
      { id: 'd2', homeTeam: 'aus', awayTeam: 'tur', date: '2026-06-14', time: '06:00', stadium: 'BC Place (Vancouver)' },
      { id: 'd3', homeTeam: 'usa', awayTeam: 'aus', date: '2026-06-19', time: '21:00', stadium: 'Lumen Field (Seattle)' },
      { id: 'd4', homeTeam: 'tur', awayTeam: 'par', date: '2026-06-20', time: '03:00', stadium: "Levi's Stadium (San Francisco)" },
      { id: 'd5', homeTeam: 'tur', awayTeam: 'usa', date: '2026-06-26', time: '04:00', stadium: 'SoFi Stadium (Los Ángeles)' },
      { id: 'd6', homeTeam: 'par', awayTeam: 'aus', date: '2026-06-26', time: '04:00', stadium: "Levi's Stadium (San Francisco)" },
    ],
  },
  {
    id: 'E',
    teams: [
      { id: 'ger', name: 'Alemania', code: 'de' },
      { id: 'cuw', name: 'Curazao', code: 'cw' },
      { id: 'civ', name: 'Costa de Marfil', code: 'ci' },
      { id: 'ecu', name: 'Ecuador', code: 'ec' },
    ],
    matches: [
      { id: 'e1', homeTeam: 'ger', awayTeam: 'cuw', date: '2026-06-14', time: '19:00', stadium: 'NRG Stadium (Houston)' },
      { id: 'e2', homeTeam: 'civ', awayTeam: 'ecu', date: '2026-06-15', time: '01:00', stadium: 'Lincoln Financial Field (Filadelfia)' },
      { id: 'e3', homeTeam: 'ger', awayTeam: 'civ', date: '2026-06-20', time: '22:00', stadium: 'BMO Field (Toronto)' },
      { id: 'e4', homeTeam: 'ecu', awayTeam: 'cuw', date: '2026-06-21', time: '04:00', stadium: 'Arrowhead Stadium (Kansas City)' },
      { id: 'e5', homeTeam: 'cuw', awayTeam: 'civ', date: '2026-06-25', time: '22:00', stadium: 'Lincoln Financial Field (Filadelfia)' },
      { id: 'e6', homeTeam: 'ecu', awayTeam: 'ger', date: '2026-06-25', time: '22:00', stadium: 'MetLife Stadium (NY/NJ)' },
    ],
  },
  {
    id: 'F',
    teams: [
      { id: 'ned', name: 'Países Bajos', code: 'nl' },
      { id: 'jpn', name: 'Japón', code: 'jp' },
      { id: 'swe', name: 'Suecia', code: 'se' },
      { id: 'tun', name: 'Túnez', code: 'tn' },
    ],
    matches: [
      { id: 'f1', homeTeam: 'ned', awayTeam: 'jpn', date: '2026-06-14', time: '22:00', stadium: 'AT&T Stadium (Dallas)' },
      { id: 'f2', homeTeam: 'swe', awayTeam: 'tun', date: '2026-06-15', time: '04:00', stadium: 'Estadio BBVA (Monterrey)' },
      { id: 'f3', homeTeam: 'ned', awayTeam: 'swe', date: '2026-06-20', time: '19:00', stadium: 'NRG Stadium (Houston)' },
      { id: 'f4', homeTeam: 'tun', awayTeam: 'jpn', date: '2026-06-21', time: '04:00', stadium: 'Estadio BBVA (Monterrey)' },
      { id: 'f5', homeTeam: 'jpn', awayTeam: 'swe', date: '2026-06-26', time: '01:00', stadium: 'AT&T Stadium (Dallas)' },
      { id: 'f6', homeTeam: 'tun', awayTeam: 'ned', date: '2026-06-26', time: '01:00', stadium: 'Arrowhead Stadium (Kansas City)' },
    ],
  },
  {
    id: 'G',
    teams: [
      { id: 'bel', name: 'Bélgica', code: 'be' },
      { id: 'egy', name: 'Egipto', code: 'eg' },
      { id: 'irn', name: 'Irán', code: 'ir' },
      { id: 'nzl', name: 'Nueva Zelanda', code: 'nz' },
    ],
    matches: [
      { id: 'g1', homeTeam: 'bel', awayTeam: 'egy', date: '2026-06-15', time: '21:00', stadium: 'Lumen Field (Seattle)' },
      { id: 'g2', homeTeam: 'irn', awayTeam: 'nzl', date: '2026-06-16', time: '03:00', stadium: 'SoFi Stadium (Los Ángeles)' },
      { id: 'g3', homeTeam: 'bel', awayTeam: 'irn', date: '2026-06-21', time: '21:00', stadium: 'SoFi Stadium (Los Ángeles)' },
      { id: 'g4', homeTeam: 'nzl', awayTeam: 'egy', date: '2026-06-22', time: '03:00', stadium: 'BC Place (Vancouver)' },
      { id: 'g5', homeTeam: 'egy', awayTeam: 'irn', date: '2026-06-27', time: '05:00', stadium: 'Lumen Field (Seattle)' },
      { id: 'g6', homeTeam: 'nzl', awayTeam: 'bel', date: '2026-06-27', time: '05:00', stadium: 'BC Place (Vancouver)' },
    ],
  },
  {
    id: 'H',
    teams: [
      { id: 'esp', name: 'España', code: 'es' },
      { id: 'cpv', name: 'Cabo Verde', code: 'cv' },
      { id: 'ksa', name: 'Arabia Saudita', code: 'sa' },
      { id: 'uru', name: 'Uruguay', code: 'uy' },
    ],
    matches: [
      { id: 'h1', homeTeam: 'esp', awayTeam: 'cpv', date: '2026-06-15', time: '18:00', stadium: 'Mercedes-Benz Stadium (Atlanta)' },
      { id: 'h2', homeTeam: 'ksa', awayTeam: 'uru', date: '2026-06-16', time: '00:00', stadium: 'Hard Rock Stadium (Miami)' },
      { id: 'h3', homeTeam: 'esp', awayTeam: 'ksa', date: '2026-06-21', time: '18:00', stadium: 'Mercedes-Benz Stadium (Atlanta)' },
      { id: 'h4', homeTeam: 'uru', awayTeam: 'cpv', date: '2026-06-22', time: '00:00', stadium: 'Hard Rock Stadium (Miami)' },
      { id: 'h5', homeTeam: 'cpv', awayTeam: 'ksa', date: '2026-06-27', time: '02:00', stadium: 'NRG Stadium (Houston)' },
      { id: 'h6', homeTeam: 'uru', awayTeam: 'esp', date: '2026-06-27', time: '02:00', stadium: 'Estadio Akron (Guadalajara)' },
    ],
  },
  {
    id: 'I',
    teams: [
      { id: 'fra', name: 'Francia', code: 'fr' },
      { id: 'sen', name: 'Senegal', code: 'sn' },
      { id: 'irq', name: 'Irak', code: 'iq' },
      { id: 'nor', name: 'Noruega', code: 'no' },
    ],
    matches: [
      { id: 'i1', homeTeam: 'fra', awayTeam: 'sen', date: '2026-06-16', time: '21:00', stadium: 'MetLife Stadium (NY/NJ)' },
      { id: 'i2', homeTeam: 'irq', awayTeam: 'nor', date: '2026-06-17', time: '00:00', stadium: 'Gillette Stadium (Boston)' },
      { id: 'i3', homeTeam: 'fra', awayTeam: 'irq', date: '2026-06-22', time: '23:00', stadium: 'Lincoln Financial Field (Filadelfia)' },
      { id: 'i4', homeTeam: 'nor', awayTeam: 'sen', date: '2026-06-23', time: '02:00', stadium: 'MetLife Stadium (NY/NJ)' },
      { id: 'i5', homeTeam: 'fra', awayTeam: 'nor', date: '2026-06-26', time: '21:00', stadium: 'Por confirmar' },
      { id: 'i6', homeTeam: 'sen', awayTeam: 'irq', date: '2026-06-26', time: '21:00', stadium: 'BMO Field (Toronto)' },
    ],
  },
  {
    id: 'J',
    teams: [
      { id: 'arg', name: 'Argentina', code: 'ar' },
      { id: 'alg', name: 'Argelia', code: 'dz' },
      { id: 'aut', name: 'Austria', code: 'at' },
      { id: 'jor', name: 'Jordania', code: 'jo' },
    ],
    matches: [
      { id: 'j1', homeTeam: 'arg', awayTeam: 'alg', date: '2026-06-17', time: '03:00', stadium: 'Arrowhead Stadium (Kansas City)' },
      { id: 'j2', homeTeam: 'aut', awayTeam: 'jor', date: '2026-06-17', time: '06:00', stadium: "Levi's Stadium (San Francisco)" },
      { id: 'j3', homeTeam: 'arg', awayTeam: 'aut', date: '2026-06-22', time: '19:00', stadium: 'AT&T Stadium (Dallas)' },
      { id: 'j4', homeTeam: 'jor', awayTeam: 'alg', date: '2026-06-23', time: '05:00', stadium: "Levi's Stadium (San Francisco)" },
      { id: 'j5', homeTeam: 'alg', awayTeam: 'aut', date: '2026-06-28', time: '04:00', stadium: 'Arrowhead Stadium (Kansas City)' },
      { id: 'j6', homeTeam: 'jor', awayTeam: 'arg', date: '2026-06-28', time: '04:00', stadium: 'AT&T Stadium (Dallas)' },
    ],
  },
  {
    id: 'K',
    teams: [
      { id: 'por', name: 'Portugal', code: 'pt' },
      { id: 'cod', name: 'RD de Congo', code: 'cd' },
      { id: 'uzb', name: 'Uzbekistán', code: 'uz' },
      { id: 'col', name: 'Colombia', code: 'co' },
    ],
    matches: [
      { id: 'k1', homeTeam: 'por', awayTeam: 'cod', date: '2026-06-17', time: '19:00', stadium: 'NRG Stadium (Houston)' },
      { id: 'k2', homeTeam: 'uzb', awayTeam: 'col', date: '2026-06-18', time: '04:00', stadium: 'Estadio Azteca (CDMX)' },
      { id: 'k3', homeTeam: 'por', awayTeam: 'uzb', date: '2026-06-23', time: '19:00', stadium: 'NRG Stadium (Houston)' },
      { id: 'k4', homeTeam: 'col', awayTeam: 'cod', date: '2026-06-24', time: '04:00', stadium: 'Estadio Akron (Guadalajara)' },
      { id: 'k5', homeTeam: 'col', awayTeam: 'por', date: '2026-06-28', time: '01:30', stadium: 'Hard Rock Stadium (Miami)' },
      { id: 'k6', homeTeam: 'cod', awayTeam: 'uzb', date: '2026-06-28', time: '01:30', stadium: 'Mercedes-Benz Stadium (Atlanta)' },
    ],
  },
  {
    id: 'L',
    teams: [
      { id: 'eng', name: 'Inglaterra', code: 'gb-eng' },
      { id: 'cro', name: 'Croacia', code: 'hr' },
      { id: 'gha', name: 'Ghana', code: 'gh' },
      { id: 'pan', name: 'Panamá', code: 'pa' },
    ],
    matches: [
      { id: 'l1', homeTeam: 'eng', awayTeam: 'cro', date: '2026-06-17', time: '22:00', stadium: 'AT&T Stadium (Dallas)' },
      { id: 'l2', homeTeam: 'gha', awayTeam: 'pan', date: '2026-06-18', time: '01:00', stadium: 'BMO Field (Toronto)' },
      { id: 'l3', homeTeam: 'eng', awayTeam: 'gha', date: '2026-06-23', time: '22:00', stadium: 'Gillette Stadium (Boston)' },
      { id: 'l4', homeTeam: 'pan', awayTeam: 'cro', date: '2026-06-24', time: '01:00', stadium: 'BMO Field (Toronto)' },
      { id: 'l5', homeTeam: 'pan', awayTeam: 'eng', date: '2026-06-27', time: '23:00', stadium: 'MetLife Stadium (NY/NJ)' },
      { id: 'l6', homeTeam: 'cro', awayTeam: 'gha', date: '2026-06-27', time: '23:00', stadium: 'Lincoln Financial Field (Filadelfia)' },
    ],
  },
]

export function getTeam(code) {
  for (const group of groups) {
    const team = group.teams.find((t) => t.code === code)
    if (team) return team
  }
  return null
}

export function getFlagUrl(code) {
  return `https://flagcdn.com/w40/${code}.png`
}
