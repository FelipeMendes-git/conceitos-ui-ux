import { useLayoutEffect, useRef } from 'react'
import { COLORS, gsap } from '../motion.js'
import common from './common.module.css'
import styles from './history.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: DE ONDE VEM
 *
 * A história do GSAP e dos sites premiados em seis momentos, numa grade que
 * se lê de uma vez. Quando a grade chega na tela, os momentos entram um
 * depois do outro, na ordem em que aconteceram.
 */

const EVENTS = [
  {
    when: '2000',
    what: 'Nasce o FWA, galeria que premia um site por dia. Os sites animados eram feitos em Flash, que rodava dentro do navegador.',
  },
  {
    when: 'Fim dos anos 2000',
    what: 'Jack Doyle, que fazia anúncios animados numa agência, cria para uso próprio a ferramenta que vira o GSAP.',
  },
  {
    when: '2010 a 2012',
    what: 'O iPhone não vai rodar Flash, avisa Steve Jobs. O site animado perde a ferramenta, e o GSAP se muda para o navegador.',
  },
  {
    when: '2020',
    what: 'O GSAP passa a ligar a animação à rolagem, e as cenas que param na tela se espalham. O Flash é encerrado de vez.',
  },
  {
    when: '2024 e 2025',
    what: 'O Webflow, plataforma de criar sites sem programar, compra o GSAP e o libera de graça, inclusive para uso comercial.',
  },
  {
    when: 'Outubro de 2026',
    what: 'Com o Firefox, os três grandes navegadores passam a animar pela rolagem sozinhos, sem ferramenta.',
  },
]

export default function History({ motionOn }) {
  const sceneRef = useRef(null)
  useSceneIntro(sceneRef, motionOn)

  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const scene = sceneRef.current
    const ctx = gsap.context(() => {
      // Cada momento: o losango cresce, o ano e o texto sobem. Só a opacidade
      // muda, para o texto continuar audível antes de entrar.
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: `.${styles.track}`, start: 'top 82%', once: true },
      })
      gsap.utils.toArray(`.${styles.event}`).forEach((event, i) => {
        const at = i * 0.12
        entrance
          .from(event.querySelector(`.${styles.key}`), { scale: 0, duration: 0.5, ease: 'back.out(3)' }, at)
          .from(event.querySelector(`.${styles.when}`), { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out' }, at)
          .from(event.querySelector(`.${styles.what}`), { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, at + 0.08)
      })
    }, scene)
    return () => ctx.revert()
  }, [motionOn])

  return (
    <section ref={sceneRef} className={common.section} data-tint="verde" aria-labelledby="cena-de-onde-vem">
      <div className={`${common.column} ${common.head}`}>
        <h2 id="cena-de-onde-vem" className={common.title} data-title="">
          De onde vem
        </h2>
        <p className={common.intro} data-intro="">
          O site animado nasceu com o Flash, perdeu a ferramenta quando o iPhone chegou e renasceu
          dentro do navegador. O GSAP atravessou tudo isso.
        </p>
      </div>

      <div className={common.column}>
        <ol className={styles.track}>
          {EVENTS.map((event, i) => (
            <li key={event.when} className={styles.event} style={{ '--cor': COLORS[i % COLORS.length] }}>
              <span className={styles.key} aria-hidden="true" />
              <p className={styles.when}>{event.when}</p>
              <p className={styles.what}>{event.what}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
