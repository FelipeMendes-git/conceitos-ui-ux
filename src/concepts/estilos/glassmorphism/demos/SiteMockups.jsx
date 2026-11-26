import { SITE_TYPES, VERDICTS } from '../../../../shared/siteTypes.js'
import Verdict from './Verdict.jsx'
import styles from './examples.module.css'

/*
 * ONDE APLICAR: uma maquete esquemática para cada tipo de site, mostrando
 * ONDE o vidro entra (ou não deveria entrar), com o veredito e o porquê.
 *
 * Cada maquete é uma lista de blocos posicionados em porcentagem:
 *   [esquerda, topo, largura, altura, tipo]
 * Tipos: uma cor (bloco sólido), 'line' (linha de texto) ou 'glass' (vidro).
 */

const CORAL = '#ff6b4a'
const AMBER = '#ffb020'
const TEAL = '#12b5a6'
const COBALT = '#2f6bff'
const PAPER = '#ffffff'

const MOCKUPS = {
  // Loja: vidro só na barra do topo, que flutua sobre as fotos dos produtos.
  ecommerce: [
    [5, 12, 28, 52, CORAL],
    [36, 12, 28, 52, AMBER],
    [67, 12, 28, 52, TEAL],
    [5, 70, 18, 4, 'line'],
    [36, 70, 18, 4, 'line'],
    [67, 70, 18, 4, 'line'],
    [5, 79, 10, 4, 'line'],
    [36, 79, 10, 4, 'line'],
    [67, 79, 10, 4, 'line'],
    [3, 5, 94, 17, 'glass'],
  ],
  // Landing page: um cartão de vidro com a chamada, sobre uma forma de cor.
  landing: [
    [42, -20, 70, 110, COBALT, '50%'],
    [56, 46, 34, 60, AMBER, '50%'],
    [8, 16, 56, 68, 'glass'],
    [14, 28, 38, 7, 'line'],
    [14, 41, 30, 4, 'line'],
    [14, 49, 24, 4, 'line'],
    [14, 64, 20, 9, 'ink'],
  ],
  // Dashboard: os dados ficam em blocos sólidos; vidro só na janela por cima.
  dashboard: [
    [4, 8, 20, 84, PAPER],
    [28, 8, 32, 38, PAPER],
    [64, 8, 32, 38, PAPER],
    [28, 52, 68, 40, PAPER],
    [32, 16, 14, 4, 'line'],
    [68, 16, 14, 4, 'line'],
    [32, 60, 22, 4, 'line'],
    [32, 68, 56, 3, 'line'],
    [32, 75, 48, 3, 'line'],
    [70, 26, 20, 14, TEAL],
    [26, 24, 48, 54, 'glass'],
    [32, 34, 24, 5, 'line'],
    [32, 46, 34, 3, 'line'],
    [32, 62, 16, 8, 'ink'],
  ],
  // App de celular: conteúdo colorido rolando por baixo de uma barra de vidro.
  app: [
    [34, 2, 32, 96, PAPER, '14%'],
    [38, 8, 24, 22, CORAL, '8%'],
    [38, 33, 24, 22, COBALT, '8%'],
    [38, 58, 24, 22, AMBER, '8%'],
    [38, 83, 24, 12, TEAL, '8%'],
    [37, 76, 26, 16, 'glass'],
  ],
  // Blog: texto longo inteiro sobre vidro. É o exemplo do que evitar.
  blog: [
    [-10, -20, 60, 90, CORAL, '50%'],
    [56, 30, 60, 90, COBALT, '50%'],
    [14, 8, 72, 84, 'glass'],
    [20, 16, 40, 6, 'line'],
    [20, 28, 60, 3, 'line'],
    [20, 35, 60, 3, 'line'],
    [20, 42, 56, 3, 'line'],
    [20, 49, 60, 3, 'line'],
    [20, 56, 44, 3, 'line'],
    [20, 66, 60, 3, 'line'],
    [20, 73, 58, 3, 'line'],
    [20, 80, 36, 3, 'line'],
  ],
  // Portfólio: imagens grandes com legendas curtas em vidro.
  portfolio: [
    [5, 8, 43, 84, TEAL],
    [52, 8, 43, 84, CORAL],
    [9, 62, 35, 24, 'glass'],
    [56, 62, 35, 24, 'glass'],
    [13, 70, 20, 5, 'line'],
    [60, 70, 20, 5, 'line'],
    [13, 79, 12, 3, 'line'],
    [60, 79, 12, 3, 'line'],
  ],
}

const VERDICT_DATA = {
  ecommerce: {
    level: 'warn',
    why: 'Bom na barra fixa e no carrinho flutuante. Ruim na vitrine e no pagamento: a foto do produto e o botão de comprar pedem contraste máximo, e muita gente compra de celular simples.',
  },
  landing: {
    level: 'ok',
    why: 'Pouco texto e muito impacto. Funciona na abertura e para destacar um cartão, como o da oferta principal.',
  },
  dashboard: {
    level: 'warn',
    why: 'É comum em painéis, mas dados densos pedem superfícies sólidas. Reserve o vidro para o que aparece por cima: janelas, menus, painéis laterais.',
  },
  app: {
    level: 'ok',
    why: 'É a linguagem nativa do iPhone em barras e painéis. Vale testar em celulares de entrada.',
  },
  blog: {
    level: 'avoid',
    why: 'Leitura longa sobre fundo translúcido cansa. No máximo, um cabeçalho fixo.',
  },
  portfolio: {
    level: 'ok',
    why: 'Mostra domínio visual, e o conteúdo é curto: legendas sobre imagens.',
  },
}

function Block({ block }) {
  const [left, top, width, height, kind, radius] = block
  const position = { left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }

  if (kind === 'glass') return <span className={styles.mockGlass} style={position} />
  if (kind === 'line') return <span className={styles.mockLine} style={position} />
  if (kind === 'ink') return <span className={styles.mockInk} style={position} />
  return (
    <span
      className={styles.mockBlock}
      style={{ ...position, background: kind, borderRadius: radius }}
    />
  )
}

export default function SiteMockups() {
  return (
    <ul className={styles.sites}>
      {SITE_TYPES.map((type) => {
        const data = VERDICT_DATA[type.id]
        return (
          <li key={type.id} className={styles.site}>
            <div className={styles.mockup} aria-hidden="true">
              {MOCKUPS[type.id].map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </div>
            <h3 className={styles.siteName}>{type.label}</h3>
            <p className={styles.siteVerdict}>
              <Verdict level={data.level}>{VERDICTS[data.level]}</Verdict>
            </p>
            <p className={styles.why}>{data.why}</p>
          </li>
        )
      })}
    </ul>
  )
}
