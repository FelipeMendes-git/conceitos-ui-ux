import { useLayoutEffect, useRef } from 'react'
import { SITE_TYPES, VERDICTS } from '../../../../shared/siteTypes.js'
import { gsap } from '../motion.js'
import common from './common.module.css'
import styles from './fit.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: ONDE SERVE
 *
 * Os seis tipos de site, cada um com um roteiro de três quadros (como os de
 * quem planeja uma animação) mostrando onde o movimento entra, e o veredito.
 * Os vereditos são uma avaliação nossa, feita a partir da pesquisa.
 */

const FIT = {
  landing: {
    verdict: 'ok',
    frames: [
      { label: 'Abertura', moves: true },
      { label: 'Benefícios', moves: true },
      { label: 'Chamada', moves: false },
    ],
    why: 'Campanha, lançamento, evento: vida curta, impacto alto e quase nenhuma tarefa. O botão principal fica parado.',
  },
  portfolio: {
    verdict: 'ok',
    frames: [
      { label: 'Abertura', moves: true },
      { label: 'Trabalhos', moves: true },
      { label: 'Projeto', moves: true },
    ],
    why: 'O site é a prova do ofício, sobretudo para estúdios. Mas o trabalho precisa aparecer rápido.',
  },
  ecommerce: {
    verdict: 'warn',
    frames: [
      { label: 'Apresentação', moves: true },
      { label: 'Vitrine', moves: false },
      { label: 'Pagamento', moves: false },
    ],
    why: 'Funciona na apresentação de um produto caro e de compra rara. No carrinho e no pagamento, atrapalha.',
  },
  blog: {
    verdict: 'warn',
    frames: [
      { label: 'Reportagem especial', moves: true },
      { label: 'Texto', moves: false },
      { label: 'Texto', moves: false },
    ],
    why: 'A reportagem especial ganha com a rolagem que conta a história, como "Snow Fall", do New York Times, em 2012. O texto do dia a dia, não.',
  },
  app: {
    verdict: 'warn',
    frames: [
      { label: 'Toque', moves: true },
      { label: 'Lista', moves: false },
      { label: 'Rolagem', moves: false },
    ],
    why: 'No celular, efeitos pesados cansam e travam em aparelhos simples. Resposta pequena ao toque funciona bem.',
  },
  dashboard: {
    verdict: 'avoid',
    frames: [
      { label: 'Painel', moves: false },
      { label: 'Tabela', moves: false },
      { label: 'Clique', moves: true },
    ],
    why: 'Ferramenta de uso diário pede velocidade: cada segundo de animação se repete centenas de vezes.',
  },
}

// A ordem dos cartões: do que mais combina ao que menos combina.
const ORDER = ['landing', 'portfolio', 'ecommerce', 'blog', 'app', 'dashboard']

export default function Fit({ motionOn }) {
  const sceneRef = useRef(null)
  useSceneIntro(sceneRef, motionOn)

  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
        gsap
          .timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
          .from(card, { y: 50, opacity: 0, duration: 0.8, ease: 'expo.out' })
          .from(card.querySelectorAll(`.${styles.frame}`), { y: 16, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }, 0.2)
          .from(card.querySelectorAll(`.${styles.motionKey}`), { scale: 0, rotation: -90, duration: 0.6, stagger: 0.12, ease: 'back.out(3)' }, 0.5)
          .from(card.querySelector(`.${styles.verdictMark}`), { scale: 0, duration: 0.5, ease: 'back.out(3)' }, 0.7)
      })
    }, sceneRef.current)
    return () => ctx.revert()
  }, [motionOn])

  return (
    <section ref={sceneRef} className={common.section} data-tint="verde" aria-labelledby="cena-onde-serve">
      <div className={`${common.column} ${common.head}`}>
        <h2 id="cena-onde-serve" className={common.title} data-title="">
          Onde serve
        </h2>
        <p className={common.intro} data-intro="">
          O movimento de prêmio serve a quem visita para conhecer e atrapalha quem vem para fazer alguma
          coisa. O losango verde marca onde o movimento entra.
        </p>
      </div>

      <ul className={`${common.column} ${styles.grid}`}>
        {ORDER.map((id) => {
          const site = SITE_TYPES.find((type) => type.id === id)
          const fit = FIT[id]
          return (
            <li key={id} className={styles.card}>
              <div className={styles.cardHead}>
                <h3 className={styles.siteName}>{site.label}</h3>
                <p className={styles.verdict} data-verdict={fit.verdict}>
                  <span className={styles.verdictMark} aria-hidden="true" />
                  {VERDICTS[fit.verdict]}
                </p>
              </div>
              <ol className={styles.frames} aria-label="Roteiro em três quadros">
                {fit.frames.map((frame, i) => (
                  <li key={`${frame.label}-${i}`} className={styles.frame} data-moves={frame.moves || undefined}>
                    <span className={styles.sketch} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      {frame.moves && <span className={styles.motionKey} />}
                    </span>
                    <span className={styles.frameLabel}>
                      {frame.label}
                      <span className="sr-only">{frame.moves ? ': animado' : ': parado'}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className={styles.why}>{fit.why}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
