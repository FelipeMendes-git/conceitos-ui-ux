import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../motion.js'
import common from './common.module.css'
import { useSceneIntro } from './useSceneIntro.js'
import styles from './voice.module.css'

/*
 * CENA: O QUE COMUNICA
 *
 * O ritmo do movimento é tom de voz. O mesmo cartão de lançamento entra com
 * três temperamentos: só o tempo muda, e a marca parece outra.
 */

const MOODS = [
  {
    id: 'calmo',
    name: 'Calmo',
    note: 'Lento e longo, cada parte esperando a anterior. Soa caro e sereno: relojoaria, hotel, perfume.',
    from: { y: 30, autoAlpha: 0 },
    vars: { duration: 1.6, stagger: 0.35, ease: 'power2.inOut' },
  },
  {
    id: 'energico',
    name: 'Enérgico',
    note: 'Rápido, passando do ponto e voltando, como uma mola. Soa jovem e vibrante: esporte, música, jogos.',
    from: { y: 70, scale: 0.6, rotation: -8, autoAlpha: 0 },
    vars: { duration: 0.55, stagger: 0.07, ease: 'back.out(3)' },
  },
  {
    id: 'discreto',
    name: 'Discreto',
    note: 'Curto e suave, quase sem deslocamento. Soa eficiente e confiável: banco, saúde, seguro.',
    from: { y: 8, autoAlpha: 0 },
    vars: { duration: 0.35, stagger: 0.05, ease: 'power2.out' },
  },
]

export default function Voice({ motionOn }) {
  const sceneRef = useRef(null)
  const cardRef = useRef(null)
  const [moodId, setMood] = useState('calmo')
  const [take, setTake] = useState(0)
  const seen = useRef(false)
  useSceneIntro(sceneRef, motionOn)

  const mood = MOODS.find((m) => m.id === moodId)

  // O cartão entra de novo a cada temperamento escolhido; na primeira vez,
  // quando chega na tela.
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const parts = cardRef.current.querySelectorAll('[data-part]')
    const play = () => gsap.fromTo(parts, mood.from, { y: 0, scale: 1, rotation: 0, autoAlpha: 1, ...mood.vars })
    let tween = null
    let trigger = null
    if (seen.current) {
      tween = play()
    } else {
      gsap.set(parts, { autoAlpha: 0 })
      trigger = ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          seen.current = true
          tween = play()
        },
      })
    }
    return () => {
      tween?.kill()
      trigger?.kill()
      gsap.set(parts, { clearProps: 'all' })
    }
  }, [mood, take, motionOn])

  return (
    <section ref={sceneRef} className={common.section} data-tint="rosa" aria-labelledby="cena-o-que-comunica">
      <div className={`${common.column} ${common.head}`}>
        <h2 id="cena-o-que-comunica" className={common.title} data-title="">
          O que comunica
        </h2>
        <p className={common.intro} data-intro="">
          Movimento caprichado diz que alguém pensou em cada segundo da página: ofício, investimento,
          ousadia. E o ritmo é tom de voz. Escolha um temperamento e veja o mesmo cartão mudar de
          personalidade.
        </p>
      </div>

      <div className={`${common.column} ${styles.stage}`}>
        <div ref={cardRef} className={styles.card} data-mood={moodId} aria-hidden="true">
          {/* O losango gira dentro da caixa que entra, para as duas rotações não se misturarem. */}
          <span className={styles.cardShape} data-part="">
            <span className={styles.cardShapeInner} />
          </span>
          <p className={styles.cardLabel} data-part="">
            Lançamento
          </p>
          <p className={styles.cardTitle} data-part="">
            Coleção nova
          </p>
          <span className={styles.cardButton} data-part="">
            Conhecer
          </span>
        </div>

        <div className={styles.panel}>
          <fieldset className={common.choiceGroup}>
            <legend className={styles.legend}>Temperamento</legend>
            {MOODS.map((option) => (
              <label key={option.id} className={`${common.choice} ${styles.choice}`}>
                <input
                  type="radio"
                  name="temperamento"
                  checked={moodId === option.id}
                  onChange={() => {
                    seen.current = true
                    setMood(option.id)
                  }}
                />
                <span>{option.name}</span>
              </label>
            ))}
          </fieldset>
          <p className={styles.note} aria-live="polite">
            {mood.note}
          </p>
          {motionOn && (
            <button
              type="button"
              className={`${common.button} ${styles.replay}`}
              onClick={() => {
                seen.current = true
                setTake((n) => n + 1)
              }}
            >
              Tocar de novo
            </button>
          )}
        </div>
      </div>

      <div className={common.column}>
        <p className={styles.risk} data-intro="">
          <strong>O risco:</strong> o site se mostrar mais que o produto. A marca parece mais
          interessada no prêmio do que no cliente, e para quem tem pressa o espetáculo vira irritação.
        </p>
      </div>
    </section>
  )
}
