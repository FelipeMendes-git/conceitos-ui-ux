import { useLayoutEffect } from 'react'
import { exposeIn, gsap } from '../motion.js'
import common from './common.module.css'

/**
 * A entrada comum das cenas: o título (marcado com data-title) entra com
 * rastro, linha por linha, e os blocos marcados com data-intro sobem e
 * aparecem quando chegam na tela. Com o movimento reduzido, nada disso roda
 * e tudo já está no lugar.
 *
 * Os blocos que ainda não entraram ficam transparentes, mas não escondidos de
 * vez: um botão dentro deles continua na ordem do teclado e o texto continua
 * audível para o leitor de tela. E quem chega a um bloco pelo teclado não
 * espera a rolagem: ele aparece na hora em que recebe o foco.
 *
 * kind: 'cor' (rastro colorido, sobre fundo escuro) ou 'escuro' (rastro em
 * veludo, sobre um campo de cor viva).
 */
export function useSceneIntro(ref, motionOn, kind = 'cor') {
  useLayoutEffect(() => {
    if (!motionOn) return undefined
    const section = ref.current
    const splits = []
    const entrances = []
    const ctx = gsap.context(() => {
      section.querySelectorAll('[data-title]').forEach((title) => {
        splits.push(
          exposeIn(title, {
            lineClass: common.titleLine,
            kind: title.dataset.title || kind,
            scrollTrigger: { trigger: title, start: 'top 86%', once: true },
          }),
        )
      })
      section.querySelectorAll('[data-intro]').forEach((block) => {
        entrances.push(
          gsap.from(block, {
            opacity: 0,
            y: 28,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: block, start: 'top 90%', once: true },
          }),
        )
      })
    }, section)

    const showFocused = (event) => {
      entrances.forEach((entrance) => {
        if (entrance.progress() < 1 && entrance.targets()[0].contains(event.target)) entrance.progress(1)
      })
    }
    section.addEventListener('focusin', showFocused)

    return () => {
      section.removeEventListener('focusin', showFocused)
      ctx.revert()
      splits.forEach((split) => split.revert())
    }
  }, [ref, motionOn, kind])
}
