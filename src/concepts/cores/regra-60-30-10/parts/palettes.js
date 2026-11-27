/*
 * As combinações com que a página se pinta. Cada uma traz as três cores nos
 * seus papéis, a tinta do texto sobre cada uma e uma versão do destaque
 * legível como texto sobre o fundo (c10t), usada no menu e no contorno de
 * foco. As leituras ("says", "fits") são convenções de guias de design e
 * marketing, não leis.
 *
 * A primeira é a combinação da casa. As três seguintes e as três últimas
 * vieram de referências do autor do guia; as do meio (marinho, neon e
 * sálvia), de guias de design.
 */
export const PALETTES = [
  {
    id: 'casa',
    name: 'Celadon, berinjela e fúcsia',
    colors: ['verde-celadon', 'berinjela', 'fúcsia'],
    c60: '#d5e5d8',
    c30: '#2a1530',
    c10: '#c8186f',
    ink60: '#2a1530',
    ink30: '#d5e5d8',
    ink10: '#f2f7f3',
    c10t: '#a1105a',
    says: 'Calma, com um ponto de ousadia.',
    fits: 'Casa, papelaria, cultura.',
  },
  {
    id: 'tempestade',
    name: 'Cinza-tempestade, preto fosco e laranja-segurança',
    colors: ['cinza-tempestade', 'preto fosco', 'laranja-segurança'],
    c60: '#9aa1a9',
    c30: '#1b1c1f',
    c10: '#ff6b00',
    ink60: '#101113',
    ink30: '#f1f2f4',
    ink10: '#101113',
    c10t: '#4f1d00',
    says: 'Técnico, robusto, pronto para a ação.',
    fits: 'Ferramentas, eletrônicos, equipamento esportivo.',
  },
  {
    id: 'deserto',
    name: 'Areia do deserto, verde-oliva e amarelo-sinal',
    colors: ['areia do deserto', 'verde-oliva', 'amarelo-sinal'],
    c60: '#d9c5a1',
    c30: '#4d5327',
    c10: '#ffc400',
    ink60: '#2a2c14',
    ink30: '#f3ead4',
    ink10: '#2a2c14',
    c10t: '#5a3e00',
    says: 'Aventura, resistência e ar livre.',
    fits: 'Camping, off-road, roupa utilitária.',
  },
  {
    id: 'polar',
    name: 'Branco polar, azul-glaciar e vermelho de corrida',
    colors: ['branco polar', 'azul-glaciar', 'vermelho de corrida'],
    c60: '#f3f6f9',
    c30: '#9cc3de',
    c10: '#d40a1e',
    ink60: '#0f2433',
    ink30: '#0f2433',
    ink10: '#ffffff',
    c10t: '#c00a1c',
    says: 'Limpeza, velocidade e precisão.',
    fits: 'Esporte, automóveis, náutica.',
  },
  {
    id: 'regata',
    name: 'Marinho, marfim e dourado',
    colors: ['marinho', 'marfim', 'dourado'],
    c60: '#16233f',
    c30: '#f3efe4',
    c10: '#c9a64a',
    ink60: '#f3efe4',
    ink30: '#16233f',
    ink10: '#16233f',
    c10t: '#c9a64a',
    says: 'Confiança, tradição e prestígio.',
    fits: 'Banco, advocacia, hotelaria.',
  },
  {
    id: 'neon',
    name: 'Preto, grafite e verde-neon',
    colors: ['preto', 'grafite', 'verde-neon'],
    c60: '#0e0f12',
    c30: '#30343d',
    c10: '#3bf08a',
    ink60: '#e4e7ec',
    ink30: '#e4e7ec',
    ink10: '#0e0f12',
    c10t: '#3bf08a',
    says: 'Noite, tecnologia e imersão.',
    fits: 'Música, jogos, streaming.',
  },
  {
    id: 'salvia',
    name: 'Areia, sálvia e terracota',
    colors: ['areia', 'sálvia', 'terracota'],
    c60: '#efe6d6',
    c30: '#7d9672',
    c10: '#b4532f',
    ink60: '#26331f',
    ink30: '#0f180c',
    ink10: '#fff8ef',
    c10t: '#8c3b1d',
    says: 'Calma, natureza e feito à mão.',
    fits: 'Bem-estar, cosmética natural, decoração.',
  },
  {
    id: 'tahine',
    name: 'Creme de tahine, azul-trovão e tangerina',
    colors: ['creme de tahine', 'azul-trovão', 'tangerina'],
    c60: '#efe3c8',
    c30: '#1c2a44',
    c10: '#ff7a1f',
    ink60: '#1c2a44',
    ink30: '#efe3c8',
    ink10: '#1c2a44',
    c10t: '#963b00',
    says: 'Confiança com calor.',
    fits: 'Educação, cafeterias, finanças para jovens.',
  },
  {
    id: 'antracite',
    name: 'Cinza-antracite, camurça-ostra e ciano polar',
    colors: ['cinza-antracite', 'camurça-ostra', 'ciano polar'],
    c60: '#2f3237',
    c30: '#cfc4b3',
    c10: '#1fd5ee',
    ink60: '#ece7de',
    ink30: '#24262a',
    ink10: '#0f1a1d',
    c10t: '#1fd5ee',
    says: 'Sóbrio, industrial e preciso.',
    fits: 'Automóveis, áudio, arquitetura.',
  },
  {
    id: 'pomelo',
    name: 'Rosa-pomelo, verde-abeto e amarelo-canário',
    colors: ['rosa-pomelo', 'verde-abeto', 'amarelo-canário'],
    c60: '#f4aaa6',
    c30: '#16332e',
    c10: '#e9f038',
    ink60: '#16332e',
    ink30: '#fbe3df',
    ink10: '#16332e',
    c10t: '#3f4200',
    says: 'Ousado, jovem e divertido.',
    fits: 'Moda, bebidas, festivais.',
  },
]

const VARIABLES = ['c60', 'c30', 'c10', 'ink60', 'ink30', 'ink10', 'c10t']

/** Pinta a página inteira: escreve as sete cores no elemento raiz. */
export function paintPage(palette) {
  const root = document.documentElement
  VARIABLES.forEach((key) => root.style.setProperty(`--${key}`, palette[key]))
}

/** Devolve a página à pele das outras telas. */
export function unpaintPage() {
  const root = document.documentElement
  VARIABLES.forEach((key) => root.style.removeProperty(`--${key}`))
}
