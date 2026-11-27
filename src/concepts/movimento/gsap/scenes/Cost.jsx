import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../motion.js'
import common from './common.module.css'
import styles from './cost.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: QUANTO CUSTA
 *
 * Os quatro custos com um medidor de risco cada, o cuidado com quem pede
 * menos movimento e a lista de perguntas para fazer antes de encomendar um
 * site assim, que o leitor pode ir marcando.
 */

const COSTS = [
  {
    name: 'Velocidade do site',
    level: 2,
    levelName: 'médio',
    text: 'A ferramenta é leve; o peso vem do que costuma vir junto, como 3D e vídeo. Em celular simples, muito movimento engasga e gasta bateria.',
  },
  {
    name: 'Leitura e acessibilidade',
    level: 3,
    levelName: 'alto',
    text: 'Movimento grande ligado à rolagem dá enjoo em quem tem distúrbios de equilíbrio. E mexer na rolagem desorienta: num estudo do Nielsen Norman Group, a maioria dos participantes ficou ao menos um pouco desorientada.',
  },
  {
    name: 'Produção',
    level: 3,
    levelName: 'alto',
    text: 'Caro e lento. Cada cena é desenhada e construída à mão, em cada tamanho de tela. E trocar um texto depois pode desmontar a coreografia.',
  },
  {
    name: 'Durabilidade',
    level: 2,
    levelName: 'médio',
    text: 'O efeito da moda envelhece depressa e logo vem pronto em qualquer ferramenta. O que não envelhece é o ofício do tempo: ordem, ritmo e moderação.',
  },
]

const QUESTIONS = [
  'Como o site fica num celular simples? Peça para ver.',
  'Ele respeita quem pede menos movimento no aparelho?',
  'O conteúdo aparece se a animação falhar?',
  'Quanto do orçamento vai para o movimento e quanto para o conteúdo?',
]

export default function Cost({ motionOn }) {
  const sceneRef = useRef(null)
  const [checked, setChecked] = useState(() => QUESTIONS.map(() => false))
  useSceneIntro(sceneRef, motionOn)

  // Os medidores enchem, segmento por segmento, quando chegam na tela.
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.cost}`).forEach((cost) => {
        gsap.from(cost.querySelectorAll(`.${styles.segment}[data-on]`), {
          scaleX: 0,
          transformOrigin: '0% 50%',
          duration: 0.45,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: cost, start: 'top 85%', once: true },
        })
      })
    }, sceneRef.current)
    return () => ctx.revert()
  }, [motionOn])

  const done = checked.filter(Boolean).length

  return (
    <section ref={sceneRef} className={common.section} data-tint="vermelho" aria-labelledby="cena-quanto-custa">
      <div className={`${common.column} ${common.head}`}>
        <h2 id="cena-quanto-custa" className={common.title} data-title="">
          Quanto custa
        </h2>
        <p className={common.intro} data-intro="">
          O que um site assim cobra. O medidor é a nossa avaliação do risco, a partir da pesquisa.
        </p>
      </div>

      <ul className={`${common.column} ${styles.costs}`}>
        {COSTS.map((cost) => (
          <li key={cost.name} className={styles.cost} data-intro="">
            <div className={styles.costHead}>
              <h3 className={styles.costName}>{cost.name}</h3>
              <p className={styles.meter}>
                <span className={styles.segments} aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={styles.segment} data-on={n <= cost.level || undefined} />
                  ))}
                </span>
                <span>Risco {cost.levelName}</span>
              </p>
            </div>
            <p className={styles.costText}>{cost.text}</p>
          </li>
        ))}
      </ul>

      {/* O cuidado que a própria página pratica. */}
      <div className={common.column}>
        <p className={styles.measure} data-intro="">
          <strong>Movimento na medida.</strong> Celulares e computadores têm uma opção de reduzir
          movimento, e um site bem feito obedece. Esta página obedece e tem um interruptor no canto
          da tela: desligado, nada se move.
        </p>
      </div>

      <div className={`${common.column} ${styles.questions}`}>
        <div className={styles.questionsHead} data-intro="">
          <h3 className={common.subtitle}>Antes de encomendar um site assim, pergunte</h3>
          <p className={styles.count} aria-live="polite">
            {done} de {QUESTIONS.length} respondidas
          </p>
        </div>
        <ul className={styles.checklist}>
          {QUESTIONS.map((question, i) => (
            <li key={question}>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => setChecked((list) => list.map((value, j) => (j === i ? !value : value)))}
                />
                <span className={styles.box} aria-hidden="true" />
                <span className={styles.question}>{question}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
