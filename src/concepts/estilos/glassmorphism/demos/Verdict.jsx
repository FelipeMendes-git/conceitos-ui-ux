import styles from './examples.module.css'

/*
 * Um veredito: símbolo + texto. O símbolo muda de forma (cheio, meio cheio,
 * vazio), então o significado não depende de cor.
 *
 * level: 'ok' | 'warn' | 'avoid'
 */
export default function Verdict({ level, children }) {
  return (
    <span className={styles.verdict} data-level={level}>
      <span className={styles.verdictMark} aria-hidden="true" />
      {children}
    </span>
  )
}
