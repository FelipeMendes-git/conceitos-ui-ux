import { useState } from 'react'
import styles from './lab.module.css'

/*
 * LABORATÓRIO 2 — O fundo importa.
 *
 * O mesmo painel de vidro sobre quatro fundos. Ensina que o efeito depende do
 * que está atrás, e não só do painel.
 */

const BACKGROUNDS = [
  {
    id: 'plain',
    name: 'Liso',
    text: 'Sem nada atrás, não há o que desfocar: o painel vira um retângulo apagado.',
  },
  {
    id: 'soft',
    name: 'Degradê suave',
    text: 'Com uma transição suave de cor o efeito existe, mas quase não se nota.',
  },
  {
    id: 'shapes',
    name: 'Formas de cor',
    text: 'Formas grandes e bem definidas: é aqui que o vidro funciona melhor.',
  },
  {
    id: 'busy',
    name: 'Cheio de detalhes',
    text: 'Fundo com muitos detalhes: mesmo desfocado, ele continua disputando atenção com o texto.',
  },
]

export default function BackgroundDemo() {
  const [selected, setSelected] = useState('shapes')
  const current = BACKGROUNDS.find((background) => background.id === selected)

  return (
    <div className={styles.demo}>
      <h3 className={styles.demoTitle}>O fundo importa</h3>

      <div className={styles.options} role="group" aria-label="Fundo atrás do painel">
        {BACKGROUNDS.map((background) => (
          <button
            key={background.id}
            type="button"
            className={styles.option}
            aria-pressed={selected === background.id}
            onClick={() => setSelected(background.id)}
          >
            {background.name}
          </button>
        ))}
      </div>

      <div className={`${styles.stage} ${styles.wide} ${styles[selected]}`}>
        <div className={styles.specimen}>
          <p className={styles.specimenTitle}>Mesmo painel</p>
          <p className={styles.specimenText}>Só o fundo mudou.</p>
        </div>
      </div>

      <p className={styles.verdict} aria-live="polite">
        {current.text}
      </p>
    </div>
  )
}
