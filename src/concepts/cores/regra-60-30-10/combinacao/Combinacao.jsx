import { useId } from 'react'
import { PALETTES } from '../parts/palettes.js'
import page from '../styles.module.css'
import Watch from './Watch.jsx'
import styles from './combinacao.module.css'

/*
 * Combinações consagradas: o laboratório da tela. Escolher uma combinação
 * pinta a página inteira, do menu ao rodapé, e esta seção diz o que a
 * combinação em uso comunica e com que tipo de marca costuma aparecer.
 *
 * O relógio é um objeto pintado com a mesma receita da página: o fundo em
 * volta dele é o 60, a caixa e a pulseira são o 30, o botão de ação e o
 * gráfico do mostrador são o 10. As etiquetas apontam cada papel.
 */
export default function Combinacao({ palette, onPick }) {
  const titleId = useId()
  const [c60, c30, c10] = palette.colors

  return (
    <section id="combinacoes" className={`${page.band} ${styles.section}`} aria-labelledby={titleId}>
      <div className={`${page.block} ${styles.layout}`}>
        <div className={styles.text}>
          <h2 id={titleId} className={page.sectionTitle}>
            Combinações consagradas
          </h2>
          <p className={page.sectionIntro}>
            Escolha uma: a página inteira muda de cor, do menu ao rodapé. A proporção continua a
            mesma; o que muda é a mensagem.
          </p>

          <div className={styles.palettes} role="group" aria-label="Combinação da página">
            {PALETTES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.palette}
                aria-pressed={item.id === palette.id}
                onClick={() => onPick(item.id)}
              >
                <span className={styles.swatch} aria-hidden="true">
                  <i style={{ flexGrow: 6, background: item.c60 }} />
                  <i style={{ flexGrow: 3, background: item.c30 }} />
                  <i style={{ flexGrow: 1, background: item.c10 }} />
                </span>
                {item.name}
              </button>
            ))}
          </div>

          <dl className={styles.reading} aria-live="polite">
            <div>
              <dt>O que esta combinação diz</dt>
              <dd>{palette.says}</dd>
            </div>
            <div>
              <dt>Combina com</dt>
              <dd>{palette.fits}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.object}>
          <div className={styles.stage} aria-hidden="true">
            <span className={styles.shadow} />
            <Watch />
          </div>
          <ul className={styles.legend}>
            <li>
              <b>60</b>
              <span>
                <strong>{c60}:</strong> o fundo em volta.
              </span>
            </li>
            <li>
              <b>30</b>
              <span>
                <strong>{c30}:</strong> a caixa e a pulseira.
              </span>
            </li>
            <li>
              <b>10</b>
              <span>
                <strong>{c10}:</strong> o botão de ação e o gráfico.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
