import { useLayoutEffect, useRef } from 'react'
import styles from './styles.module.css'

/*
 * Os campos da abertura.
 *
 * O título e a frase ficam no cabeçalho da moldura comum, que é o campo da
 * cor dominante. Aqui ficam os campos da secundária e do destaque e os três
 * números. As posições saem de duas variáveis, --f30 e --f10 (a fração da
 * janela que cada campo ocupa); o styles.module.css as transforma em medidas.
 *
 * Na entrada, a janela começa toda na cor dominante: a secundária entra e
 * toma 30%, e o destaque entra por último e toma 10%. É a ordem em que se
 * monta uma paleta (primeiro o fundo, depois a estrutura, por fim o destaque)
 * e a única animação da página que acontece sem o leitor pedir.
 *
 * O campo do destaque guarda a única ação da primeira janela: trocar as
 * cores da página inteira.
 */

const FINAL_30 = 0.3
const FINAL_10 = 0.1

// Começa rápido e pousa devagar, como algo que se acomoda.
function settle(t, delay, duration) {
  const x = Math.min(1, Math.max(0, (t - delay) / duration))
  return 1 - (1 - x) ** 4
}

export default function Opening({ palette, onNext }) {
  const fieldsRef = useRef(null)
  const n60Ref = useRef(null)
  const n30Ref = useRef(null)
  const n10Ref = useRef(null)
  const [c60, c30, c10] = palette.colors

  // Os campos têm a altura do cabeçalho, que muda com a largura da janela.
  // A medida fica na página, porque os botões de combinação também a usam.
  useLayoutEffect(() => {
    const article = fieldsRef.current.parentElement
    const header = article.querySelector(':scope > header')
    if (!header) return undefined

    const update = () => article.style.setProperty('--hero-h', `${header.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  // A acomodação. Roda antes da primeira pintura, para a proporção final
  // não aparecer por um instante antes de a animação começar.
  useLayoutEffect(() => {
    // Sem animação para quem pediu menos movimento, e também quando a página
    // abre numa aba escondida: ninguém veria, e a aba pausa a animação.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (document.visibilityState !== 'visible') return undefined

    const fields = fieldsRef.current
    const show = (f30, f10) => {
      const p30 = Math.round(f30 * 100)
      const p10 = Math.round(f10 * 100)
      fields.style.setProperty('--f30', f30)
      fields.style.setProperty('--f10', f10)
      n60Ref.current.textContent = 100 - p30 - p10
      n30Ref.current.textContent = p30
      n10Ref.current.textContent = p10
    }

    let frame = 0
    const start = performance.now()
    const tick = (now) => {
      const t = now - start
      show(FINAL_30 * settle(t, 250, 900), FINAL_10 * settle(t, 950, 700))
      if (t < 1700) frame = requestAnimationFrame(tick)
    }

    show(0, 0)
    frame = requestAnimationFrame(tick)
    // Garantia: se a animação for interrompida (aba escondida no meio do
    // caminho, por exemplo), a proporção final aparece mesmo assim.
    const safety = setTimeout(() => {
      cancelAnimationFrame(frame)
      show(FINAL_30, FINAL_10)
    }, 2500)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(safety)
      show(FINAL_30, FINAL_10)
    }
  }, [])

  return (
    <div ref={fieldsRef} className={styles.fields}>
      {/* Os números são desenho, no tom do próprio campo; a frase do campo
          da secundária diz a mesma coisa em texto. */}
      <span ref={n60Ref} className={`${styles.number} ${styles.n60}`} aria-hidden="true">
        60
      </span>

      <div className={styles.field30}>
        <p className={styles.fieldNote}>
          Esta janela está na proporção: 60% de {c60}, 30% de {c30} e 10% de {c10}.
        </p>
        <span ref={n30Ref} className={`${styles.number} ${styles.n30}`} aria-hidden="true">
          30
        </span>
      </div>

      <div className={styles.field10}>
        <button type="button" className={styles.cta} onClick={onNext}>
          Trocar as cores
        </button>
        <span ref={n10Ref} className={`${styles.number} ${styles.n10}`} aria-hidden="true">
          10
        </span>
      </div>
    </div>
  )
}
