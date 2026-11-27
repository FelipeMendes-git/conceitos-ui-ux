/*
 * As cores da primeira tela de cinco sites, medidas em 26 de novembro de 2026.
 *
 * Como foi medido: página inicial de cada site, sem login, em janela de
 * 1440 × 900 px. As áreas de fotos, vídeos e ilustrações e os avisos de
 * cookies ficaram fora da conta; o que sobrou (a interface) foi contado
 * ponto a ponto numa captura da tela, agrupando as cores parecidas. Os
 * valores são arredondados: campanhas e fotos mudam a cada visita, então isto
 * é o retrato de um momento. "value" é a porcentagem da interface.
 */

const WHITE = { color: '#ffffff', ink: '#1a1a1a' }
const GRAYS = { color: '#8f8f8f', ink: '#ffffff' }

export const SITES = [
  {
    name: 'Mercado Livre',
    note: 'O amarelo da marca é a secundária, não o fundo. O destaque é o azul dos botões.',
    parts: [
      { name: 'branco', ...WHITE, value: 60 },
      { name: 'amarelo', color: '#ffe600', ink: '#1a1a1a', value: 26 },
      { name: 'textos e cinzas', ...GRAYS, value: 13 },
      { name: 'azul', color: '#3483fa', ink: '#ffffff', value: 1, text: 'menos de 1%' },
    ],
  },
  {
    name: 'Nubank',
    note: 'O roxo que todo mundo lembra ocupa uns 3% da tela.',
    parts: [
      { name: 'branco', ...WHITE, value: 95 },
      { name: 'textos e cinzas', ...GRAYS, value: 2 },
      { name: 'roxo', color: '#820ad1', ink: '#ffffff', value: 3 },
    ],
  },
  {
    name: 'Airbnb',
    note: 'As fotos trazem a cor; a interface recua, e o rosa cabe num botão.',
    parts: [
      { name: 'branco', ...WHITE, value: 93 },
      { name: 'textos e cinzas', ...GRAYS, value: 6.7 },
      { name: 'rosa', color: '#e61e4d', ink: '#ffffff', value: 0.3, text: 'menos de 1%' },
    ],
  },
  {
    name: 'Spotify',
    note: 'No tocador, o fundo quase preto domina e a cor vem das capas dos discos.',
    parts: [
      { name: 'quase preto', color: '#121212', ink: '#ffffff', value: 92 },
      { name: 'cinzas e branco', ...GRAYS, value: 8 },
    ],
  },
  {
    name: 'Duolingo',
    note: 'Fundo branco e um único botão verde.',
    parts: [
      { name: 'branco', ...WHITE, value: 95 },
      { name: 'textos e cinzas', ...GRAYS, value: 3.5 },
      { name: 'verde', color: '#58cc02', ink: '#1a1a1a', value: 1.5, text: 'cerca de 2%' },
    ],
  },
]
