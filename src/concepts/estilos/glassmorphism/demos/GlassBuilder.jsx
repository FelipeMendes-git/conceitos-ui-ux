import { useId, useState } from 'react'
import styles from './lab.module.css'

/*
 * LABORATÓRIO 1 — Construtor de vidro.
 *
 * Cinco controles com nomes de design. O painel de exemplo reage na hora, e
 * uma frase diz se o resultado ainda é vidro ou se saiu da faixa.
 */

const CONTROLS = [
  { id: 'blur', name: 'Desfoque', min: 0, max: 40, unit: '' },
  { id: 'film', name: 'Película', min: 0, max: 95, unit: '%' },
  { id: 'vivid', name: 'Vivacidade das cores', min: 100, max: 200, unit: '%' },
  { id: 'edge', name: 'Brilho da borda', min: 0, max: 100, unit: '%' },
  { id: 'radius', name: 'Arredondamento', min: 0, max: 48, unit: '' },
]

const START = { blur: 22, film: 34, vivid: 150, edge: 70, radius: 28 }

// Diz, em palavras, o que os valores atuais produzem.
function describe({ blur, film }) {
  if (film > 75) return 'Película forte demais: virou um painel sólido e o fundo deixou de aparecer.'
  if (blur < 6) return 'Desfoque baixo demais: virou transparência comum, e as formas atrapalham o texto.'
  if (film < 8) return 'Quase sem película: o painel some no fundo.'
  return 'Na faixa do vidro: o fundo aparece, mas não atrapalha.'
}

export default function GlassBuilder() {
  const [values, setValues] = useState(START)
  const baseId = useId()

  function set(id, value) {
    setValues((current) => ({ ...current, [id]: Number(value) }))
  }

  // Os controles viram variáveis do painel de exemplo.
  const specimenStyle = {
    '--film': `rgb(255 255 255 / ${values.film / 100})`,
    '--blur': `blur(${values.blur}px) saturate(${values.vivid}%)`,
    '--edge': `rgb(255 255 255 / ${values.edge / 100})`,
    '--radius': `${values.radius}px`,
  }

  return (
    <div className={styles.demo}>
      <h3 className={styles.demoTitle}>Construa o seu vidro</h3>

      <div className={styles.builder}>
        <div className={styles.sliders}>
          {CONTROLS.map((control) => (
            <div key={control.id} className={styles.slider}>
              <label htmlFor={`${baseId}-${control.id}`} className={styles.sliderName}>
                {control.name}
              </label>
              <output className={styles.sliderValue}>
                {values[control.id]}
                {control.unit}
              </output>
              <input
                id={`${baseId}-${control.id}`}
                type="range"
                min={control.min}
                max={control.max}
                value={values[control.id]}
                onChange={(event) => set(control.id, event.target.value)}
              />
            </div>
          ))}
          <button type="button" className={styles.reset} onClick={() => setValues(START)}>
            Voltar ao ponto de partida
          </button>
        </div>

        <div className={`${styles.stage} ${styles.shapes}`}>
          <div className={styles.specimen} style={specimenStyle}>
            <p className={styles.specimenTitle}>Seu painel</p>
            <p className={styles.specimenText}>Ainda dá para ler com facilidade?</p>
          </div>
        </div>
      </div>

      <p className={styles.verdict} aria-live="polite">
        {describe(values)}
      </p>
      <p className={styles.aside}>
        O controle de película é o mesmo tipo de ajuste que a Apple acabou
        entregando aos usuários do iPhone, depois das críticas de leitura ao
        Liquid Glass.
      </p>
    </div>
  )
}
