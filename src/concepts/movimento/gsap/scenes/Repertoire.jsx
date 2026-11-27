import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Draggable, gsap, ScrollTrigger, SplitText } from '../motion.js'
import common from './common.module.css'
import styles from './repertoire.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: O REPERTÓRIO
 *
 * Três truques que se repetem nos sites premiados, um por faixa de cor. Cada
 * faixa faz o que explica: o texto sobre texto que entra em cena entra em
 * cena, a fita se arrasta, a caixa rola com inércia. (A rolagem que conduz a
 * cena já foi vista no cavalo, e a letra que estica, no título da abertura.)
 */

/** Uma faixa do repertório: texto à esquerda, demonstração à direita. */
function Band({ id, tint, color, title, what, where, risk, children }) {
  return (
    <article className={styles.band} data-tint={tint} style={{ '--cor': color }} aria-labelledby={id}>
      <div className={`${common.column} ${styles.bandInner}`}>
        <div className={styles.bandText}>
          <h3 id={id} className={styles.bandTitle} data-title="escuro">
            {title}
          </h3>
          <p data-intro="">{what}</p>
          <p className={styles.note} data-intro="">
            <span className={styles.noteLabel}>Onde aparece</span>
            {where}
          </p>
          <p className={styles.note} data-intro="">
            <span className={styles.noteLabel}>Cuidado</span>
            {risk}
          </p>
        </div>
        <div className={styles.demo}>{children}</div>
      </div>
    </article>
  )
}

/* ---------- 1. Texto que entra em cena ---------- */

const SPLITS = [
  { id: 'lines', name: 'Linhas' },
  { id: 'words', name: 'Palavras' },
  { id: 'chars', name: 'Letras' },
]

function TextDemo({ motionOn }) {
  const [type, setType] = useState('lines')
  const [take, setTake] = useState(0)
  const visualRef = useRef(null)
  const seen = useRef(false)

  // A frase é partida do jeito escolhido e entra de novo. A cópia que o
  // leitor de tela lê fica inteira, fora da animação.
  //
  // Os pedaços são blocos (o padrão do SplitText), não trechos de texto
  // corrido: só um bloco pode se deslocar e ficar escondido atrás da máscara.
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const visual = visualRef.current
    const split = SplitText.create(visual, {
      type: type === 'chars' ? 'words, chars' : type,
      mask: type === 'chars' ? 'chars' : type === 'lines' ? 'lines' : undefined,
      aria: 'none',
    })
    const parts = split[type]
    const play = () => {
      if (type === 'words') {
        return gsap.fromTo(parts, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.09, ease: 'back.out(2)' })
      }
      return gsap.fromTo(
        parts,
        { yPercent: 115 },
        { yPercent: 0, duration: type === 'chars' ? 0.6 : 1, stagger: type === 'chars' ? 0.025 : 0.12, ease: 'expo.out' },
      )
    }
    let tween = null
    let trigger = null
    if (seen.current) {
      tween = play()
    } else {
      gsap.set(parts, type === 'words' ? { autoAlpha: 0 } : { yPercent: 115 })
      trigger = ScrollTrigger.create({
        trigger: visual,
        start: 'top 80%',
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
      split.revert()
    }
  }, [type, take, motionOn])

  const sentence = 'Cada palavra chega na hora certa, e a frase toda chega junto.'

  return (
    <div className={styles.textDemo}>
      <div className={styles.bigLine}>
        <p className="sr-only">{sentence}</p>
        <div ref={visualRef} aria-hidden="true">
          {sentence}
        </div>
      </div>
      {motionOn ? (
        <div className={styles.controls}>
          <fieldset className={common.choiceGroup}>
            <legend className="sr-only">Entrar por</legend>
            {SPLITS.map((option) => (
              <label key={option.id} className={common.choice}>
                <input
                  type="radio"
                  name="entrar-por"
                  checked={type === option.id}
                  onChange={() => {
                    seen.current = true
                    setType(option.id)
                  }}
                />
                <span>{option.name}</span>
              </label>
            ))}
          </fieldset>
          <button
            type="button"
            className={common.button}
            onClick={() => {
              seen.current = true
              setTake((n) => n + 1)
            }}
          >
            Tocar de novo
          </button>
        </div>
      ) : (
        <p className={styles.reducedNote}>Com o movimento reduzido, a frase já aparece inteira.</p>
      )}
    </div>
  )
}

/* ---------- 2. Arrastar com peso ---------- */

// Os cartões da fita: as cores desta página e a cena que cada uma marca.
const CARDS = [
  { color: 'var(--rosa)', name: 'Rosa', marks: 'a abertura' },
  { color: 'var(--ambar)', name: 'Âmbar', marks: 'o cavalo' },
  { color: 'var(--azul)', name: 'Azul', marks: 'a linha do tempo' },
  { color: 'var(--verde)', name: 'Verde', marks: 'de onde vem' },
  { color: 'var(--lavanda)', name: 'Lavanda', marks: 'os prêmios' },
  { color: 'var(--vermelho)', name: 'Vermelho', marks: 'quanto custa' },
]

function DragDemo({ motionOn }) {
  const frameRef = useRef(null)
  const stripRef = useRef(null)
  const draggable = useRef(null)
  const [index, setIndex] = useState(0)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const strip = stripRef.current
    const step = () => strip.children[1].offsetLeft - strip.children[0].offsetLeft
    const maxIndex = () => {
      const visible = Math.max(1, Math.floor(frame.clientWidth / step()))
      return Math.max(0, CARDS.length - visible)
    }
    const [instance] = Draggable.create(strip, {
      type: 'x',
      bounds: frame,
      edgeResistance: 0.85,
      // Solto, o cartão desliza com inércia e para encaixado num cartão.
      inertia: motionOn,
      snap: (value) => Math.round(value / step()) * step(),
      onDragEnd() {
        setIndex(Math.min(maxIndex(), Math.round(-this.endX / step())))
      },
      onThrowComplete() {
        setIndex(Math.min(maxIndex(), Math.round(-this.x / step())))
      },
    })
    draggable.current = { instance, step, maxIndex }
    return () => {
      instance.kill()
      gsap.set(strip, { clearProps: 'transform' })
    }
  }, [motionOn])

  // Os botões fazem o mesmo pelo teclado: um cartão para cada lado.
  function go(delta) {
    const { instance, step, maxIndex } = draggable.current
    const next = Math.max(0, Math.min(maxIndex(), index + delta))
    setIndex(next)
    gsap.to(stripRef.current, {
      x: -next * step(),
      duration: motionOn ? 0.9 : 0,
      ease: 'expo.out',
      onUpdate: () => instance.update(),
    })
  }

  return (
    <div className={styles.dragDemo}>
      <div ref={frameRef} className={styles.dragFrame}>
        <ul ref={stripRef} className={styles.dragStrip} aria-label="As cores desta página">
          {CARDS.map((card) => (
            <li key={card.name} className={styles.card} style={{ '--cor-cartao': card.color }}>
              <span className={styles.cardKey} aria-hidden="true" />
              <span className={styles.cardName}>{card.name}</span>
              <span className={styles.cardMarks}>{card.marks}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.controls}>
        <button type="button" className={common.button} onClick={() => go(-1)}>
          Anterior
        </button>
        <button type="button" className={common.button} onClick={() => go(1)}>
          Próximo
        </button>
        <p className={styles.dragHint}>Ou arraste a fita e solte com força.</p>
      </div>
    </div>
  )
}

/* ---------- 3. Rolagem suave ---------- */

// O que as duas caixas rolam: os truques que esta página usa.
const SCROLL_LINES = [
  'Barras de cor',
  'Título em letras',
  'Losangos soltos',
  'Cavalo em quadros',
  'Agulha do tempo',
  'Ritmo com mola',
  'Fita que desliza',
  'Notas que contam',
]

function SmoothDemo({ motionOn }) {
  const smoothRef = useRef(null)

  // Na caixa da direita, a roda do mouse não rola direto: a caixa desliza até
  // o destino e desacelera, como nos sites com rolagem suave. Nas pontas, a
  // rolagem volta para a página, para a caixa não prender o visitante.
  useEffect(() => {
    if (!motionOn) return undefined
    const box = smoothRef.current
    const state = { target: box.scrollTop }
    const onWheel = (event) => {
      const max = box.scrollHeight - box.clientHeight
      const atTop = state.target <= 0 && event.deltaY < 0
      const atBottom = state.target >= max && event.deltaY > 0
      if (atTop || atBottom) return
      event.preventDefault()
      state.target = Math.max(0, Math.min(max, state.target + event.deltaY))
      gsap.to(box, { scrollTop: state.target, duration: 1.2, ease: 'power3.out', overwrite: true })
    }
    const onScroll = () => {
      if (!gsap.isTweening(box)) state.target = box.scrollTop
    }
    box.addEventListener('wheel', onWheel, { passive: false })
    box.addEventListener('scroll', onScroll)
    return () => {
      box.removeEventListener('wheel', onWheel)
      box.removeEventListener('scroll', onScroll)
      gsap.killTweensOf(box)
    }
  }, [motionOn])

  const list = (
    <ol className={styles.scrollList}>
      {SCROLL_LINES.map((line, i) => (
        <li key={line}>
          <span className={styles.scrollNumber} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          {line}
        </li>
      ))}
    </ol>
  )

  return (
    <div className={styles.smoothDemo}>
      <div className={styles.scrollBoxWrap}>
        <p className={styles.scrollLabel}>Rolagem do aparelho</p>
        {/* Caixas roláveis precisam receber foco para rolar pelo teclado. */}
        <div className={styles.scrollBox} tabIndex={0} role="region" aria-label="Lista com a rolagem do aparelho">
          {list}
        </div>
      </div>
      <div className={styles.scrollBoxWrap}>
        <p className={styles.scrollLabel}>Rolagem com inércia</p>
        <div
          ref={smoothRef}
          className={styles.scrollBox}
          tabIndex={0}
          role="region"
          aria-label="Lista com rolagem suave"
        >
          {list}
        </div>
      </div>
    </div>
  )
}

/* ---------- A cena ---------- */

export default function Repertoire({ motionOn }) {
  const sceneRef = useRef(null)
  useSceneIntro(sceneRef, motionOn)

  return (
    <section ref={sceneRef} className={styles.scene} aria-labelledby="cena-repertorio">
      <div className={`${common.section} ${styles.opening}`} data-tint="rosa">
        <div className={`${common.column} ${common.head}`}>
          <h2 id="cena-repertorio" className={common.title} data-title="">
            O repertório
          </h2>
          <p className={common.intro} data-intro="">
            Os truques que se repetem nos sites premiados. O mais comum você já viu no cavalo: a
            rolagem que conduz a cena. Aqui vão mais três.
          </p>
        </div>
      </div>

      <Band
        id="truque-texto"
        tint="rosa"
        color="var(--rosa)"
        title="Texto que entra em cena"
        what="Títulos e frases entram por partes: por linhas, por palavras ou por letras."
        where="Em quase todo site premiado, na abertura e nos títulos."
        risk="Letra por letra é o mais vistoso e o mais arriscado: vários leitores de tela soletram a palavra ou se calam."
      >
        <TextDemo motionOn={motionOn} />
      </Band>

      <Band
        id="truque-arrastar"
        tint="ambar"
        color="var(--ambar)"
        title="Arrastar com peso"
        what="O que se arrasta continua deslizando depois de solto e para aos poucos, como um objeto de verdade."
        where="Carrosséis, galerias e seletores."
        risk="Precisa de botões que façam o mesmo, para quem não usa o mouse."
      >
        <DragDemo motionOn={motionOn} />
      </Band>

      <Band
        id="truque-rolagem-suave"
        tint="azul"
        color="var(--azul)"
        title="Rolagem suave"
        what="A página desliza com inércia quando se gira a roda do mouse. É a marca de muitos sites premiados."
        where="Sites de estúdios, de moda e de lançamentos, quase sempre só no computador."
        risk="É o truque que mais desorienta, porque mexe num gesto que todos conhecem de cor. Aqui, fica dentro da caixa."
      >
        <SmoothDemo motionOn={motionOn} />
      </Band>
    </section>
  )
}
