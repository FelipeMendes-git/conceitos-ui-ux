import { concepts, findConcept } from '../app/catalog.js'
import { isReady } from '../app/pages.js'
import { Link, usePath } from '../app/router.jsx'
import styles from './concept.module.css'

/*
 * Moldura comum de uma tela de conceito: cabeçalho (número, categoria, título,
 * frase de abertura), o conteúdo e, no fim, os links para a tela anterior e a
 * próxima.
 *
 * Usar é opcional. Uma tela cujo conceito pede outra estrutura pode montar a
 * sua do zero. O que não é opcional é a sequência de seções descrita em
 * docs/ARQUITETURA.md.
 *
 * Título, número e categoria vêm do catálogo, a partir do endereço atual:
 * a tela não precisa repetir essas informações.
 */
export default function ConceptPage({ lede, className = '', headerClassName = '', children }) {
  const concept = findConcept(usePath())

  // "Anterior" e "próxima" consideram só telas prontas e públicas.
  const ready = concepts.filter((c) => isReady(c.key) && !c.category.devOnly)
  const index = ready.findIndex((c) => c.key === concept?.key)
  const previous = index > 0 ? ready[index - 1] : null
  const next = index >= 0 && index < ready.length - 1 ? ready[index + 1] : null

  return (
    <article className={`${styles.page} ${className}`}>
      {/* headerClassName deixa a tela vestir a abertura (um painel de vidro, por exemplo). */}
      <header className={`${styles.header} ${headerClassName}`}>
        {concept && (
          <p className={styles.eyebrow}>
            Spec {concept.spec} · {concept.category.title}
          </p>
        )}
        <h1 className={styles.title}>{concept?.title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
      </header>

      {children}

      {(previous || next) && (
        <nav className={styles.pager} aria-label="Outras telas">
          {previous ? (
            <Link to={previous.path} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>Anterior</span>
              {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={next.path} className={`${styles.pagerLink} ${styles.pagerNext}`}>
              <span className={styles.pagerLabel}>Próxima</span>
              {next.title}
            </Link>
          )}
        </nav>
      )}
    </article>
  )
}
