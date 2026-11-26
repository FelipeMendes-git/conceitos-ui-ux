import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../motion.js'
import common from './common.module.css'
import styles from './awards.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: COMO SE GANHA UM PRÊMIO
 *
 * Os pesos da nota do Awwwards numa barra só, os selos em degraus e o
 * boletim do Site do Ano de 2025, com as notas desenhadas como barras que
 * crescem e números que contam até o valor. Números conferidos na página do
 * próprio prêmio, em novembro de 2026.
 */

const WEIGHTS = [
  { name: 'Design', value: 40, color: 'var(--rosa)' },
  { name: 'Usabilidade', value: 30, color: 'var(--azul)' },
  { name: 'Criatividade', value: 20, color: 'var(--ambar)' },
  { name: 'Conteúdo', value: 10, color: 'var(--verde)' },
]

const BADGES = [
  { name: 'Menção honrosa', note: 'O site passou pelo júri com boa nota.' },
  { name: 'Site do Dia', note: 'A melhor nota daquele dia.' },
  { name: 'Site do Mês', note: 'Escolhido entre os Sites do Dia do mês.' },
  { name: 'Site do Ano', note: 'Escolhido entre os do ano inteiro.' },
]

const JURY = [
  { name: 'Design', value: 8.12 },
  { name: 'Usabilidade', value: 7.9 },
  { name: 'Criatividade', value: 8.71 },
  { name: 'Conteúdo', value: 8.18 },
]

const TECH = [
  { name: 'Animação', value: 8.6, flag: 'a mais alta' },
  { name: 'Velocidade', value: 7.6 },
  { name: 'Adaptação a cada tela', value: 7.4 },
  { name: 'Acessibilidade', value: 7, flag: 'a mais baixa' },
]

/** "8,12" */
const format = (value) => value.toFixed(2).replace('.', ',')

function ScoreRows({ rows, color }) {
  return (
    <ul className={styles.scores}>
      {rows.map((row) => (
        <li key={row.name} className={styles.score} data-flag={row.flag ? (row.flag === 'a mais alta' ? 'alta' : 'baixa') : undefined}>
          <span className={styles.scoreName}>
            {row.name}
            {row.flag && <span className={styles.flag}>{row.flag}</span>}
          </span>
          <span className={styles.scoreTrack} aria-hidden="true">
            <span className={styles.scoreBar} style={{ '--valor': row.value / 10, '--cor-barra': color }} />
          </span>
          <span className={styles.scoreValue} data-value={row.value}>
            {format(row.value)}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function Awards({ motionOn }) {
  const sceneRef = useRef(null)
  useSceneIntro(sceneRef, motionOn)

  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const scene = sceneRef.current
    const ctx = gsap.context(() => {
      // Os pesos crescem um depois do outro, da esquerda para a direita.
      gsap.from(`.${styles.weight}`, {
        scaleX: 0,
        transformOrigin: '0% 50%',
        duration: 0.8,
        stagger: 0.18,
        ease: 'expo.out',
        scrollTrigger: { trigger: `.${styles.weights}`, start: 'top 80%', once: true },
      })

      // Os selos sobem como degraus.
      gsap.from(`.${styles.badge}`, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'back.out(1.8)',
        scrollTrigger: { trigger: `.${styles.badges}`, start: 'top 80%', once: true },
      })

      // No boletim, cada barra cresce até a nota e o número conta junto.
      gsap.utils.toArray(`.${styles.scores}`).forEach((list) => {
        const bars = list.querySelectorAll(`.${styles.scoreBar}`)
        const values = list.querySelectorAll(`.${styles.scoreValue}`)
        const counters = [...values].map((element) => ({ element, value: 0, target: Number(element.dataset.value) }))
        const timeline = gsap.timeline({ scrollTrigger: { trigger: list, start: 'top 82%', once: true } })
        timeline.from(bars, { scaleX: 0, transformOrigin: '0% 50%', duration: 1.2, stagger: 0.1, ease: 'expo.out' })
        counters.forEach((counter, i) => {
          timeline.to(
            counter,
            {
              value: counter.target,
              duration: 1.2,
              ease: 'expo.out',
              onUpdate: () => {
                counter.element.textContent = format(counter.value)
              },
            },
            i * 0.1,
          )
        })
      })
    }, scene)
    return () => ctx.revert()
  }, [motionOn])

  return (
    <section ref={sceneRef} className={`${common.section} ${styles.scene}`} data-tint="lavanda" aria-labelledby="cena-premios">
      <div className={`${common.column} ${common.head}`}>
        <h2 id="cena-premios" className={common.title} data-title="">
          Como se ganha um prêmio
        </h2>
        <div>
          <p className={common.intro} data-intro="">
            Os prêmios de sites nasceram junto com eles. O FWA, de 2000, premiava sites feitos em
            Flash. O Awwwards, criado em 2009 na Espanha, escolhe um Site do Dia todos os dias. O
            Webby, de 1996, cobre a internet inteira, de sites a podcasts.
          </p>
        </div>
      </div>

      <div className={`${common.column} ${styles.blocks}`}>
        {/* Os pesos da nota. */}
        <div className={styles.block} data-intro="">
          <h3 className={common.subtitle}>Como o Awwwards dá a nota</h3>
          <p className={styles.text}>
            Um júri de profissionais da área dá notas de 0 a 10 em quatro critérios, que pesam assim na
            nota final:
          </p>
          <div className={styles.weights} role="img" aria-label="Design vale 40%, usabilidade 30%, criatividade 20% e conteúdo 10% da nota.">
            {WEIGHTS.map((weight) => (
              <span
                key={weight.name}
                className={styles.weight}
                style={{ '--peso': weight.value, '--cor-peso': weight.color }}
                aria-hidden="true"
              >
                <span className={styles.weightValue}>{weight.value}%</span>
                <span className={styles.weightName}>{weight.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Os selos. */}
        <div className={styles.block}>
          <h3 className={common.subtitle} data-intro="">
            Os selos
          </h3>
          <ol className={styles.badges}>
            {BADGES.map((badge, i) => (
              <li key={badge.name} className={styles.badge} style={{ '--degrau': i }}>
                <span className={styles.badgeKey} aria-hidden="true" />
                <span className={styles.badgeName}>{badge.name}</span>
                <span className={styles.badgeNote}>{badge.note}</span>
              </li>
            ))}
          </ol>
          <p className={styles.text} data-intro="">
            Há também um prêmio separado de desenvolvimento, que olha a parte técnica: animação,
            velocidade, adaptação a cada tela, acessibilidade.
          </p>
        </div>

        {/* O boletim do Site do Ano. */}
        <div className={`${styles.block} ${styles.report}`}>
          <div className={styles.reportHead} data-intro="">
            <h3 className={common.subtitle}>O boletim do Site do Ano de 2025</h3>
            <p className={styles.text}>
              O site do piloto de Fórmula 1 Lando Norris, feito pelo estúdio OFF+BRAND com Webflow,
              GSAP e 3D. Foi Site do Dia em 17 de novembro de 2025, depois Site do Ano, e também o mais
              votado pelo público.
            </p>
          </div>
          <div className={styles.reportColumns}>
            <div>
              <p className={styles.reportLabel}>Notas do júri</p>
              <ScoreRows rows={JURY} color="var(--lavanda)" />
            </div>
            <div>
              <p className={styles.reportLabel}>Avaliação técnica</p>
              <ScoreRows rows={TECH} color="var(--azul)" />
            </div>
          </div>
          <p className={styles.lesson} data-intro="">
            O melhor movimento do ano teve a acessibilidade como ponto mais fraco. É o resumo desta
            tela: o prêmio mede ofício diante de colegas de profissão. Não mede venda, cadastro nem a
            satisfação de quem usa.
          </p>
        </div>

        {/* Outros casos. */}
        <ul className={styles.cases} data-intro="">
          <li>
            <span className={styles.caseName}>Scout Motors</span>
            Loja do ano de 2025 no Awwwards: o site de uma marca de veículos, feito pelo estúdio
            Locomotive. Produto caro, compra rara, apresentação contada como narrativa.
          </li>
          <li>
            <span className={styles.caseName}>Programatório, de Londrina</span>
            Estúdio brasileiro com quatro prêmios de Site do Dia e quatro de desenvolvimento no
            Awwwards.
          </li>
          <li>
            <span className={styles.caseName}>A vitrine do estúdio</span>
            Ganhar atrai clientes e talentos para quem fez o site. Para a marca que contrata, o prêmio é
            do estúdio; o resultado é dela.
          </li>
        </ul>
      </div>
    </section>
  )
}
