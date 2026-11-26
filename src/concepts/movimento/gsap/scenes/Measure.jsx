import { useRef } from 'react'
import { gsap } from '../motion.js'
import common from './common.module.css'
import styles from './measure.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: MOVIMENTO NA MEDIDA
 *
 * A acessibilidade contada a partir da própria página. É a cena mais calma
 * da tela, de propósito: o mesmo cartão entra com movimento completo e com
 * movimento reduzido, lado a lado, e o leitor pode desligar o movimento da
 * página inteira daqui.
 */

const CARES = [
  {
    title: 'Enjoo de movimento',
    text: 'Para quem tem distúrbios do equilíbrio, movimento grande na tela, sobretudo o que acompanha a rolagem, pode dar enjoo, tontura e dor de cabeça.',
  },
  {
    title: 'A opção do aparelho',
    text: 'Celulares e computadores têm uma opção de "reduzir movimento". Um site bem feito obedece. Esta página obedece: com a opção ligada, nada se move e tudo já aparece no lugar.',
  },
  {
    title: 'O interruptor da página',
    text: 'Nem todo mundo conhece a opção do aparelho, por isso esta página tem um interruptor no canto da tela. Em setembro de 2025, o Webflow passou a oferecer esse mesmo ajuste nas animações montadas com o GSAP.',
  },
  {
    title: 'O conteúdo não depende do movimento',
    text: 'Se a animação falhar ou demorar, o texto e as imagens aparecem normalmente. O texto partido em letras tem uma cópia inteira para quem usa leitor de tela.',
  },
  {
    title: 'O que diz a regra',
    text: 'As diretrizes internacionais de acessibilidade pedem que o movimento disparado por uma ação possa ser desligado e que nada pisque mais de três vezes por segundo.',
  },
]

export default function Measure({ motionOn, deviceReduce, toggle }) {
  const sceneRef = useRef(null)
  const fullRef = useRef(null)
  const reducedRef = useRef(null)
  useSceneIntro(sceneRef, motionOn)

  // As duas versões do mesmo cartão: uma desliza, gira e cresce; a outra só
  // aparece, rápido. Com o movimento da página desligado, as duas só aparecem.
  function play() {
    const full = fullRef.current.querySelector(`.${styles.sample}`)
    const reduced = reducedRef.current.querySelector(`.${styles.sample}`)
    if (motionOn) {
      gsap.fromTo(full, { x: -80, rotation: -12, scale: 0.6, autoAlpha: 0 }, { x: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 1.1, ease: 'back.out(2)' })
    } else {
      gsap.fromTo(full, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
    }
    gsap.fromTo(reduced, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
  }

  return (
    <section ref={sceneRef} className={`${common.section} ${styles.scene}`} data-tint="azul" aria-labelledby="cena-na-medida">
      <div className={`${common.column} ${common.head}`}>
        <h2 id="cena-na-medida" className={common.title} data-title="">
          Movimento na medida
        </h2>
        <p className={common.intro} data-intro="">
          Toda a firula desta página tem freio. Esta é a cena mais calma da tela, de propósito: aqui se
          vê o que acontece com quem pede menos movimento.
        </p>
      </div>

      <div className={`${common.column} ${styles.compare}`} data-intro="">
        <div ref={fullRef} className={styles.panel}>
          <p className={styles.panelLabel}>Movimento completo</p>
          <div className={styles.window} aria-hidden="true">
            <span className={styles.sample}>
              <span className={styles.sampleKey} />
            </span>
          </div>
        </div>
        <div ref={reducedRef} className={styles.panel}>
          <p className={styles.panelLabel}>Movimento reduzido</p>
          <div className={styles.window} aria-hidden="true">
            <span className={styles.sample}>
              <span className={styles.sampleKey} />
            </span>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" className={common.button} onClick={play}>
            Comparar as duas entradas
          </button>
          <button type="button" className={common.button} onClick={toggle} aria-pressed={!motionOn}>
            {motionOn ? 'Desligar o movimento da página' : 'Ligar o movimento da página'}
          </button>
          {deviceReduce && (
            <p className={styles.deviceNote}>
              O seu aparelho pediu menos movimento, então a página já está sem animação.
            </p>
          )}
        </div>
      </div>

      <ul className={`${common.column} ${styles.cares}`}>
        {CARES.map((care) => (
          <li key={care.title} data-intro="">
            <h3 className={styles.careTitle}>{care.title}</h3>
            <p>{care.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
