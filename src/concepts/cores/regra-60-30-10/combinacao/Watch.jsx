import { useId } from 'react'
import styles from './combinacao.module.css'

/*
 * O relógio de trilha: um objeto desenhado com a receita da página.
 * A caixa e a pulseira levam a secundária; o botão de ação, o anel de
 * progresso e o gráfico levam o destaque. Os volumes são degradês de branco
 * e preto translúcidos por cima da cor, para funcionarem em qualquer
 * combinação. Três etiquetas (60, 30 e 10) apontam cada papel.
 */

function Tag({ x, y, children }) {
  return (
    <g>
      <rect className={styles.tag} x={x - 19} y={y - 13} width="38" height="26" rx="13" />
      <text className={styles.tagText} x={x} y={y + 5} textAnchor="middle">
        {children}
      </text>
    </g>
  )
}

export default function Watch() {
  const id = useId()
  const volume = `${id}-volume`
  const metal = `${id}-metal`
  const glass = `${id}-glass`
  const area = `${id}-area`
  const strapTop = 'M98 0h104l6 120H92Z'
  const strapBottom = 'M92 300h116l-6 120H98Z'

  return (
    <svg className={styles.watch} viewBox="-90 0 480 420">
      <defs>
        <linearGradient id={volume} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.3" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.85" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.36" />
        </linearGradient>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={area} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={styles.stopAccent} stopOpacity="0.55" />
          <stop offset="1" className={styles.stopAccent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Pulseira */}
      <path className={styles.body} d={strapTop} />
      <path fill={`url(#${volume})`} d={strapTop} />
      <path className={styles.groove} d="M97 20h106M96 40h108M95 60h110M94 80h112M93 100h114" />
      <path className={styles.body} d={strapBottom} />
      <path fill={`url(#${volume})`} d={strapBottom} />
      <path className={styles.groove} d="M93 320h114M94 340h112" />
      {[350, 370, 390, 408].map((y) => (
        <ellipse key={y} className={styles.hole} cx="150" cy={y} rx="5" ry="3.6" />
      ))}

      {/* Botão de ação, coroa e botão lateral */}
      <rect className={styles.action} x="45" y="176" width="20" height="58" rx="7" />
      <rect fill={`url(#${volume})`} x="45" y="176" width="20" height="58" rx="7" />
      <rect className={styles.body} x="236" y="150" width="19" height="36" rx="7" />
      <rect fill={`url(#${metal})`} x="236" y="150" width="19" height="36" rx="7" />
      <path className={styles.groove} d="M249 156v24M245 156v24" />
      <rect className={styles.body} x="236" y="214" width="14" height="48" rx="6" />
      <rect fill={`url(#${metal})`} x="236" y="214" width="14" height="48" rx="6" />

      {/* Caixa */}
      <rect className={styles.body} x="58" y="103" width="184" height="214" rx="46" />
      <rect fill={`url(#${metal})`} x="58" y="103" width="184" height="214" rx="46" />
      <rect className={styles.bezel} x="67" y="112" width="166" height="196" rx="39" />
      <rect className={styles.face} x="72" y="117" width="156" height="186" rx="34" />

      {/* Mostrador */}
      <rect className={styles.track} x="83" y="128" width="134" height="164" rx="24" />
      <rect
        className={styles.progress}
        x="83"
        y="128"
        width="134"
        height="164"
        rx="24"
        pathLength="100"
        strokeDasharray="62 100"
      />
      <text className={styles.faceSmall} x="150" y="160" textAnchor="middle">
        qui 26
      </text>
      <text className={styles.faceTime} x="150" y="207" textAnchor="middle">
        10:09
      </text>
      <text className={styles.faceSmall} x="98" y="231">
        altitude
      </text>
      <text className={styles.faceValue} x="202" y="231" textAnchor="end">
        2.140 m
      </text>
      <path
        fill={`url(#${area})`}
        d="M98 274l11-7 12 4 13-15 12 6 14-16 14 6 13-12 15 6v32H98Z"
      />
      <path className={styles.chart} d="M98 274l11-7 12 4 13-15 12 6 14-16 14 6 13-12 15 6" />
      <circle className={styles.chartDot} cx="187" cy="240" r="3.6" />
      <rect fill={`url(#${glass})`} x="72" y="117" width="156" height="186" rx="34" />

      {/* As etiquetas dos três papéis */}
      <path className={styles.leader} d="M204 56h62M45 205h-66" />
      <circle className={styles.leaderDot} cx="204" cy="56" r="3.5" />
      <circle className={styles.leaderDot} cx="45" cy="205" r="3.5" />
      <Tag x={285} y={56}>
        30
      </Tag>
      <Tag x={-40} y={205}>
        10
      </Tag>
      <Tag x={330} y={368}>
        60
      </Tag>
    </svg>
  )
}
