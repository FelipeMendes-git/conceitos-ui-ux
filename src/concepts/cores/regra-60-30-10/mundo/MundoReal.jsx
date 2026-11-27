import { useId } from 'react'
import Regua from '../parts/Regua.jsx'
import page from '../styles.module.css'
import { SITES } from './sites.js'
import styles from './mundo.module.css'

/*
 * No mundo real: a régua de cinco sites conhecidos, pintada com as cores
 * medidas na primeira tela de cada um (ver sites.js). Nenhum logotipo nem
 * captura de tela é reproduzido.
 */
export default function MundoReal() {
  const titleId = useId()

  return (
    <section className={`${page.band} ${page.bandDark} ${styles.section}`} aria-labelledby={titleId}>
      <div className={page.block}>
        <h2 id={titleId} className={page.sectionTitle}>
          No mundo real
        </h2>
        <p className={page.sectionIntro}>
          Medimos as cores da primeira tela de cinco sites em novembro de 2026, sem contar as
          fotos. Em nenhum o destaque chegou a 10%.
        </p>

        <ul className={styles.sites}>
          {SITES.map((site) => (
            <li key={site.name} className={styles.site}>
              <div>
                <h3 className={page.compTitle}>{site.name}</h3>
                <p className={styles.note}>{site.note}</p>
              </div>
              <Regua parts={site.parts} legend />
            </li>
          ))}
        </ul>
      </div>

      {/* A conclusão, numa faixa do destaque da página: pouca área, muita força. */}
      <div className={styles.lessonBand}>
        <p className={`${page.block} ${styles.lesson}`}>O 10 é teto, não meta.</p>
      </div>
    </section>
  )
}
