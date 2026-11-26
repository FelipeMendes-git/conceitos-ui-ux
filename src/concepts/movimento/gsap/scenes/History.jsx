import { useLayoutEffect, useRef } from 'react'
import { COLORS, gsap, ScrollTrigger, WIDE } from '../motion.js'
import common from './common.module.css'
import styles from './history.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: DE ONDE VEM
 *
 * A história do GSAP e dos sites premiados em quinze momentos. Na janela
 * larga, com movimento, a cena fica parada e a faixa da história passa de
 * lado conforme a rolagem; cada momento acende quando cruza a agulha. Na
 * janela estreita ou com o movimento reduzido, a mesma história vira uma
 * lista que se rola normalmente.
 */

const EVENTS = [
  {
    when: '2000',
    what: 'O designer Rob Ford cria o FWA, uma galeria de sites feitos em Flash, o programa de animação que rodava dentro do navegador. Nasce a ideia de premiar um site por dia.',
  },
  {
    when: 'Fim dos anos 2000',
    what: 'Jack Doyle, que fazia anúncios animados numa agência de publicidade, cria para uso próprio uma ferramenta para mover coisas na tela. Ela vira o GreenSock, a empresa do GSAP.',
  },
  {
    when: '2009',
    what: 'Nasce em Valência, na Espanha, o Awwwards, o prêmio de sites que esta tela usa como exemplo.',
  },
  {
    when: '2010',
    what: 'Steve Jobs publica uma carta explicando por que o iPhone e o iPad não vão rodar Flash. O site animado perde a sua ferramenta.',
  },
  {
    when: 'Por volta de 2012',
    what: 'O GSAP passa a funcionar direto no navegador, com o mesmo jeito de trabalhar: uma linha do tempo.',
  },
  {
    when: 'Dezembro de 2012',
    what: 'O New York Times publica "Snow Fall", reportagem em que a rolagem conduz texto, vídeo e mapas: 3,5 milhões de visualizações em seis dias.',
  },
  {
    when: 'Maio de 2020',
    what: 'Um tutorial ensina a recriar a página dos AirPods Pro, da Apple, em que o fone se monta quadro a quadro conforme a rolagem. O efeito já era copiado por toda parte.',
  },
  {
    when: 'Junho de 2020',
    what: 'O GSAP lança a peça que liga a animação à rolagem. Cenas que param na tela e animações puxadas pela rolagem se espalham pelos sites premiados.',
  },
  {
    when: 'Dezembro de 2020',
    what: 'A Adobe encerra o Flash de vez.',
  },
  {
    when: 'Outubro de 2024',
    what: 'O Webflow, plataforma de criação de sites sem programação, compra o GreenSock.',
  },
  {
    when: 'Abril de 2025',
    what: 'O GSAP fica 100% gratuito, inclusive para uso comercial, com todas as peças que antes eram pagas.',
  },
  {
    when: 'Julho de 2025',
    what: 'O Webflow lança uma linha do tempo visual: dá para montar a coreografia do GSAP sem escrever código.',
  },
  {
    when: 'Novembro de 2025',
    what: 'O site do piloto Lando Norris, feito com Webflow, GSAP e 3D, vira Site do Dia. Depois, Site do Ano de 2025 no Awwwards.',
  },
  {
    when: 'Abril de 2026',
    what: 'O GSAP passa a permitir um ritmo na ida e outro na volta da mesma animação.',
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
    const mm = gsap.matchMedia(scene)

    mm.add(WIDE, () => {
      scene.dataset.mode = 'pin'
      const viewport = scene.querySelector(`.${styles.viewport}`)
      const track = scene.querySelector(`.${styles.track}`)
      const events = gsap.utils.toArray(`.${styles.event}`, scene)
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

      // A faixa anda para a esquerda; a cena fica parada enquanto isso.
      const slide = gsap.to(track, { x: () => -distance(), ease: 'none' })
      ScrollTrigger.create({
        trigger: scene,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        animation: slide,
        invalidateOnRefresh: true,
      })

      events.forEach((event) => {
        // Cada momento acende quando cruza a agulha...
        ScrollTrigger.create({
          trigger: event,
          containerAnimation: slide,
          start: 'left 42%',
          end: 'right 42%',
          onToggle: (self) => event.toggleAttribute('data-active', self.isActive),
        })
        // ...e sobe de leve quando entra pela direita. (A opacidade do ano
        // fica com o CSS, que a usa para mostrar o momento aceso.)
        gsap
          .timeline({
            scrollTrigger: {
              trigger: event,
              containerAnimation: slide,
              start: 'left 92%',
              toggleActions: 'play none none reverse',
            },
          })
          .from(event.querySelector(`.${styles.when}`), { y: 34, duration: 0.7, ease: 'power3.out' })
          .from(event.querySelector(`.${styles.what}`), { y: 34, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.08)
      })

      return () => {
        delete scene.dataset.mode
        events.forEach((event) => event.removeAttribute('data-active'))
      }
    })

    return () => mm.revert()
  }, [motionOn])

  return (
    <section ref={sceneRef} className={`${common.section} ${styles.scene}`} data-tint="verde" aria-labelledby="cena-de-onde-vem">
      <div className={`${common.column} ${common.head} ${styles.head}`}>
        <h2 id="cena-de-onde-vem" className={common.title} data-title="">
          De onde vem
        </h2>
        <p className={common.intro} data-intro="">
          O site animado nasceu com o Flash, perdeu a ferramenta quando o iPhone chegou e foi
          reconstruído dentro do navegador. O GSAP atravessou essa história inteira.
        </p>
      </div>

      <div className={styles.viewport}>
        <span className={styles.needle} aria-hidden="true" />
        <ol className={styles.track}>
          {EVENTS.map((event, i) => (
            <li key={event.when} className={styles.event} style={{ '--cor': COLORS[i % COLORS.length] }}>
              <p className={styles.when}>{event.when}</p>
              <span className={styles.key} aria-hidden="true" />
              <p className={styles.what}>{event.what}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
