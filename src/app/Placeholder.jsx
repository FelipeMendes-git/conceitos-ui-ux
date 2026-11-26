import { Link } from './router.jsx'
import styles from './Placeholder.module.css'

/*
 * Aparece em dois casos:
 *   - com "concept": a tela está no catálogo, mas ainda não foi construída;
 *   - sem "concept": o endereço não corresponde a nenhuma tela.
 */
export default function Placeholder({ concept }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.eyebrow}>
        {concept ? `Spec ${concept.spec} · ${concept.category.title}` : 'Erro 404'}
      </p>
      <h1 className={styles.title}>
        {concept ? concept.title : 'Esta página não existe.'}
      </h1>
      <p className={styles.text}>
        {concept
          ? 'Esta tela faz parte do guia, mas ainda não foi construída.'
          : 'O endereço pode ter mudado ou ter sido digitado com um erro.'}
      </p>
      <Link to="/" className={styles.back}>
        Voltar ao mapa do guia
      </Link>
    </div>
  )
}
