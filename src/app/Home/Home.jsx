import { categories, concepts } from '../catalog.js'
import { isReady } from '../pages.js'
import { Link } from '../router.jsx'
import styles from './Home.module.css'

/*
 * Página inicial PROVISÓRIA: apresenta o guia e mostra o mapa completo.
 * A versão definitiva é a SPEC-001 (docs/specs/ROADMAP.md).
 */

const PRINCIPLES = [
  {
    title: 'Cada página pratica o que ensina',
    text: 'A página sobre vidro é de vidro. A do minimalismo quase não tem nada. Você entende o conceito antes de ler a primeira linha.',
  },
  {
    title: 'Sem código',
    text: 'Tudo é explicado pelo que se vê. Onde há o que experimentar, você mexe em controles e observa o resultado.',
  },
  {
    title: 'Com contexto',
    text: 'De onde o conceito veio, quem usa, o que ele comunica, em que tipo de site funciona e quanto custa adotar.',
  },
]

export default function Home() {
  const publicCategories = categories.filter((category) => !category.devOnly)
  const total = concepts.filter((concept) => !concept.category.devOnly).length

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>
          Guia visual · {total} telas · {publicCategories.length} temas
        </p>
        <h1 className={styles.title}>
          Design se aprende <em>olhando.</em>
        </h1>
        <p className={styles.lede}>
          Um guia para quem quer entender design sem precisar programar. Cada
          página explica um conceito e é desenhada com ele.
        </p>
      </header>

      <ol className={styles.principles}>
        {PRINCIPLES.map((principle, index) => (
          <li key={principle.title} className={styles.principle}>
            <span className={styles.principleNumber}>0{index + 1}</span>
            <h2 className={styles.principleTitle}>{principle.title}</h2>
            <p className={styles.principleText}>{principle.text}</p>
          </li>
        ))}
      </ol>

      <section aria-labelledby="mapa">
        <h2 id="mapa" className={styles.mapHeading}>
          Mapa do guia
        </h2>

        {publicCategories.map((category) => (
          <div key={category.id} className={styles.row}>
            <p className={styles.rowNumber}>{category.number}</p>
            <div className={styles.rowIntro}>
              <h3 className={styles.rowTitle}>{category.title}</h3>
              <p className={styles.rowBlurb}>{category.blurb}</p>
            </div>
            <ul className={styles.rowItems}>
              {category.items.map((item) => {
                const key = `${category.id}/${item.slug}`
                return (
                  <li key={item.slug}>
                    {isReady(key) ? (
                      <Link to={`/${key}`} className={styles.rowLink}>
                        {item.title}
                      </Link>
                    ) : (
                      <span className={styles.rowSoon}>
                        {item.title}
                        <span className="sr-only"> (em breve)</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}
