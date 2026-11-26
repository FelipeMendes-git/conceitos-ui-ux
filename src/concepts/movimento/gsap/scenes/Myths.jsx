import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../motion.js'
import common from './common.module.css'
import styles from './myths.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: O QUE NÃO É
 *
 * Cinco ideias comuns e erradas. Quando cada uma chega na tela, um traço
 * vermelho risca a frase e a correção aparece embaixo.
 */

const MYTHS = [
  {
    wrong: 'O GSAP é um estilo visual.',
    right:
      'É uma ferramenta, como um programa de edição. O mesmo movimento serve a um site minimalista ou a um brutalista; quem decide a aparência é o design.',
  },
  {
    wrong: 'Animação no site é um vídeo.',
    right:
      'O que se move é a própria página. O texto continua texto: dá para selecionar, traduzir, buscar e ouvir com leitor de tela, e a animação responde ao visitante, para a frente e para trás.',
  },
  {
    wrong: 'Só dá para animar com o GSAP.',
    right:
      'O próprio navegador anima transições simples e, desde outubro de 2026, também anima pela rolagem nos três grandes navegadores. Programas de animação exportam animações prontas, e o Webflow monta a coreografia sem programar.',
  },
  {
    wrong: 'Bom movimento é mexer tudo.',
    right:
      'Nos bons sites o movimento é editado: poucas entradas fortes e muita calma entre elas. Mexer tudo ao mesmo tempo é como escrever tudo em negrito.',
  },
  {
    wrong: 'Site premiado é site bom para quem visita.',
    right:
      'O júri do Awwwards dá 40% da nota ao design e 30% à usabilidade, e não mede vendas, cadastros nem a satisfação de quem usa.',
  },
]

export default function Myths({ motionOn }) {
  const sceneRef = useRef(null)
  useSceneIntro(sceneRef, motionOn)

  // Cada ideia errada é riscada quando chega na tela; a correção vem depois.
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.item}`).forEach((item) => {
        gsap
          .timeline({ scrollTrigger: { trigger: item, start: 'top 78%', once: true } })
          .from(item.querySelector(`.${styles.key}`), { scale: 0, rotation: -90, duration: 0.5, ease: 'back.out(2.5)' })
          .from(item.querySelector(`.${styles.strike}`), { scaleX: 0, duration: 0.6, ease: 'power3.inOut' }, 0.15)
          // Antes de ser riscada, a frase aparece acesa; depois, apaga.
          .from(item.querySelector(`.${styles.wrongText}`), { color: '#ece6da', duration: 0.4 }, 0.5)
          .from(item.querySelector(`.${styles.right}`), { opacity: 0, y: 18, duration: 0.8, ease: 'expo.out' }, 0.6)
      })
    }, sceneRef.current)
    return () => ctx.revert()
  }, [motionOn])

  return (
    <section ref={sceneRef} className={`${common.section} ${styles.scene}`} data-tint="vermelho" aria-labelledby="cena-o-que-nao-e">
      <div className={`${common.column} ${common.head}`}>
        <h2 id="cena-o-que-nao-e" className={common.title} data-title="">
          O que não é
        </h2>
        <p className={common.intro} data-intro="">
          Cinco ideias que se ouve muito sobre animação na web, e por que elas não se sustentam.
        </p>
      </div>

      <ol className={`${common.column} ${styles.list}`}>
        {MYTHS.map((myth) => (
          <li key={myth.wrong} className={styles.item}>
            <span className={styles.key} aria-hidden="true" />
            <p className={styles.wrong}>
              <span className="sr-only">Ideia errada: </span>
              <span className={styles.wrongText}>
                {myth.wrong}
                <span className={styles.strike} aria-hidden="true" />
              </span>
            </p>
            <p className={styles.right}>
              <span className="sr-only">Na verdade: </span>
              {myth.right}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
