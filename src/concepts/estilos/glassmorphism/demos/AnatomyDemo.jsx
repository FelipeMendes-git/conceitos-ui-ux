import { useId, useState } from 'react'
import Switch from './Switch.jsx'
import pageStyles from '../styles.module.css'
import styles from './demos.module.css'

/*
 * ANATOMIA: as cinco peças do vidro, cada uma com um interruptor.
 *
 * À esquerda, os interruptores (dentro de um painel de vidro, como todo o
 * conteúdo da página). À direita, um painel de exemplo solto sobre o fundo:
 * é nele que as peças ligam e desligam.
 *
 * A primeira peça, o fundo vivo, pertence à página inteira; por isso o estado
 * dela vem de fora (props), e desligá-la apaga os círculos de toda a tela.
 */

const PANEL_PIECES = [
  {
    id: 'film',
    name: 'Película translúcida',
    role: 'Tinge o vidro e o separa do fundo.',
    missing: 'Sem a película, o painel quase some.',
  },
  {
    id: 'blur',
    name: 'Desfoque do fundo',
    role: 'É o efeito fosco. Garante a leitura.',
    missing: 'Sem o desfoque sobra só transparência: as formas nítidas brigam com o texto.',
  },
  {
    id: 'edge',
    name: 'Borda de luz',
    role: 'A aresta do vidro pegando luz. Define a forma.',
    missing: 'Sem a borda de luz, o painel perde o contorno.',
  },
  {
    id: 'shadow',
    name: 'Sombra suave',
    role: 'Descola o painel do fundo.',
    missing: 'Sem a sombra, o painel parece pintado no fundo.',
  },
]

export default function AnatomyDemo({ number, liveBackground, onLiveBackgroundChange }) {
  const headingId = useId()
  const [on, setOn] = useState({ film: true, blur: true, edge: true, shadow: true })

  function toggle(id, value) {
    setOn((current) => ({ ...current, [id]: value }))
  }

  // O que dizer sobre o que está desligado no momento.
  const messages = [
    !liveBackground && 'Sem fundo vivo não há o que desfocar: todo o vidro da página vira um painel sem graça.',
    ...PANEL_PIECES.filter((piece) => !on[piece.id]).map((piece) => piece.missing),
  ].filter(Boolean)

  // Cada peça desligada troca o valor de uma variável do painel de exemplo.
  const specimenStyle = {
    '--film': on.film ? 'var(--glass-film)' : 'transparent',
    '--blur': on.blur ? 'var(--glass-blur)' : 'none',
    '--edge': on.edge ? 'var(--glass-edge)' : 'transparent',
    '--shadow': on.shadow ? 'var(--glass-shadow)' : '0 0 0 transparent',
    '--highlight': on.edge ? 'rgb(255 255 255 / 0.65)' : 'transparent',
  }

  return (
    <section className={styles.anatomy} aria-labelledby={headingId}>
      <div className={`${pageStyles.glass} ${styles.controls}`}>
        <header className={styles.header}>
          <span className={styles.number}>{number}</span>
          <h2 id={headingId} className={styles.title}>
            Anatomia
          </h2>
        </header>
        <p className={styles.intro}>
          O efeito é a soma de cinco peças. Desligue uma de cada vez e veja o
          que ela faz no painel ao lado.
        </p>

        <ul className={styles.switches}>
          <li>
            <Switch
              checked={liveBackground}
              onChange={onLiveBackgroundChange}
              name="Fundo vivo"
              role="Dá ao vidro algo para desfocar."
            />
          </li>
          {PANEL_PIECES.map((piece) => (
            <li key={piece.id}>
              <Switch
                checked={on[piece.id]}
                onChange={(value) => toggle(piece.id, value)}
                name={piece.name}
                role={piece.role}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.stage}>
        <div className={styles.specimen} style={specimenStyle}>
          <p className={styles.specimenTitle}>Painel de exemplo</p>
          <p className={styles.specimenText}>
            Este texto precisa continuar fácil de ler, não importa o que passe
            atrás dele.
          </p>
        </div>

        {/* aria-live: leitores de tela anunciam a mensagem quando ela muda. */}
        <p className={`${pageStyles.glass} ${styles.status}`} aria-live="polite">
          {messages.length === 0
            ? 'Com as cinco peças ligadas, o efeito está completo.'
            : messages.join(' ')}
        </p>
      </div>
    </section>
  )
}
