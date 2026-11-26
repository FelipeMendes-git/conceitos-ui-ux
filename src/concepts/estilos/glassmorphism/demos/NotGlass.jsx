import styles from './examples.module.css'
import pageStyles from '../styles.module.css'

/*
 * O QUE NÃO É: três cartões com o mesmo texto, soltos sobre o mesmo fundo.
 * Só o terceiro é vidro. Cada cartão é o próprio exemplo do que descreve.
 */

const VARIANTS = [
  {
    id: 'transparent',
    name: 'Só transparente',
    text: 'O fundo aparece nítido atrás do texto e disputa atenção com ele.',
  },
  {
    id: 'blurred',
    name: 'Painel borrado',
    text: 'Aqui quem ficou fosco foi o conteúdo. No vidro é o contrário: conteúdo nítido, fundo fosco.',
  },
  {
    id: 'real',
    name: 'Vidro de verdade',
    text: 'Fundo fosco, conteúdo nítido, contorno definido.',
  },
]

export default function NotGlass() {
  return (
    <ul className={styles.trio}>
      {VARIANTS.map((variant) => (
        <li key={variant.id} className={styles.trioItem}>
          <div className={`${styles.sample} ${styles[variant.id]}`}>
            <p className={styles.sampleTitle}>Leia este cartão</p>
            <p className={styles.sampleText}>
              O texto é o mesmo nos três. Só muda o que acontece com o fundo.
            </p>
          </div>
          <p className={`${pageStyles.glass} ${styles.caption}`}>
            <strong>{variant.name}.</strong> {variant.text}
          </p>
        </li>
      ))}
    </ul>
  )
}
