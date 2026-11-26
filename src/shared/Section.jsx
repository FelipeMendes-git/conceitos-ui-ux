import { useId } from 'react'
import styles from './concept.module.css'

/*
 * Uma seção de uma tela de conceito: número, título e conteúdo.
 *
 * "className" permite que a tela vista a seção do seu jeito (um painel de
 * vidro, um cartão com borda grossa...) sem mudar a estrutura.
 */
export default function Section({ number, title, className = '', children }) {
  // Liga a <section> ao seu título, para leitores de tela anunciarem o nome dela.
  const headingId = useId()

  return (
    <section className={`${styles.section} ${className}`} aria-labelledby={headingId}>
      <header className={styles.sectionHeader}>
        {number && <span className={styles.sectionNumber}>{number}</span>}
        <h2 id={headingId} className={styles.sectionTitle}>
          {title}
        </h2>
      </header>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}
