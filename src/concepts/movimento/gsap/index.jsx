import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ConceptPage from '../../../shared/ConceptPage.jsx'
import { COLORS, exposure, gsap, ScrollTrigger, splitForMotion, useMotion } from './motion.js'
import Awards from './scenes/Awards.jsx'
import Cost from './scenes/Cost.jsx'
import Credits from './scenes/Credits.jsx'
import Fit from './scenes/Fit.jsx'
import History from './scenes/History.jsx'
import Measure from './scenes/Measure.jsx'
import Muybridge from './scenes/Muybridge.jsx'
import Myths from './scenes/Myths.jsx'
import Repertoire from './scenes/Repertoire.jsx'
import Timeline from './scenes/Timeline.jsx'
import Voice from './scenes/Voice.jsx'
import './theme.css'
import styles from './styles.module.css'

/*
 * GSAP E SITES PREMIADOS (SPEC-806)
 *
 * A página é uma vitrine do GSAP: cada cena mostra um recurso diferente da
 * ferramenta, e a página inteira é montada como um site de prêmio, moderno e
 * colorido. Os freios fazem parte da lição: o interruptor de movimento, a
 * preferência do aparelho e o conteúdo que aparece mesmo sem animação.
 *
 * Este arquivo tem a abertura (as barras de cor da entrada, o título com
 * rastro, os losangos e a faixa de truques) e o console do canto (quanto da
 * página já foi rolado e o interruptor). Cada cena mora na pasta scenes/.
 */

// As barras de cor que varrem a tela na entrada.
const BARS = Array.from({ length: 12 }, (_, index) => index)

/*
 * Os losangos da abertura: o desenho do quadro-chave, a marca do tempo nas
 * ferramentas de animação. Posição em % da abertura, tamanho em rem, cor (da
 * lista COLORS), só contorno ou cheio, e profundidade (quanto se move com o
 * mouse e com a rolagem). Ficam do lado direito, longe do texto.
 */
const DIAMONDS = [
  { left: 72, top: 14, size: 4.5, color: 0, outline: false, depth: 1.2 },
  { left: 87, top: 30, size: 2.2, color: 1, outline: true, depth: 0.6 },
  { left: 63, top: 34, size: 1.2, color: 3, outline: false, depth: 1.6 },
  { left: 90, top: 54, size: 3.4, color: 2, outline: false, depth: 0.9 },
  { left: 77, top: 64, size: 1.7, color: 4, outline: true, depth: 1.3 },
  { left: 56, top: 9, size: 1, color: 5, outline: false, depth: 1.8 },
  { left: 95, top: 8, size: 1.5, color: 3, outline: true, depth: 0.8 },
  { left: 83, top: 44, size: 0.8, color: 0, outline: false, depth: 2 },
  { left: 66, top: 55, size: 2.6, color: 1, outline: false, depth: 0.7 },
]

// A faixa de truques: o que esta página mostra, dito pelo que se vê.
const TRICKS = [
  'Texto que entra letra por letra',
  'Rolagem que conduz a cena',
  'Cena que fica parada',
  'Letra que estica',
  'Arrastar com peso',
  'Ritmo com mola',
  'Contador que rola',
  'Cor que muda com a cena',
]
const TICKER = [...TRICKS, ...TRICKS]

/** Abertura: as barras de cor varrem a tela e o título entra letra por letra. */
function useOpening(motionOn, setBars) {
  useLayoutEffect(() => {
    if (!motionOn) {
      setBars(false)
      return undefined
    }

    const hero = document.querySelector(`.${styles.hero}`)
    const title = hero.querySelector('h1')
    const split = splitForMotion(title, {
      charClass: styles.char,
      wordClass: styles.word,
      visualClass: styles.titleVisual,
    })

    let mm = null
    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray(`.${styles.bar}`)
      const opening = gsap.timeline()

      // Cada barra recolhe para cima, uma depois da outra.
      if (bars.length) {
        opening.to(bars, {
          scaleY: 0,
          duration: 0.7,
          ease: 'power3.inOut',
          stagger: 0.06,
          onComplete: () => setBars(false),
        })
      }

      const start = bars.length ? 0.45 : 0.1
      opening.add(exposure(split.chars, { duration: 1.4, stagger: 0.035 }), start)
      opening.from(hero.querySelector('p:first-child'), { autoAlpha: 0, y: 12, duration: 0.8, ease: 'power2.out' }, start + 0.2)
      opening.from(hero.querySelector('h1 + p'), { autoAlpha: 0, y: 24, duration: 1.1, ease: 'expo.out' }, start + 0.9)
      opening.from(
        `.${styles.diamondShape}`,
        { scale: 0, duration: 0.9, stagger: { each: 0.06, from: 'random' }, ease: 'back.out(2.2)' },
        start + 0.3,
      )
      // A faixa sobe (e não desliza de lado, o que empurraria a página para
      // fora da janela enquanto entra).
      opening.from(`.${styles.ticker}`, { autoAlpha: 0, y: 30, duration: 1.1, ease: 'expo.out' }, start + 0.7)
      opening.from(`.${styles.cue}`, { autoAlpha: 0, duration: 0.8 }, start + 1.4)

      // Os losangos flutuam e giram devagar, cada um no seu ritmo.
      gsap.utils.toArray(`.${styles.diamondShape}`).forEach((shape) => {
        gsap.to(shape, {
          y: gsap.utils.random(-16, 16),
          duration: gsap.utils.random(2.8, 5.5),
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
        gsap.to(shape, {
          rotation: `+=${gsap.utils.random([-360, 360])}`,
          duration: gsap.utils.random(18, 38),
          repeat: -1,
          ease: 'none',
        })
      })

      // Com a rolagem, cada losango sobe na sua velocidade: os mais "perto"
      // passam mais rápido.
      gsap.utils.toArray(`.${styles.diamond}`).forEach((diamond) => {
        gsap.to(diamond, {
          y: -170 * Number(diamond.dataset.depth),
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      mm = gsap.matchMedia()
      mm.add('(pointer: fine)', () => {
        // A letra elástica: perto do mouse, cada letra se alarga; longe,
        // volta a ser comprimida.
        gsap.set(split.chars, { '--largura': 58 })
        const widths = split.chars.map((char) => gsap.quickTo(char, '--largura', { duration: 0.5, ease: 'power3.out' }))

        // Os losangos fogem do mouse, cada um conforme a profundidade.
        const layers = gsap.utils.toArray(`.${styles.diamondMouse}`).map((layer) => ({
          depth: Number(layer.parentElement.dataset.depth),
          toX: gsap.quickTo(layer, 'x', { duration: 0.9, ease: 'power3.out' }),
          toY: gsap.quickTo(layer, 'y', { duration: 0.9, ease: 'power3.out' }),
        }))

        const onMove = (event) => {
          // Longe da abertura, não há o que mexer.
          if (window.scrollY > window.innerHeight) return
          split.chars.forEach((char, i) => {
            const box = char.getBoundingClientRect()
            const distance = Math.abs(event.clientX - (box.left + box.width / 2))
            const nearY = Math.abs(event.clientY - (box.top + box.height / 2)) < box.height * 1.6
            widths[i](nearY ? 58 + 62 * Math.exp(-((distance / 140) ** 2)) : 58)
          })
          const nx = event.clientX / window.innerWidth - 0.5
          const ny = event.clientY / window.innerHeight - 0.5
          layers.forEach(({ depth, toX, toY }) => {
            toX(-nx * 60 * depth)
            toY(-ny * 60 * depth)
          })
        }
        const onLeave = () => widths.forEach((set) => set(58))
        window.addEventListener('pointermove', onMove)
        hero.addEventListener('pointerleave', onLeave)
        return () => {
          window.removeEventListener('pointermove', onMove)
          hero.removeEventListener('pointerleave', onLeave)
        }
      })
    })

    return () => {
      ctx.revert()
      mm?.revert()
      split.restore()
    }
  }, [motionOn, setBars])
}

/**
 * A faixa de truques: corre sozinha, devagar, e acelera e muda de sentido
 * conforme a velocidade e o sentido da rolagem. Para quando sai da tela.
 */
function useTicker(motionOn) {
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const track = document.querySelector(`.${styles.tickerTrack}`)
    const state = { x: 0, direction: 1, boost: 1, visible: true }
    const setX = gsap.quickSetter(track, 'x', 'px')

    const tick = (_time, deltaTime) => {
      if (!state.visible) return
      const half = track.scrollWidth / 2
      state.x -= 55 * state.direction * state.boost * (deltaTime / 1000)
      setX(gsap.utils.wrap(-half, 0, state.x))
    }
    gsap.ticker.add(tick)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate(self) {
          const velocity = self.getVelocity()
          if (Math.abs(velocity) < 5) return
          state.direction = velocity > 0 ? 1 : -1
          gsap.to(state, { boost: 1 + Math.min(Math.abs(velocity) / 140, 14), duration: 0.15, overwrite: true })
          gsap.to(state, { boost: 1, duration: 1.4, delay: 0.15, ease: 'power2.out' })
        },
      })
      ScrollTrigger.create({
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          state.visible = self.isActive
        },
      })
    })

    return () => {
      gsap.ticker.remove(tick)
      ctx.revert()
      gsap.set(track, { clearProps: 'transform' })
    }
  }, [motionOn])
}

/**
 * A cor da cena em vista vai para o atributo data-tint do elemento raiz: o
 * marcador do menu e o contador do canto trocam de cor com a cena.
 */
function useSceneTint() {
  useEffect(() => {
    const root = document.documentElement
    const scenes = gsap.utils.toArray('[data-tint]')

    // Vale a cena que cruza a linha de 55% da janela. Uma cena fixada ocupa,
    // na rolagem, o espaço inteiro da fixação (o "pin-spacer" em volta dela),
    // então é ele que se mede quando existe.
    const pick = () => {
      const line = window.innerHeight * 0.55
      let tint = null
      scenes.forEach((scene) => {
        const box = scene.parentElement.classList.contains('pin-spacer') ? scene.parentElement : scene
        const { top, bottom } = box.getBoundingClientRect()
        if (top <= line && bottom >= line) tint = scene.dataset.tint
      })
      if (tint) root.dataset.tint = tint
      else delete root.dataset.tint
    }

    const watcher = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: pick, onRefresh: pick })
    pick()
    return () => {
      watcher.kill()
      delete root.dataset.tint
    }
  }, [])
}

/** Quanto da página já foi rolado, em porcentagem, e a barra fina do console. */
function useProgress(valueRef, barRef) {
  useEffect(() => {
    let pending = 0
    const update = () => {
      pending = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      valueRef.current.textContent = `${Math.round(progress * 100)}%`
      barRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!pending) pending = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(pending)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [valueRef, barRef])
}

export default function Gsap() {
  const { motionOn, deviceReduce, toggle } = useMotion()
  // As barras de cor só existem enquanto varrem a tela; quem chega com o
  // movimento reduzido nem as vê.
  const [bars, setBars] = useState(motionOn)
  const progressValueRef = useRef(null)
  const progressBarRef = useRef(null)

  useOpening(motionOn, setBars)
  useTicker(motionOn)
  useSceneTint()
  useProgress(progressValueRef, progressBarRef)

  // As medidas das cenas fixadas dependem da altura dos títulos, que muda
  // quando as fontes terminam de carregar.
  useEffect(() => {
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      {/* O fundo da abertura: os losangos, a dica e a faixa de truques. */}
      <div className={styles.backdrop} aria-hidden="true">
        {DIAMONDS.map((diamond, i) => (
          <span
            key={i}
            className={styles.diamond}
            data-depth={diamond.depth}
            style={{
              left: `${diamond.left}%`,
              top: `${diamond.top}%`,
              '--tamanho': `${diamond.size}rem`,
              '--cor': COLORS[diamond.color],
            }}
          >
            <span className={styles.diamondMouse}>
              <span className={styles.diamondShape} data-outline={diamond.outline || undefined} />
            </span>
          </span>
        ))}
        <p className={styles.cue}>Role a página: cada cena mostra um truque.</p>
      </div>

      {bars && (
        <div className={styles.bars} aria-hidden="true">
          {BARS.map((index) => (
            <span key={index} className={styles.bar} style={{ background: COLORS[index % COLORS.length] }} />
          ))}
        </div>
      )}

      <ConceptPage
        className={styles.page}
        headerClassName={styles.hero}
        lede="O movimento dos sites que ganham prêmios tem uma ferramenta por trás. Esta página foi feita com ela: role, e cada cena mostra uma coisa que ela sabe fazer."
      >
        {/* A faixa de truques, logo abaixo da abertura. Decorativa: o que ela
            diz está nas cenas. */}
        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerTrack}>
            {TICKER.map((trick, i) => (
              <span key={`${trick}-${i}`} className={styles.chip} style={{ '--cor': COLORS[i % COLORS.length] }}>
                <span className={styles.chipKey} />
                {trick}
              </span>
            ))}
          </div>
        </div>

        <Muybridge motionOn={motionOn} />
        <Timeline motionOn={motionOn} />
        <Myths motionOn={motionOn} />
        <History motionOn={motionOn} />
        <Repertoire motionOn={motionOn} />
        <Awards motionOn={motionOn} />
        <Voice motionOn={motionOn} />
        <Fit motionOn={motionOn} />
        <Cost motionOn={motionOn} />
        <Measure motionOn={motionOn} deviceReduce={deviceReduce} toggle={toggle} />
        <Credits motionOn={motionOn} />
      </ConceptPage>

      {/* Console do canto: quanto da página já foi rolado e o interruptor. */}
      <div className={styles.console}>
        <p className={styles.progressText} aria-hidden="true">
          <span className={styles.progressLabel}>rolagem</span>
          <span ref={progressValueRef} className={styles.progressValue}>
            0%
          </span>
        </p>
        <button type="button" role="switch" aria-checked={motionOn} className={styles.motionSwitch} onClick={toggle}>
          <span className={styles.switchLabel}>Movimento</span>
          <span className={styles.switchState}>
            {motionOn ? 'completo' : deviceReduce ? 'reduzido pelo aparelho' : 'reduzido'}
          </span>
        </button>
        <span ref={progressBarRef} className={styles.progressBar} aria-hidden="true" />
      </div>
    </>
  )
}
