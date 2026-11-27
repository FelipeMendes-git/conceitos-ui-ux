import { useLayoutEffect, useRef } from 'react'
import { FRAMES } from '../frames.js'
import { exposeIn, gsap, NARROW, ScrollTrigger, WIDE } from '../motion.js'
import styles from './muybridge.module.css'

/*
 * CENA: ANTES DO MOVIMENTO, O QUADRO
 *
 * Um rolo tingido de âmbar: o dia na pista de Palo Alto. O campo de cor se
 * abre do tamanho de um quadro até a tela inteira. Os doze quadros do cartão
 * de Muybridge (1878) começam lado a lado, como cópias jogadas na mesa; com a
 * página fixada, a rolagem junta os doze numa pilha e depois passa um quadro
 * por vez: o cavalo galopa para a frente quando se rola para baixo e volta
 * quando se rola para cima. A cena termina no quadro 3, o que respondeu à
 * pergunta de Stanford.
 *
 * Três modos, escolhidos por largura e movimento (data-mode na seção):
 *   pin    — janela larga e movimento completo: folha, pilha e galope fixados.
 *   scrub  — janela estreita e movimento completo: o galope passa conforme a
 *            cena atravessa a tela, sem fixar.
 *   (nada) — movimento reduzido ou sem animação: a folha inteira, parada.
 */

// O galope usa os onze primeiros quadros; o 12º do cartão é o cavalo parado.
const GALLOP = 11
// Quadro em que as quatro patas estão no ar (índice 2 = quadro 3).
const ANSWER = 2
// Uma passada completa e mais três quadros, para parar no quadro 3.
const LAST_STEP = GALLOP + ANSWER

const CAPTIONS = [
  'Junho de 1878. Doze câmeras em fila na pista de Palo Alto, cada uma disparada quando o cavalo rompia um fio esticado no caminho.',
  'Mostrados um depois do outro, os quadros viram movimento. Aqui, quem gira a manivela é a sua rolagem.',
  'No quadro 3, as quatro patas estão no ar. Era a pergunta de Leland Stanford, o dono do cavalo, e a resposta foi sim.',
]

const DIGITS = Array.from({ length: 10 }, (_, digit) => digit)

/** Qual quadro aparece em cada passo da reprodução. */
function frameAt(step) {
  return step >= GALLOP ? Math.min(ANSWER, step - GALLOP) : step
}

export default function Muybridge({ motionOn }) {
  const sceneRef = useRef(null)

  useLayoutEffect(() => {
    if (!motionOn) return undefined

    const scene = sceneRef.current
    const stage = scene.querySelector(`.${styles.stage}`)
    const frames = gsap.utils.toArray(`.${styles.frame}`, scene)
    const slots = gsap.utils.toArray(`.${styles.slot}`, scene)
    const viewer = scene.querySelector(`.${styles.viewer}`)
    const strips = gsap.utils.toArray(`.${styles.digitStrip}`, scene)
    const captions = gsap.utils.toArray(`.${styles.caption}`, scene)

    // O número do quadro rola como um contador mecânico: cada algarismo é uma
    // fita de 0 a 9 que sobe ou desce até o algarismo certo.
    let shown = -1
    function show(index, answer = false) {
      stage.dataset.answer = String(answer)
      if (index === shown) return
      shown = index
      frames.forEach((frame, i) => frame.toggleAttribute('data-active', i === index))
      const [tens, units] = String(index + 1).padStart(2, '0')
      gsap.to(strips[0], { yPercent: -10 * Number(tens), duration: 0.45, ease: 'power3.out', overwrite: true })
      gsap.to(strips[1], { yPercent: -10 * Number(units), duration: 0.45, ease: 'power3.out', overwrite: true })
    }

    function setCaption(step) {
      captions.forEach((caption, i) => caption.toggleAttribute('data-active', i === step))
    }

    function reset() {
      delete scene.dataset.mode
      delete stage.dataset.playing
      delete stage.dataset.answer
      frames.forEach((frame) => frame.removeAttribute('data-active'))
      captions.forEach((caption) => caption.removeAttribute('data-active'))
      shown = -1
    }

    const mm = gsap.matchMedia(scene)

    mm.add(WIDE, () => {
      scene.dataset.mode = 'pin'
      gsap.set(strips[1], { yPercent: -10 }) // começa em "01"
      const split = exposeIn(scene.querySelector(`.${styles.title}`), {
        lineClass: styles.titleLine,
        kind: 'escuro',
        scrollTrigger: { trigger: scene, start: 'top 60%', once: true },
      })

      // O campo âmbar se abre do tamanho de um quadro até a tela inteira,
      // enquanto a cena sobe até o topo da janela.
      gsap.fromTo(
        `.${styles.field}`,
        { clipPath: 'inset(12% 4% 0% 4%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: scene, start: 'top bottom', end: 'top top', scrub: true },
        },
      )

      // Onde cada quadro estava na folha, em relação ao visor do centro. Os
      // lugares da folha e o visor nunca se movem, então a medida é estável
      // mesmo no meio da animação; ela é refeita quando a janela muda.
      const offset = (i) => {
        const slot = slots[i].getBoundingClientRect()
        const view = viewer.getBoundingClientRect()
        return {
          x: slot.left + slot.width / 2 - (view.left + view.width / 2),
          y: slot.top + slot.height / 2 - (view.top + view.height / 2),
          scale: slot.width / view.width,
        }
      }

      const playhead = { step: 0 }
      const timeline = gsap.timeline({ defaults: { ease: 'none' }, paused: true })

      // 1. A folha: os doze quadros voam para a pilha do visor, girando de
      //    leve, como cópias juntadas na mesa.
      frames.forEach((frame, i) => {
        timeline.fromTo(
          frame,
          {
            x: () => offset(i).x,
            y: () => offset(i).y,
            scale: () => offset(i).scale,
            rotation: () => gsap.utils.random(-9, 9, 0.5),
          },
          { x: 0, y: 0, scale: 1, rotation: 0, duration: 1, ease: 'power3.inOut' },
          0.15 + i * 0.045,
        )
      })
      timeline.to(`.${styles.number}`, { autoAlpha: 1, duration: 0.3 }, '-=0.3')

      // 2. A manivela: um quadro por vez, uma passada, até parar no quadro 3.
      timeline.addLabel('galope', '+=0.15')
      timeline.to(
        playhead,
        {
          step: LAST_STEP + 0.999,
          duration: 2.3,
          onUpdate() {
            const step = Math.floor(playhead.step)
            show(frameAt(step), step >= LAST_STEP)
          },
        },
        'galope',
      )
      timeline.addLabel('resposta')
      timeline.to({}, { duration: 0.6 })

      // As legendas e o modo do visor acompanham o trecho em que a cena está.
      const galope = timeline.labels.galope / timeline.duration()
      const resposta = timeline.labels.resposta / timeline.duration()
      timeline.eventCallback('onUpdate', () => {
        const p = timeline.progress()
        setCaption(p < galope ? 0 : p < resposta - 0.01 ? 1 : 2)
        stage.dataset.playing = String(p >= galope)
      })
      setCaption(0)
      stage.dataset.playing = 'false'

      ScrollTrigger.create({
        trigger: scene,
        start: 'top top',
        end: '+=160%',
        pin: true,
        scrub: 0.7,
        animation: timeline,
        invalidateOnRefresh: true,
      })

      return () => {
        split.revert()
        reset()
      }
    })

    mm.add(NARROW, () => {
      scene.dataset.mode = 'scrub'
      stage.dataset.playing = 'true'
      const split = exposeIn(scene.querySelector(`.${styles.title}`), {
        lineClass: styles.titleLine,
        kind: 'escuro',
        scrollTrigger: { trigger: scene, start: 'top 80%', once: true },
      })
      const playhead = { step: 0 }
      show(0)
      gsap.to(playhead, {
        step: LAST_STEP + 0.999,
        ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top 85%', end: 'bottom 20%', scrub: 0.5 },
        onUpdate() {
          const step = Math.floor(playhead.step)
          show(frameAt(step), step >= LAST_STEP)
        },
      })
      return () => {
        split.revert()
        reset()
      }
    })

    return () => mm.revert()
  }, [motionOn])

  return (
    <section ref={sceneRef} className={styles.scene} data-tint="ambar" aria-labelledby="cena-quadro">
      {/* O banho âmbar da cena, com a grade de medição por cima. */}
      <div className={styles.field} aria-hidden="true" />

      <div className={styles.layout}>
        <div className={styles.text}>
          <h2 id="cena-quadro" className={styles.title}>
            Antes do movimento, o quadro
          </h2>
          <div className={styles.captions}>
            {CAPTIONS.map((caption) => (
              <p key={caption} className={styles.caption}>
                {caption}
              </p>
            ))}
          </div>
        </div>

        <figure className={styles.figure}>
          <div
            className={styles.stage}
            role="img"
            aria-label="Doze fotografias de um cavalo a galope, tiradas em sequência em 1878. No terceiro quadro, as quatro patas estão fora do chão."
          >
            {/* Os lugares da folha e o visor: invisíveis, servem de medida. */}
            <div className={styles.slots} aria-hidden="true">
              {FRAMES.map((src) => (
                <span key={src} className={styles.slot} />
              ))}
            </div>
            <span className={styles.viewer} aria-hidden="true" />

            <div className={styles.frames} aria-hidden="true">
              {FRAMES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width="680"
                  height="435"
                  className={styles.frame}
                  style={{ zIndex: FRAMES.length - i }}
                  decoding="async"
                />
              ))}
            </div>

            <p className={styles.number} aria-hidden="true">
              <span className={styles.digits}>
                {[0, 1].map((place) => (
                  <span key={place} className={styles.digit}>
                    <span className={styles.digitStrip}>
                      {DIGITS.map((digit) => (
                        <span key={digit}>{digit}</span>
                      ))}
                    </span>
                  </span>
                ))}
              </span>
              <span className={styles.numberOf}>de 12</span>
            </p>
          </div>
          <figcaption className={styles.credit}>
            Eadweard Muybridge, <cite>The Horse in Motion</cite>, 1878. Biblioteca do Congresso dos
            EUA, domínio público.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
