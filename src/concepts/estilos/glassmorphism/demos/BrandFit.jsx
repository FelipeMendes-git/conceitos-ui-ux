import Verdict from './Verdict.jsx'
import styles from './examples.module.css'

/*
 * O QUE COMUNICA: a mesma roupa de vidro em três marcas inventadas.
 * Em uma combina, em outra não diz nada, na terceira contradiz a marca.
 */

const BRANDS = [
  {
    id: 'music',
    name: 'Onda',
    kind: 'Aplicativo de música',
    tagline: 'Sua trilha, em qualquer lugar.',
    level: 'ok',
    verdict: 'Combina',
    why: 'Produto digital e jovem, que quer parecer atual. Leveza e tecnologia são exatamente a mensagem.',
  },
  {
    id: 'market',
    name: 'Feira da Vila',
    kind: 'Hortifrúti de bairro',
    tagline: 'Colhido hoje, na sua porta amanhã.',
    level: 'warn',
    verdict: 'Não diz nada',
    why: 'Não atrapalha, mas também não ajuda. A marca vende frescor e proximidade, e o vidro não fala disso.',
  },
  {
    id: 'law',
    name: 'Almeida Prado',
    kind: 'Escritório de advocacia',
    tagline: 'Direito empresarial desde 1974.',
    level: 'avoid',
    verdict: 'Destoa',
    why: 'Quem procura um advogado quer solidez e tradição. Vidro colorido e flutuante passa o oposto.',
  },
]

export default function BrandFit() {
  return (
    <ul className={styles.brands}>
      {BRANDS.map((brand) => (
        <li key={brand.id} className={styles.brand}>
          <div className={`${styles.brandStage} ${styles[brand.id]}`} aria-hidden="true">
            <div className={styles.brandCard}>
              <p className={styles.brandName}>{brand.name}</p>
              <p className={styles.brandTagline}>{brand.tagline}</p>
              <span className={styles.brandButton}>Conhecer</span>
            </div>
          </div>
          <p className={styles.brandKind}>{brand.kind}</p>
          <p className={styles.brandVerdict}>
            <Verdict level={brand.level}>{brand.verdict}</Verdict>
          </p>
          <p className={styles.why}>{brand.why}</p>
        </li>
      ))}
    </ul>
  )
}
