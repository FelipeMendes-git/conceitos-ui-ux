import { concepts } from '../app/catalog.js'
import { isReady } from '../app/pages.js'
import { Link } from '../app/router.jsx'
import styles from './concept.module.css'

/*
 * A lista da seção "Para ir além": conceitos relacionados, cada um com o
 * motivo da relação.
 *
 * Uso:
 *   <RelatedLinks
 *     items={[
 *       { to: 'estilos/neumorphism', why: 'Costuma ser confundido com o vidro.' },
 *     ]}
 *   />
 *
 * Telas ainda não construídas aparecem como texto, com "em breve", e viram
 * link sozinhas quando a pasta delas existir.
 */
export default function RelatedLinks({ items, className = '' }) {
  return (
    <ul className={`${styles.related} ${className}`}>
      {items.map((item) => {
        const concept = concepts.find((c) => c.key === item.to)
        if (!concept) return null

        return (
          <li key={item.to} className={styles.relatedItem}>
            {isReady(concept.key) ? (
              <Link to={concept.path} className={styles.relatedTitle}>
                {concept.title}
              </Link>
            ) : (
              <span className={styles.relatedTitle}>
                {concept.title} <span className={styles.relatedSoon}>em breve</span>
              </span>
            )}
            <span className={styles.relatedWhy}>{item.why}</span>
          </li>
        )
      })}
    </ul>
  )
}
