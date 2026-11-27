import { useId } from 'react'
import page from '../styles.module.css'
import styles from './papeis.module.css'

/*
 * Os três papéis.
 *
 * A definição é escrita dentro de uma figura que é ela mesma 60-30-10: três
 * quadrados encaixados, nas cores da página, com as áreas exatas (o quadrado
 * do meio tem 63,2% do lado do maior, o menor, 31,6%; as áreas dão 60, 30
 * e 10). Ao lado, a mesma conta na sala, na roupa e na tela.
 */

const EXAMPLES = [
  { where: 'Na sala', items: ['paredes', 'sofá', 'almofadas'] },
  { where: 'Na roupa', items: ['terno', 'camisa', 'gravata'] },
  { where: 'Na tela', items: ['fundo', 'detalhes', 'botão'] },
]

export default function Papeis() {
  const titleId = useId()

  return (
    <section className={page.band} aria-labelledby={titleId}>
      <div className={`${page.block} ${styles.layout}`}>
        <div className={styles.text}>
          <h2 id={titleId} className={page.sectionTitle}>
            Os três papéis
          </h2>
          <p className={page.sectionIntro}>
            A regra divide as cores pela área que cada uma ocupa. Os números são aproximados; o
            que importa é a ordem entre elas. Ela nasceu na decoração e vale para qualquer
            composição.
          </p>

          <table className={styles.table}>
            <thead>
              <tr>
                <td />
                <th scope="col">
                  <span className={styles.chip} data-role="60" aria-hidden="true" />
                  60
                </th>
                <th scope="col">
                  <span className={styles.chip} data-role="30" aria-hidden="true" />
                  30
                </th>
                <th scope="col">
                  <span className={styles.chip} data-role="10" aria-hidden="true" />
                  10
                </th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLES.map((row) => (
                <tr key={row.where}>
                  <th scope="row">{row.where}</th>
                  {row.items.map((item) => (
                    <td key={item}>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <figure className={styles.squares}>
          <p className={styles.t60}>
            <strong>60</strong>
            Dominante. Ocupa quase tudo e dá o clima; quase não se nota.
          </p>
          <div className={styles.sq30}>
            <p className={styles.t30}>
              <strong>30</strong>
              Secundária. Dá estrutura e contraste.
            </p>
            <div className={styles.sq10}>
              <p className={styles.t10}>
                <strong>10</strong>
                Destaque. Pouco e intenso.
              </p>
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}
