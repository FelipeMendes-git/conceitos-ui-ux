import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../motion.js'
import common from './common.module.css'
import styles from './cost.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: QUANTO CUSTA
 *
 * Os quatro custos com um medidor de risco cada, e a lista de perguntas para
 * fazer antes de encomendar um site assim, que o leitor pode ir marcando.
 */

const COSTS = [
  {
    name: 'Velocidade do site',
    level: 2,
    levelName: 'médio',
    text: 'A ferramenta em si é leve: a parte principal do GSAP pesa cerca de 27 kB, menos que uma foto. O peso de um site premiado vem do que costuma vir junto: 3D, vídeo, fotos grandes, várias fontes. O custo que mais aparece é a fluidez: em celular simples, muita coisa se movendo engasga e gasta bateria.',
  },
  {
    name: 'Leitura e acessibilidade',
    level: 3,
    levelName: 'alto',
    text: 'Movimento grande ligado à rolagem dá enjoo e tontura em quem tem distúrbios de equilíbrio. Mexer na rolagem desorienta: no estudo do Nielsen Norman Group, a maioria dos participantes ficou ao menos um pouco desorientada. Texto partido em letras pode ser lido letra por letra ou nem ser lido. Tudo tem solução, se for pedido e testado.',
  },
  {
    name: 'Produção',
    level: 3,
    levelName: 'alto',
    text: 'Caro e lento. Precisa de quem desenhe o movimento, de um desenvolvedor criativo que o construa e, muitas vezes, de um artista 3D. Cada cena é ajustada no detalhe, em cada tamanho de tela. E trocar um texto depois pode desmontar a coreografia.',
  },
  {
    name: 'Durabilidade',
    level: 2,
    levelName: 'médio',
    text: 'O efeito da moda envelhece depressa e logo vem pronto em ferramentas visuais e assistentes de inteligência artificial; quando qualquer um consegue o efeito padrão, ele deixa de diferenciar. O que não envelhece é o ofício do tempo: ordem, ritmo e moderação.',
  },
]

const QUESTIONS = [
  'Como o site fica num celular simples? (Peça para ver, não só para ouvir.)',
  'O site respeita quem pede menos movimento no aparelho?',
  'O conteúdo aparece se a animação falhar ou demorar?',
  'Dá para trocar textos e imagens sem desmontar a coreografia?',
  'A rolagem continua sendo de quem visita?',
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
          Em linguagem de quem decide: o que um site assim cobra em velocidade, em leitura, em produção
          e em tempo de vida. O medidor é a nossa avaliação do risco, a partir da pesquisa.
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
