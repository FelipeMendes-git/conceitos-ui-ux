import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Draggable, gsap, NARROW, ScrollTrigger, SplitText, WIDE } from '../motion.js'
import common from './common.module.css'
import styles from './repertoire.module.css'
import { useSceneIntro } from './useSceneIntro.js'

/*
 * CENA: O REPERTÓRIO
 *
 * Os truques que se repetem nos sites premiados, um por faixa de cor. Cada
 * faixa faz o que explica: o texto sobre texto que entra em cena entra em
 * cena, a cena que fica parada fica parada, e assim por diante.
 */

/**
 * Uma faixa do repertório: texto à esquerda, demonstração à direita. Com
 * "wide", a demonstração ocupa a largura toda, embaixo do texto.
 */
function Band({ id, tint, color, title, what, where, risk, wide = false, children }) {
  return (
    <article className={styles.band} data-tint={tint} style={{ '--cor': color }} aria-labelledby={id}>
      <div className={`${common.column} ${styles.bandInner}`} data-wide={wide || undefined}>
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
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const visual = visualRef.current
    const split = SplitText.create(visual, {
      type: type === 'chars' ? 'words, chars' : type,
      tag: 'span',
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
      <p className={styles.bigLine}>
        <span className="sr-only">{sentence}</span>
        <span ref={visualRef} aria-hidden="true">
          {sentence}
        </span>
      </p>
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

/* ---------- 2. Cena que fica parada ---------- */

const STEPS = ['A cena para no lugar', 'O conteúdo muda', 'A cena solta e a página segue']

function PinDemo({ motionOn }) {
  const demoRef = useRef(null)

  useLayoutEffect(() => {
    if (!motionOn) return undefined
    // O que se fixa é o invólucro da faixa inteira, achado a partir daqui.
    const demo = demoRef.current
    const band = demo.closest(`.${styles.pinWrap}`)
    const timer = demo.querySelector(`.${styles.timer}`)
    const bar = demo.querySelector(`.${styles.timerBar}`)
    const steps = gsap.utils.toArray(`.${styles.step}`, demo)

    const update = (progress) => {
      timer.textContent = `${(progress * 3).toFixed(1).replace('.', ',')} s`
      bar.style.transform = `scaleX(${progress})`
      const current = Math.min(2, Math.floor(progress * 3))
      steps.forEach((step, i) => step.toggleAttribute('data-active', i === current))
    }
    update(0)

    const mm = gsap.matchMedia(band)
    // Na janela larga, a faixa inteira fica parada enquanto o relógio anda.
    mm.add(WIDE, () => {
      band.dataset.mode = 'pin'
      ScrollTrigger.create({
        trigger: band,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => update(self.progress),
      })
      return () => delete band.dataset.mode
    })
    // Na estreita, o relógio anda enquanto a faixa passa, sem parar.
    mm.add(NARROW, () => {
      ScrollTrigger.create({
        trigger: demo,
        start: 'top 85%',
        end: 'bottom 25%',
        scrub: 0.4,
        onUpdate: (self) => update(self.progress),
      })
    })
    return () => {
      mm.revert()
      steps.forEach((step) => step.removeAttribute('data-active'))
    }
  }, [motionOn])

  return (
    <div ref={demoRef} className={styles.pinDemo}>
      <p className={styles.timer} aria-hidden="true">
        3,0 s
      </p>
      <span className={styles.timerTrack} aria-hidden="true">
        <span className={styles.timerBar} />
      </span>
      <ol className={styles.steps}>
        {STEPS.map((step, i) => (
          <li key={step} className={styles.step}>
            <span className={styles.stepNumber} aria-hidden="true">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- 3. Letra que estica ---------- */

const ELASTIC = 'ELÁSTICA'

function StretchDemo({ motionOn }) {
  const wordRef = useRef(null)
  const [width, setWidth] = useState(100)
  const manualUntil = useRef(0)

  // A palavra é partida em letras uma vez; cada letra tem a própria largura.
  useLayoutEffect(() => {
    const word = wordRef.current
    const split = SplitText.create(word, { type: 'chars', tag: 'span', charsClass: styles.stretchChar, aria: 'none' })
    const chars = split.chars
    gsap.set(chars, { '--largura': 100 })
    if (!motionOn) {
      return () => split.revert()
    }
    const setters = chars.map((char) => gsap.quickTo(char, '--largura', { duration: 0.45, ease: 'power3.out' }))
    const ctx = gsap.context(() => {
      // Com a rolagem, uma onda passa pelas letras: cada uma estica e afina
      // um pouco depois da vizinha.
      ScrollTrigger.create({
        trigger: word,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (performance.now() < manualUntil.current) return
          chars.forEach((_, i) => {
            const wave = Math.sin(self.progress * Math.PI * 4 - i * 0.75)
            setters[i](100 + 48 * wave)
          })
        },
      })
    })
    // Com o mouse por perto, a letra mais próxima se alarga.
    const onMove = (event) => {
      manualUntil.current = performance.now() + 900
      chars.forEach((char, i) => {
        const box = char.getBoundingClientRect()
        const distance = Math.abs(event.clientX - (box.left + box.width / 2))
        setters[i](55 + 95 * Math.exp(-((distance / 110) ** 2)))
      })
    }
    word.addEventListener('pointermove', onMove)
    return () => {
      word.removeEventListener('pointermove', onMove)
      ctx.revert()
      split.revert()
    }
  }, [motionOn])

  // O controle deslizante faz o mesmo pelo teclado e pelo toque.
  function handleWidth(event) {
    const value = Number(event.target.value)
    setWidth(value)
    manualUntil.current = performance.now() + 2500
    const chars = wordRef.current.querySelectorAll(`.${styles.stretchChar}`)
    gsap.to(chars, { '--largura': value, duration: motionOn ? 0.4 : 0, ease: 'power3.out', overwrite: true })
  }

  return (
    <div className={styles.stretchDemo}>
      <p className={styles.stretchWord}>
        <span className="sr-only">{ELASTIC}</span>
        <span ref={wordRef} aria-hidden="true">
          {ELASTIC}
        </span>
      </p>
      <label className={styles.slider}>
        <span>Largura da letra</span>
        <input type="range" min="50" max="150" step="1" value={width} onChange={handleWidth} />
        <span className={styles.sliderValue} aria-hidden="true">
          {width}%
        </span>
      </label>
    </div>
  )
}

/* ---------- 4. Arrastar com peso ---------- */

const CARDS = [
  { color: 'var(--rosa)', name: 'Rosa', marks: 'a abertura' },
  { color: 'var(--ambar)', name: 'Âmbar', marks: 'o cavalo' },
  { color: 'var(--azul)', name: 'Azul', marks: 'a linha do tempo' },
  { color: 'var(--vermelho)', name: 'Vermelho', marks: 'o que não é' },
  { color: 'var(--verde)', name: 'Verde', marks: 'de onde vem' },
  { color: 'var(--lavanda)', name: 'Lavanda', marks: 'os prêmios' },
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

/* ---------- 5. Rolagem suave ---------- */

const SCROLL_LINES = [
  'Texto que entra letra por letra',
  'Rolagem que conduz a cena',
  'Cena que fica parada',
  'Letra que estica',
  'Arrastar com peso',
  'Ritmo com mola',
  'Contador que rola',
  'Cor que muda com a cena',
  'Forma que vira outra',
  'Losangos que fogem do mouse',
  'Faixa que corre com a rolagem',
  'Barras que varrem a tela',
  'Equalizador que pulsa',
  'Linha do tempo com agulha',
  'História que anda de lado',
  'Frase riscada e corrigida',
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

/* ---------- 6. Forma que vira outra ---------- */

const SHAPES = [
  { id: 'losango', name: 'Losango', d: 'M100 14 L186 100 L100 186 L14 100 Z' },
  { id: 'tocar', name: 'Tocar', d: 'M52 26 L170 100 L52 174 Z' },
  { id: 'parar', name: 'Parar', d: 'M38 38 L162 38 L162 162 L38 162 Z' },
  {
    id: 'estrela',
    name: 'Estrela',
    d: 'M100 12 L124 72 L188 74 L138 114 L156 178 L100 142 L44 178 L62 114 L12 74 L76 72 Z',
  },
  { id: 'seta', name: 'Seta', d: 'M20 82 L112 82 L112 40 L184 100 L112 160 L112 118 L20 118 Z' },
]

function MorphDemo({ motionOn }) {
  const [shape, setShape] = useState('losango')
  const pathRef = useRef(null)
  const touched = useRef(false)

  // A forma escolhida: a de agora se transforma nela, ponto por ponto.
  useLayoutEffect(() => {
    const target = SHAPES.find((s) => s.id === shape).d
    const tween = gsap.to(pathRef.current, {
      morphSVG: target,
      duration: motionOn ? 0.9 : 0,
      ease: 'expo.inOut',
    })
    return () => tween.kill()
  }, [shape, motionOn])

  // Enquanto ninguém escolhe, as formas se sucedem sozinhas, só com a faixa
  // na tela.
  useEffect(() => {
    if (!motionOn) return undefined
    let current = 0
    const cycle = gsap.delayedCall(1.8, function next() {
      if (touched.current) return
      current = (current + 1) % SHAPES.length
      setShape(SHAPES[current].id)
      cycle.restart(true)
    })
    cycle.pause()
    const trigger = ScrollTrigger.create({
      trigger: pathRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? cycle.resume() : cycle.pause()),
    })
    return () => {
      cycle.kill()
      trigger.kill()
    }
  }, [motionOn])

  return (
    <div className={styles.morphDemo}>
      <svg className={styles.morphArt} viewBox="0 0 200 200" aria-hidden="true">
        <path ref={pathRef} d={SHAPES[0].d} />
      </svg>
      <fieldset className={common.choiceGroup}>
        <legend className="sr-only">Escolha a forma</legend>
        {SHAPES.map((option) => (
          <label key={option.id} className={common.choice}>
            <input
              type="radio"
              name="forma"
              checked={shape === option.id}
              onChange={() => {
                touched.current = true
                setShape(option.id)
              }}
            />
            <span>{option.name}</span>
          </label>
        ))}
      </fieldset>
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
            Os truques que se repetem nos sites premiados, cada um numa faixa de cor. Cada faixa faz o
            que explica, e cada truque tem um lugar onde funciona e um custo.
          </p>
        </div>
      </div>

      <Band
        id="truque-texto"
        tint="rosa"
        color="var(--rosa)"
        title="Texto que entra em cena"
        what="Títulos e frases entram por partes: linha por linha, palavra por palavra ou letra por letra. Dá voz e drama ao texto."
        where="Em quase todo site premiado, na abertura e nos títulos de cada seção."
        risk="Letra por letra é o mais vistoso e o mais arriscado: vários leitores de tela soletram a palavra, leem pela metade ou se calam. Linha por linha resolve quase sempre."
      >
        <TextDemo motionOn={motionOn} />
      </Band>

      {/* Esta faixa fica parada na tela: o invólucro é o que se fixa. */}
      <div className={styles.pinWrap}>
        <Band
          id="truque-cena-parada"
          tint="azul"
          color="var(--azul)"
          title="Cena que fica parada"
          what="Um trecho da página para no lugar enquanto o conteúdo dele muda, e solta quando acaba. Conta uma história em passos sem trocar de página. Esta faixa está fazendo isso agora."
          where="Páginas de apresentação de produto, de serviço e a história de uma marca."
          risk="Funciona quando revela algo aos poucos; incomoda quando prende quem tem pressa ou esconde texto longo, segundo o Nielsen Norman Group."
        >
          <PinDemo motionOn={motionOn} />
        </Band>
      </div>

      <Band
        id="truque-letra-elastica"
        tint="verde"
        color="var(--verde)"
        title="Letra que estica"
        wide
        what="Fontes de largura variável podem esticar, afinar e engordar enquanto a página rola ou o mouse passa. A tipografia vira imagem."
        where="Aberturas, nomes de marca, títulos de campanha."
        risk="Só funciona com palavras curtas e grandes. Em texto corrido, letra que muda de largura atrapalha a leitura."
      >
        <StretchDemo motionOn={motionOn} />
      </Band>

      <Band
        id="truque-arrastar"
        tint="ambar"
        color="var(--ambar)"
        title="Arrastar com peso"
        what="O que se arrasta continua deslizando depois de solto e para aos poucos, como um objeto de verdade. Dá sensação física à interface."
        where="Carrosséis de projetos, galerias, linhas do tempo, seletores."
        risk="Precisa de um jeito de fazer o mesmo sem arrastar, com botões ou teclado; senão, quem não usa o mouse fica de fora."
      >
        <DragDemo motionOn={motionOn} />
      </Band>

      <Band
        id="truque-rolagem-suave"
        tint="lavanda"
        color="var(--lavanda)"
        title="Rolagem suave"
        what="A página inteira desliza com inércia quando se gira a roda do mouse. Parece luxo, e é a marca de muitos sites premiados."
        where="Sites de estúdios, de moda e de lançamentos, quase sempre só no computador; no celular o dedo já desliza."
        risk="É o truque que mais desorienta: mexe num gesto que a pessoa conhece de cor. Esta página não mexe na própria rolagem por isso; aqui ela fica dentro da caixa."
      >
        <SmoothDemo motionOn={motionOn} />
      </Band>

      <Band
        id="truque-forma"
        tint="vermelho"
        color="var(--vermelho)"
        title="Forma que vira outra"
        what="Uma forma se transforma em outra, ponto por ponto. Ícones que mudam de função, como tocar que vira parar, logotipos que se desmontam, ilustrações que respiram."
        where="Botões de tocar e pausar, menus que viram um X, aberturas de marca."
        risk="É leve para o aparelho, mas fácil de exagerar: forma demais mudando ao mesmo tempo distrai."
      >
        <MorphDemo motionOn={motionOn} />
      </Band>
    </section>
  )
}
