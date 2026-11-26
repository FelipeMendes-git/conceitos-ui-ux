import { useId, useState } from 'react'
import Switch from './Switch.jsx'
import styles from './lab.module.css'

/*
 * LABORATÓRIO 3 — Dá para ler?
 *
 * O leitor desliza um painel de vidro sobre faixas que vão do claro ao escuro.
 * Um indicador mostra o contraste do texto em cada posição. Ensina que a
 * leitura sobre vidro não é fixa, e que uma película mais forte garante um piso.
 */

// Faixas do fundo, da mais clara para a mais escura (vermelho, verde, azul).
const BANDS = [
  [246, 247, 251],
  [255, 217, 138],
  [255, 107, 74],
  [18, 181, 166],
  [47, 107, 255],
  [13, 19, 48],
]

const TEXT_COLOR = [13, 19, 48]
const PANEL_WIDTH = 28 // largura do painel, em % do palco

// Luminância relativa de uma cor: quão clara ela parece ao olho (0 a 1).
function luminance([red, green, blue]) {
  const channel = (value) => {
    const v = value / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue)
}

// Razão de contraste entre duas cores, de 1 (iguais) a 21 (preto sobre branco).
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

// Cor média do fundo debaixo do painel. O desfoque mistura as faixas, então a
// média das faixas cobertas é uma boa aproximação do que o olho vê.
function colorBehindPanel(left) {
  const bandWidth = 100 / BANDS.length
  const total = [0, 0, 0]
  BANDS.forEach((band, index) => {
    const start = index * bandWidth
    const overlap = Math.max(0, Math.min(left + PANEL_WIDTH, start + bandWidth) - Math.max(left, start))
    band.forEach((value, channel) => {
      total[channel] += (value * overlap) / PANEL_WIDTH
    })
  })
  return total
}

function rate(ratio) {
  if (ratio >= 7) return { label: 'Fácil de ler', level: 'ok' }
  if (ratio >= 4.5) return { label: 'Dá para ler', level: 'ok' }
  if (ratio >= 3) return { label: 'No limite', level: 'warn' }
  return { label: 'Difícil de ler', level: 'avoid' }
}

export default function ReadabilityDemo() {
  const [position, setPosition] = useState(8)
  const [strongFilm, setStrongFilm] = useState(false)
  const sliderId = useId()

  const film = strongFilm ? 0.62 : 0.16
  const left = (position / 100) * (100 - PANEL_WIDTH)

  // Película branca por cima da cor média do fundo.
  const behind = colorBehindPanel(left)
  const surface = behind.map((value) => value * (1 - film) + 255 * film)
  const ratio = contrast(TEXT_COLOR, surface)
  const rating = rate(ratio)

  return (
    <div className={styles.demo}>
      <h3 className={styles.demoTitle}>Dá para ler?</h3>

      <div className={`${styles.stage} ${styles.wide} ${styles.bands}`}>
        {BANDS.map((band) => (
          <span key={band.join()} style={{ background: `rgb(${band.join(' ')})` }} />
        ))}
        <div
          className={`${styles.specimen} ${styles.sliding}`}
          style={{
            '--film': `rgb(255 255 255 / ${film})`,
            left: `${left}%`,
            width: `${PANEL_WIDTH}%`,
          }}
        >
          <p className={styles.specimenTitle}>Leia aqui</p>
          <p className={styles.specimenText}>O mesmo texto, em outro lugar.</p>
        </div>
      </div>

      <div className={styles.readControls}>
        <div className={styles.slider}>
          <label htmlFor={sliderId} className={styles.sliderName}>
            Posição do painel
          </label>
          <input
            id={sliderId}
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
          />
        </div>
        <Switch
          checked={strongFilm}
          onChange={setStrongFilm}
          name="Película mais forte"
          role="Menos transparência, mais garantia de leitura."
        />
      </div>

      <p className={styles.verdict} aria-live="polite">
        <span className={styles.rating} data-level={rating.level}>
          <span className={styles.ratingMark} aria-hidden="true" />
          {rating.label}
        </span>{' '}
        Contraste de {ratio.toFixed(1).replace('.', ',')} para 1. O mínimo
        recomendado para texto é 4,5 para 1.
      </p>
    </div>
  )
}
