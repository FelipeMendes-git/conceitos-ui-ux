import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { exposeIn, gsap, ScrollTrigger, SplitText } from '../motion.js'
import styles from './timeline.module.css'

/*
 * CENA: A LINHA DO TEMPO
 *
 * O GSAP explicado pelo que ele faz de mais importante: organizar o tempo.
 * Em cima, o cartaz de um festival fictício com cinco elementos; embaixo, a
 * linha do tempo dele, com uma faixa por elemento e a agulha. O leitor troca
 * a arrumação e o ritmo, e o mesmo cartaz entra de um jeito diferente. Os
 * elementos e os efeitos nunca mudam; só o tempo.
 */

// As barras do equalizador do cartaz, da altura mais baixa à mais alta.
const EQUALIZER = [0.35, 0.6, 0.85, 0.5, 0.95, 0.7, 0.4, 0.8, 0.55, 0.9, 0.45, 0.75, 0.3, 0.65]

// Cada elemento do cartaz tem uma cor, a mesma da sua faixa na linha do
// tempo: a cor é a legenda.
const TRACKS = [
  { id: 'rotulo', name: 'Rótulo', color: 'var(--ambar)' },
  { id: 'titulo', name: 'Título', color: 'var(--rosa)' },
  { id: 'imagem', name: 'Imagem', color: 'var(--azul)' },
  { id: 'data', name: 'Data', color: 'var(--verde)' },
  { id: 'botao', name: 'Botão', color: 'var(--vermelho)' },
]

// Cada elemento leva 0,9 s para entrar; a régua cobre o arranjo mais longo.
const DURATION = 0.9
const TOTAL = 4.5

const ARRANGEMENTS = [
  {
    id: 'juntos',
    name: 'Todos juntos',
    note: 'Os cinco entram ao mesmo tempo. Chega rápido, mas o olho não sabe por onde começar.',
    starts: [0, 0, 0, 0, 0],
  },
  {
    id: 'seguidos',
    name: 'Um depois do outro',
    note: 'Cada um espera o anterior terminar. A ordem fica clara, mas leva quatro segundos e meio e parece mecânico.',
    starts: [0, 0.9, 1.8, 2.7, 3.6],
  },
  {
    id: 'cascata',
    name: 'Em cascata',
    note: 'Cada um começa antes de o anterior terminar. Entra na ordem de leitura e acaba em um segundo e meio: é a arrumação dos sites premiados.',
    starts: [0, 0.15, 0.3, 0.45, 0.6],
  },
]

const RHYTHMS = [
  {
    id: 'constante',
    name: 'Constante',
    note: 'A mesma velocidade do começo ao fim. Nada no mundo se move assim; parece máquina.',
    ease: 'none',
    color: 'var(--lavanda)',
  },
  {
    id: 'suave',
    name: 'Suave',
    note: 'Sai rápido e pousa devagar, como um objeto de verdade que perde força ao chegar.',
    ease: 'expo.out',
    color: 'var(--verde)',
  },
  {
    id: 'mola',
    name: 'Com mola',
    note: 'Passa do ponto e volta, como uma mola. Dá energia e um tom brincalhão.',
    ease: 'back.out(2.4)',
    color: 'var(--rosa)',
  },
]

const byId = (list, id) => list.find((item) => item.id === id)

/** Quando a última entrada de uma arrumação termina. */
const endOf = (arrangement) => Math.max(...arrangement.starts) + DURATION

/** O desenho de uma curva de ritmo: o tempo na horizontal, o caminho na vertical. */
function curvePath(ease) {
  const fn = gsap.parseEase(ease)
  const points = []
  for (let i = 0; i <= 60; i += 1) {
    const t = i / 60
    points.push(`${(t * 100).toFixed(1)},${(40 - fn(t) * 31).toFixed(1)}`)
  }
  return `M${points.join(' L')}`
}

/** "1,25 s" */
function formatTime(seconds) {
  return `${seconds.toFixed(2).replace('.', ',')} s`
}

const RULER = Array.from({ length: 10 }, (_, i) => i * 0.5)

export default function Timeline({ motionOn }) {
  const [arrangementId, setArrangement] = useState('cascata')
  const [rhythmId, setRhythm] = useState('suave')
  const [playing, setPlaying] = useState(false)

  const sceneRef = useRef(null)
  const posterRef = useRef(null)
  const timelineRef = useRef(null)
  const splitRef = useRef(null)
  const playheadRef = useRef(null)
  const rangeRef = useRef(null)
  const readoutRef = useRef(null)
  const barsRef = useRef([])
  const artsRef = useRef({})
  const markersRef = useRef({})
  const revealsRef = useRef({})
  const firstBuild = useRef(true)

  const arrangement = byId(ARRANGEMENTS, arrangementId)
  const rhythm = byId(RHYTHMS, rhythmId)

  // A agulha, o controle deslizante e o mostrador seguem o tempo do cartaz.
  // Tocando, a agulha para quando a última entrada termina: o resto da régua
  // só existe para comparar as arrumações.
  function sync() {
    const timeline = timelineRef.current
    const time = timeline ? timeline.time() : 0
    playheadRef.current.style.left = `${(time / TOTAL) * 100}%`
    rangeRef.current.value = String(time)
    rangeRef.current.setAttribute('aria-valuetext', formatTime(time).replace(' s', ' segundo'))
    readoutRef.current.textContent = formatTime(time)
    // A faixa acende enquanto a agulha passa por ela: é o elemento que está
    // se movendo naquele instante.
    if (timeline) {
      barsRef.current.forEach((bar, i) => {
        const start = timeline.data.starts[i]
        bar.toggleAttribute('data-active', time > start && time < start + DURATION)
      })
    }
    if (timeline && !timeline.paused() && time >= timeline.data.end) {
      timeline.pause()
      setPlaying(false)
    }
  }

  // O título do cartaz é partido em letras uma vez só. O cartaz inteiro é
  // decorativo para leitores de tela (ver o rótulo do cartaz).
  useLayoutEffect(() => {
    const lines = posterRef.current.querySelectorAll(`.${styles.posterTitleLine}`)
    splitRef.current = SplitText.create(lines, { type: 'words,chars', mask: 'chars', aria: 'none' })
    return () => {
      splitRef.current.revert()
      splitRef.current = null
    }
  }, [])

  // Monta a linha do tempo do cartaz para a arrumação e o ritmo escolhidos.
  useLayoutEffect(() => {
    const poster = posterRef.current
    const q = gsap.utils.selector(poster)
    const { starts } = arrangement
    const { ease } = rhythm

    const timeline = gsap.timeline({
      paused: true,
      data: { end: endOf(arrangement), starts },
      onUpdate: sync,
      onComplete: () => setPlaying(false),
    })
    timeline
      .fromTo(q(`.${styles.posterLabel}`), { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: DURATION, ease }, starts[0])
      .fromTo(
        splitRef.current.chars,
        { yPercent: 112 },
        { yPercent: 0, duration: DURATION * 0.72, ease, stagger: { amount: DURATION * 0.28 } },
        starts[1],
      )
      .fromTo(
        q(`.${styles.posterImage}`),
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION, ease },
        starts[2],
      )
      .fromTo(
        q(`.${styles.eqBar}`),
        { scaleY: 0 },
        { scaleY: 1, duration: DURATION * 0.7, ease, stagger: { amount: DURATION * 0.3 } },
        starts[2],
      )
      .fromTo(q(`.${styles.posterDate}`), { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: DURATION, ease }, starts[3])
      .fromTo(
        q(`.${styles.posterButton}`),
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: DURATION * 0.6, ease },
        starts[4],
      )
      .fromTo(
        q(`.${styles.posterButtonLine}`),
        { scaleX: 0 },
        { scaleX: 1, duration: DURATION * 0.6, ease },
        starts[4] + DURATION * 0.4,
      )
      // A régua tem sempre 4,5 s, para as arrumações poderem ser comparadas.
      .set({}, {}, TOTAL)

    timelineRef.current = timeline

    // As faixas da linha do tempo vão para os novos lugares.
    const bars = barsRef.current
    const lefts = starts.map((start) => `${(start / TOTAL) * 100}%`)
    if (firstBuild.current || !motionOn) {
      gsap.set(bars, { left: (i) => lefts[i] })
    } else {
      gsap.to(bars, { left: (i) => lefts[i], duration: 0.7, ease: 'power3.inOut', stagger: 0.05 })
    }

    let replay = null
    if (!motionOn) {
      // Movimento reduzido: o cartaz já aparece pronto. A agulha continua
      // funcionando quando o leitor a arrasta.
      timeline.progress(1)
    } else if (!firstBuild.current) {
      // Trocou a arrumação ou o ritmo: o cartaz toca de novo, do começo,
      // depois que as faixas chegam aos novos lugares.
      replay = gsap.delayedCall(0.45, () => {
        timeline.play(0)
        setPlaying(true)
      })
    }
    sync()
    firstBuild.current = false

    return () => {
      replay?.kill()
      gsap.killTweensOf(bars)
      timeline.revert()
      timeline.kill()
    }
    // A linha do tempo só precisa ser refeita quando a escolha muda.
  }, [arrangementId, rhythmId, motionOn])

  // Entrada da cena: título em exposição múltipla, faixas que se desenham e o
  // cartaz tocando sozinho a primeira vez que aparece.
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const scene = sceneRef.current
    let split = null
    const ctx = gsap.context(() => {
      split = exposeIn(scene.querySelector(`.${styles.title}`), {
        lineClass: styles.titleLine,
        scrollTrigger: { trigger: scene, start: 'top 72%', once: true },
      })
      gsap.from(`.${styles.intro}`, {
        opacity: 0,
        y: 24,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: scene, start: 'top 68%', once: true },
      })

      const table = scene.querySelector(`.${styles.table}`)
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: table, start: 'top 82%', once: true },
      })
      entrance
        .from(`.${styles.tick}`, { opacity: 0, y: -6, duration: 0.4, stagger: 0.03, ease: 'power2.out' })
        .from(`.${styles.trackName}`, { opacity: 0, x: -12, duration: 0.5, stagger: 0.06, ease: 'power2.out' }, 0.1)
        .from(`.${styles.bar}`, { scaleX: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, 0.2)
        .from(`.${styles.key}`, { scale: 0, duration: 0.45, stagger: 0.04, ease: 'back.out(3)' }, 0.45)
        .from(playheadRef.current, { scaleY: 0, duration: 0.6, ease: 'expo.out' }, 0.5)

      gsap.timeline({
        scrollTrigger: {
          trigger: posterRef.current,
          start: 'top 62%',
          once: true,
          onEnter: () => {
            timelineRef.current?.play(0)
            setPlaying(true)
          },
        },
      })
    }, scene)

    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [motionOn])

  // O equalizador pulsa enquanto o cartaz está na tela. Cada barra tem duas
  // camadas: a de fora entra com a linha do tempo, a de dentro pulsa, e uma
  // não atrapalha a outra.
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const poster = posterRef.current
    const ctx = gsap.context(() => {
      const pulse = gsap.to(`.${styles.eqLevel}`, {
        scaleY: () => gsap.utils.random(0.55, 1),
        duration: () => gsap.utils.random(0.28, 0.55),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        paused: true,
        stagger: { each: 0.04, from: 'random' },
      })
      ScrollTrigger.create({
        trigger: poster,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? pulse.play() : pulse.pause()),
      })
    }, poster)
    return () => ctx.revert()
  }, [motionOn])

  // O cartaz em camadas: com o mouse por cima, o texto e o equalizador se
  // deslocam em profundidades diferentes, em sentidos opostos. Só com mouse
  // de verdade.
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const poster = posterRef.current
    const mm = gsap.matchMedia()
    mm.add('(pointer: fine)', () => {
      const layers = [
        [poster.querySelector(`.${styles.posterText}`), -16],
        [poster.querySelector(`.${styles.posterImage}`), 26],
      ].map(([element, depth]) => ({
        element,
        depth,
        toX: gsap.quickTo(element, 'x', { duration: 0.7, ease: 'power3.out' }),
        toY: gsap.quickTo(element, 'y', { duration: 0.7, ease: 'power3.out' }),
      }))
      const onMove = (event) => {
        const box = poster.getBoundingClientRect()
        const nx = (event.clientX - box.left) / box.width - 0.5
        const ny = (event.clientY - box.top) / box.height - 0.5
        layers.forEach(({ depth, toX, toY }) => {
          toX(nx * depth)
          toY(ny * depth)
        })
      }
      const onLeave = () =>
        layers.forEach(({ toX, toY }) => {
          toX(0)
          toY(0)
        })
      poster.addEventListener('pointermove', onMove)
      poster.addEventListener('pointerleave', onLeave)
      return () => {
        poster.removeEventListener('pointermove', onMove)
        poster.removeEventListener('pointerleave', onLeave)
        gsap.set(
          layers.map(({ element }) => element),
          { clearProps: 'transform' },
        )
      }
    })
    return () => mm.revert()
  }, [motionOn])

  // Arrumação escolhida: as barrinhas do botão tocam a arrumação em miniatura.
  useEffect(() => {
    const art = artsRef.current[arrangementId]
    if (!art || !motionOn) return undefined
    const { starts } = byId(ARRANGEMENTS, arrangementId)
    const preview = gsap.timeline()
    art.querySelectorAll('rect').forEach((rect, i) => {
      preview.fromTo(
        rect,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.45, ease: 'power2.out', transformOrigin: '0% 50%' },
        starts[i] * 0.5,
      )
    })
    return () => preview.revert()
  }, [arrangementId, motionOn])

  // Ritmo escolhido: um losango percorre a curva e a desenha atrás de si. Ele
  // anda na horizontal sempre na mesma velocidade (o tempo) e sobe conforme o
  // ritmo (o caminho): é assim que se lê uma curva de ritmo.
  useEffect(() => {
    const option = byId(RHYTHMS, rhythmId)
    const fn = gsap.parseEase(option.ease)
    const marker = markersRef.current[rhythmId]
    const reveal = revealsRef.current[rhythmId]
    const place = (t) => {
      marker.setAttribute('transform', `translate(${(t * 100).toFixed(2)} ${(40 - fn(t) * 31).toFixed(2)})`)
      reveal.setAttribute('width', (t * 100 + 4).toFixed(2))
    }
    if (!motionOn) {
      place(1)
      return undefined
    }
    const proxy = { t: 0 }
    place(0)
    const tween = gsap.to(proxy, { t: 1, duration: 1.3, ease: 'none', onUpdate: () => place(proxy.t) })
    return () => {
      tween.kill()
      place(1)
    }
  }, [rhythmId, motionOn])

  function handlePlay() {
    const timeline = timelineRef.current
    if (!timeline) return
    if (playing) {
      timeline.pause()
      setPlaying(false)
      return
    }
    if (!motionOn) {
      timeline.progress(1)
      sync()
      return
    }
    if (timeline.time() >= timeline.data.end) timeline.time(0)
    timeline.play()
    setPlaying(true)
  }

  function handleRewind() {
    timelineRef.current?.pause(0)
    setPlaying(false)
    sync()
  }

  function handleScrub(event) {
    const timeline = timelineRef.current
    if (!timeline) return
    timeline.pause()
    timeline.time(Number(event.target.value))
    setPlaying(false)
  }

  return (
    <section ref={sceneRef} className={styles.scene} data-tint="azul" aria-labelledby="cena-linha-do-tempo">
      <div className={styles.head}>
        <h2 id="cena-linha-do-tempo" className={styles.title}>
          A linha do tempo
        </h2>
        <p className={styles.intro}>
          O coração do GSAP é a linha do tempo. Ela decide quando cada elemento da página se move,
          por quanto tempo e em que ritmo, como a partitura de uma música. Neste cartaz, os
          elementos e os efeitos são sempre os mesmos. Troque a arrumação e o ritmo e veja o
          caráter dele mudar.
        </p>
      </div>

      <div className={styles.desk}>
        <div className={styles.deskInner}>
          {/* O cartaz fictício. */}
          <div
            ref={posterRef}
            className={styles.poster}
            role="img"
            aria-label="Cartaz do festival fictício Volume, com rótulo, título, um equalizador, data e botão. Cada um entra no seu tempo."
          >
            <div className={styles.posterText} aria-hidden="true">
              <p className={styles.posterLabel}>Festival de música e tecnologia</p>
              <p className={styles.posterTitle}>
                <span className={styles.posterTitleLine}>Volume</span>
              </p>
              <p className={styles.posterDate}>12 a 15 de março, no Parque da Cidade</p>
              <span className={styles.posterButton}>
                Comprar ingresso
                <span className={styles.posterButtonLine} />
              </span>
            </div>
            <div className={styles.posterImage} aria-hidden="true">
              <div className={styles.equalizer}>
                {EQUALIZER.map((height, i) => (
                  <span key={i} className={styles.eqBar} style={{ '--altura': height }}>
                    <span className={styles.eqLevel} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* A linha do tempo do cartaz. */}
          <div className={styles.table}>
            <div className={styles.transport}>
              <button type="button" className={styles.transportButton} onClick={handlePlay}>
                {playing ? 'Pausar' : 'Tocar'}
              </button>
              <button type="button" className={styles.transportButton} onClick={handleRewind}>
                Do começo
              </button>
              <p className={styles.readout} aria-hidden="true">
                <span ref={readoutRef}>0,00 s</span>
                <span className={styles.readoutTotal}> de {formatTime(TOTAL)}</span>
              </p>
            </div>

            <div className={styles.grid}>
              <span className={styles.corner} aria-hidden="true">
                Tempo
              </span>
              <div className={styles.ruler}>
                {RULER.map((second) => (
                  <span
                    key={second}
                    className={styles.tick}
                    style={{ left: `${(second / TOTAL) * 100}%` }}
                    aria-hidden="true"
                  >
                    {Number.isInteger(second) ? `${second} s` : ''}
                  </span>
                ))}
                <input
                  ref={rangeRef}
                  type="range"
                  className={styles.range}
                  min="0"
                  max={TOTAL}
                  step="0.01"
                  defaultValue="0"
                  aria-label="Agulha: o instante do cartaz"
                  onInput={handleScrub}
                />
              </div>

              {TRACKS.map((track, i) => (
                <div key={track.id} className={styles.track} style={{ '--cor': track.color }}>
                  <span className={styles.trackName}>
                    <span className={styles.swatch} aria-hidden="true" />
                    {track.name}
                  </span>
                  <div className={styles.lane} aria-hidden="true">
                    <span
                      ref={(element) => {
                        barsRef.current[i] = element
                      }}
                      className={styles.bar}
                    >
                      <span className={`${styles.key} ${styles.keyStart}`} />
                      <span className={`${styles.key} ${styles.keyEnd}`} />
                    </span>
                  </div>
                </div>
              ))}

              <div className={styles.playheadTrack} aria-hidden="true">
                <span ref={playheadRef} className={styles.playhead} />
              </div>
            </div>
          </div>

          {/* As escolhas: arrumação e ritmo. */}
          <div className={styles.choices}>
            <fieldset className={styles.group}>
              <legend className={styles.legend}>Arrumação</legend>
              <div className={styles.options}>
                {ARRANGEMENTS.map((option) => (
                  <label key={option.id} className={styles.option}>
                    <input
                      type="radio"
                      name="arrumacao"
                      value={option.id}
                      checked={arrangementId === option.id}
                      onChange={() => setArrangement(option.id)}
                      className={styles.radio}
                    />
                    <svg
                      ref={(element) => {
                        artsRef.current[option.id] = element
                      }}
                      className={styles.optionArt}
                      viewBox="0 0 100 44"
                      aria-hidden="true"
                    >
                      {option.starts.map((start, i) => (
                        <rect
                          key={TRACKS[i].id}
                          x={(start / TOTAL) * 100}
                          y={i * 9 + 1}
                          width={(DURATION / TOTAL) * 100}
                          height="5"
                          style={{ fill: TRACKS[i].color }}
                        />
                      ))}
                    </svg>
                    <span className={styles.optionName}>{option.name}</span>
                  </label>
                ))}
              </div>
              <p className={styles.note} aria-live="polite">
                {arrangement.note}
              </p>
            </fieldset>

            <fieldset className={styles.group}>
              <legend className={styles.legend}>Ritmo</legend>
              <div className={styles.options}>
                {RHYTHMS.map((option) => (
                  <label key={option.id} className={styles.option} style={{ '--cor': option.color }}>
                    <input
                      type="radio"
                      name="ritmo"
                      value={option.id}
                      checked={rhythmId === option.id}
                      onChange={() => setRhythm(option.id)}
                      className={styles.radio}
                    />
                    <svg className={styles.optionArt} viewBox="0 0 100 44" aria-hidden="true">
                      <defs>
                        <clipPath id={`ritmo-${option.id}`}>
                          <rect
                            ref={(element) => {
                              revealsRef.current[option.id] = element
                            }}
                            x="-2"
                            y="-12"
                            width="104"
                            height="68"
                          />
                        </clipPath>
                      </defs>
                      <path className={styles.curveBase} d={curvePath(option.ease)} />
                      <path
                        className={styles.curve}
                        d={curvePath(option.ease)}
                        clipPath={`url(#ritmo-${option.id})`}
                      />
                      <path
                        ref={(element) => {
                          markersRef.current[option.id] = element
                        }}
                        className={styles.marker}
                        d="M0,-3.4 L3.4,0 L0,3.4 L-3.4,0 Z"
                        transform="translate(100 9)"
                      />
                    </svg>
                    <span className={styles.optionName}>{option.name}</span>
                  </label>
                ))}
              </div>
              <p className={styles.note} aria-live="polite">
                {rhythm.note}
              </p>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  )
}
