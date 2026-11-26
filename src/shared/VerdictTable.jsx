import { SITE_TYPES, VERDICTS } from './siteTypes.js'
import styles from './concept.module.css'

/*
 * A tabela da seção "Onde aplicar": um veredito para cada tipo de site.
 *
 * Uso:
 *   <VerdictTable
 *     verdicts={{
 *       ecommerce: { verdict: 'warn', why: 'Bom na barra fixa, ruim na vitrine.' },
 *       landing:   { verdict: 'ok',   why: 'Pouco texto, muito impacto.' },
 *       ...
 *     }}
 *   />
 *
 * O veredito é mostrado com um símbolo E um texto, nunca só por cor: quem não
 * distingue cores (ou imprime em preto e branco) entende do mesmo jeito.
 */
export default function VerdictTable({ verdicts, className = '' }) {
  return (
    <ul className={`${styles.verdicts} ${className}`}>
      {SITE_TYPES.map((type) => {
        const entry = verdicts[type.id]
        if (!entry) return null

        return (
          <li key={type.id} className={styles.verdictRow}>
            <h3 className={styles.verdictType}>{type.label}</h3>
            <p className={styles.verdictLabel} data-verdict={entry.verdict}>
              <span className={styles.verdictMark} aria-hidden="true" />
              {VERDICTS[entry.verdict]}
            </p>
            <p className={styles.verdictWhy}>{entry.why}</p>
          </li>
        )
      })}
    </ul>
  )
}
