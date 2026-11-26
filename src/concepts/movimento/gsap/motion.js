/*
 * O GSAP desta tela: registro dos recursos usados, a chave de movimento e a
 * assinatura visual da página (a exposição múltipla).
 *
 * O GSAP só é baixado por quem abre esta tela, porque cada tela do guia é
 * carregada à parte (ver src/app/pages.js).
 */
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Rolagem, texto partido, arrastar com inércia e forma que vira outra.
gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, MorphSVGPlugin)

// A barra de endereço do celular encolhe e cresce durante a rolagem. Sem isto,
// cada mudança recalcularia as cenas fixadas e a tela daria saltos.
ScrollTrigger.config({ ignoreMobileResize: true })

// Só em desenvolvimento: permite inspecionar as cenas pelo console do navegador.
if (import.meta.env.DEV) Object.assign(window, { gsap, ScrollTrigger })

export { Draggable, gsap, ScrollTrigger, SplitText }

/** As seis cores vivas da página, na ordem em que se repetem. */
export const COLORS = ['var(--rosa)', 'var(--azul)', 'var(--ambar)', 'var(--verde)', 'var(--lavanda)', 'var(--vermelho)']

/** Larguras em que as cenas fixadas existem. Abaixo disso, a cena rola normalmente. */
export const WIDE = '(min-width: 768px)'
export const NARROW = '(max-width: 767.98px)'

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'
const STORAGE_KEY = 'conceitos-gsap-movimento'

function readChoice() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'reduzido' ? 'reduzido' : 'completo'
  } catch {
    return 'completo'
  }
}

function saveChoice(choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Sem armazenamento (janela anônima, por exemplo): a escolha vale só nesta visita.
  }
}

/**
 * Movimento ligado ou desligado.
 *
 * Desliga sozinho quando o aparelho pede menos movimento. O interruptor da
 * tela faz o mesmo para quem não conhece essa opção do aparelho. O estado vai
 * para o atributo data-motion do elemento raiz, que o CSS também lê.
 */
export function useMotion() {
  const [deviceReduce, setDeviceReduce] = useState(() => window.matchMedia(REDUCE_QUERY).matches)
  const [choice, setChoice] = useState(readChoice)

  useEffect(() => {
    const media = window.matchMedia(REDUCE_QUERY)
    const onChange = () => setDeviceReduce(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const motionOn = !deviceReduce && choice === 'completo'

  useEffect(() => {
    const root = document.documentElement
    root.dataset.motion = motionOn ? 'full' : 'reduced'
    return () => delete root.dataset.motion
  }, [motionOn])

  function toggle() {
    const next = choice === 'completo' ? 'reduzido' : 'completo'
    setChoice(next)
    saveChoice(next)
  }

  return { motionOn, choice, deviceReduce, toggle }
}

/*
 * O rastro: a assinatura dos títulos da página.
 *
 * O título entra deslizando e deixando para trás três cópias fantasmas
 * (sombras do próprio texto), que se recolhem quando a letra pousa, como uma
 * fotografia de longa exposição de algo em movimento. Dois tipos de rastro:
 *   cor    — rosa, azul e âmbar, sobre fundo escuro;
 *   escuro — o veludo em três intensidades, sobre um campo de cor viva.
 */
const TRAILS = {
  cor: ['255,111,168', '91,140,255', '255,176,46'],
  escuro: ['18,17,16', '18,17,16', '18,17,16'],
}
const TRAIL_ALPHA = { cor: [0.95, 0.75, 0.55], escuro: [0.42, 0.24, 0.1] }

function trail(kind, on) {
  const [a, b, c] = TRAILS[kind]
  const [x, y, z] = TRAIL_ALPHA[kind]
  return on
    ? `-0.14em 0 0 rgba(${a},${x}), -0.3em 0 0 rgba(${b},${y}), -0.48em 0 0 rgba(${c},${z})`
    : `0em 0 0 rgba(${a},0), 0em 0 0 rgba(${b},0), 0em 0 0 rgba(${c},0)`
}

/**
 * Anima elementos entrando em exposição múltipla.
 * Devolve a animação, para ser usada dentro de linhas do tempo.
 *
 * Mexe só na opacidade, sem esconder o elemento de vez: o texto que ainda
 * não entrou continua sendo lido pelo leitor de tela.
 */
export function exposure(targets, { kind = 'cor', ...vars } = {}) {
  return gsap.fromTo(
    targets,
    { x: '-0.55em', opacity: 0, textShadow: trail(kind, true) },
    {
      x: 0,
      opacity: 1,
      textShadow: trail(kind, false),
      duration: 1.5,
      ease: 'expo.out',
      ...vars,
      // Sem rastro no fim: a sombra zerada sai do estilo.
      onComplete() {
        gsap.set(targets, { clearProps: 'textShadow' })
      },
    },
  )
}

/**
 * Faz um título entrar em exposição múltipla, linha por linha.
 *
 * O texto é partido só em linhas (as palavras ficam inteiras), então o leitor
 * de tela continua lendo o título normalmente. Quando a fonte termina de
 * carregar ou a largura muda, as linhas são refeitas e a animação continua de
 * onde estava. Deve ser chamado dentro de um gsap.context(), que desfaz tudo.
 */
export function exposeIn(element, { lineClass, kind = 'cor', delay = 0, stagger = 0.13, duration = 1.5, scrollTrigger } = {}) {
  return SplitText.create(element, {
    type: 'lines',
    tag: 'span',
    linesClass: lineClass,
    aria: 'none',
    autoSplit: true,
    onSplit(self) {
      return exposure(self.lines, { kind, delay, stagger, duration, scrollTrigger })
    },
  })
}

/**
 * Parte um título em letras sem atrapalhar o leitor de tela.
 *
 * Letra por letra, vários leitores de tela soletram, leem pela metade ou se
 * calam (testes de Adrian Roselli, 2026). Por isso o título ganha duas cópias:
 * uma inteira, invisível, só para o leitor de tela; e uma partida em letras,
 * visível, escondida do leitor de tela. Devolve as letras e uma função que
 * devolve o título ao que era.
 */
export function splitForMotion(element, { charClass, wordClass, visualClass }) {
  const original = [...element.childNodes]
  const text = element.textContent

  const spoken = document.createElement('span')
  spoken.className = 'sr-only'
  spoken.textContent = text

  const visual = document.createElement('span')
  visual.className = visualClass
  visual.setAttribute('aria-hidden', 'true')
  visual.textContent = text

  element.replaceChildren(spoken, visual)
  // As letras são <span>: um título não pode conter blocos.
  const split = SplitText.create(visual, {
    type: 'words, chars',
    tag: 'span',
    wordsClass: wordClass,
    charsClass: charClass,
    aria: 'none',
  })

  return {
    chars: split.chars,
    restore() {
      split.revert()
      element.replaceChildren(...original)
    },
  }
}
