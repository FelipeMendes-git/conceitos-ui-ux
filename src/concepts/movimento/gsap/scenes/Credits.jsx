import { useRef } from 'react'
import RelatedLinks from '../../../../shared/RelatedLinks.jsx'
import common from './common.module.css'
import styles from './credits.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: FONTES E CRÉDITOS, E PARA IR ALÉM
 *
 * De onde vieram os fatos e as imagens da tela, com o que ela foi feita, e
 * as telas do guia que continuam o assunto.
 */

const CREDITS = [
  { role: 'Feita com', name: 'GSAP, a ferramenta que esta tela explica' },
  {
    role: 'Fotografias',
    name: 'Eadweard Muybridge, The Horse in Motion, 1878. Biblioteca do Congresso dos EUA, domínio público',
  },
  { role: 'Letras', name: 'Anybody nos títulos e Atkinson Hyperlegible Next no texto' },
  {
    role: 'Fatos',
    name: 'Awwwards, FWA, Webby, GSAP, Webflow, Nielsen Norman Group, Adrian Roselli, The New York Times, CSS-Tricks, Adobe, Mozilla',
  },
  { role: 'Pesquisa', name: 'Novembro de 2026' },
]

const RELATED = [
  { to: 'movimento/principios-de-animacao', why: 'As regras clássicas do movimento, de onde vem a ideia de ritmo.' },
  { to: 'movimento/ritmo-do-movimento', why: 'A aceleração e a desaceleração, em detalhe.' },
  { to: 'movimento/animacoes-de-rolagem', why: 'A rolagem que conduz a cena, em profundidade.' },
  { to: 'movimento/parallax', why: 'Camadas que se movem em velocidades diferentes.' },
  { to: 'movimento/transicoes-entre-paginas', why: 'A continuidade ao trocar de página.' },
  { to: 'movimento/movimento-na-medida', why: 'Quando o movimento atrapalha, e como desligá-lo.' },
  { to: 'tipos-de-site/landing-page', why: 'Onde o site premiado mais funciona.' },
  { to: 'tipos-de-site/portfolio', why: 'O outro lugar onde ele brilha.' },
]

export default function Credits({ motionOn }) {
  const sceneRef = useRef(null)
  useSceneIntro(sceneRef, motionOn)

  return (
    <section ref={sceneRef} className={common.section} aria-labelledby="cena-creditos">
      <div className={common.column}>
        <h2 id="cena-creditos" className={common.title} data-title="">
          Fontes e créditos
        </h2>
        <dl className={styles.credits} data-intro="">
          {CREDITS.map((credit) => (
            <div key={credit.role} className={styles.credit}>
              <dt>{credit.role}</dt>
              <dd>{credit.name}</dd>
            </div>
          ))}
        </dl>

        <h2 className={`${common.subtitle} ${styles.relatedTitle}`} data-intro="">
          Para ir além
        </h2>
        <div data-intro="">
          <RelatedLinks items={RELATED} className={styles.related} />
        </div>
      </div>
    </section>
  )
}
