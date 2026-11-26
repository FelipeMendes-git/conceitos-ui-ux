import { useEffect, useRef } from 'react'
import ConceptPage from '../../../shared/ConceptPage.jsx'
import Eighties from './chapters/Eighties.jsx'
import Nineties from './chapters/Nineties.jsx'
import Seventies from './chapters/Seventies.jsx'
import Today from './chapters/Today.jsx'
import Y2k from './chapters/Y2k.jsx'
import './theme.css'
import styles from './styles.module.css'

/*
 * RETRÔ E Y2K (SPEC-114)
 *
 * A página é uma viagem no tempo feita pela rolagem. Começa em "hoje" e passa
 * por quatro capítulos na ordem em que aconteceram: anos 70, anos 80, anos 90
 * e Y2K. Cada capítulo é desenhado inteiro na sua época, e o menu e o fundo
 * da janela trocam de época junto.
 *
 * Este arquivo tem a abertura, o índice e a troca de época. Cada capítulo
 * mora em um arquivo próprio, na pasta chapters/, com o seu próprio desenho.
 * O fechamento ("de volta a hoje") também, e a demonstração interativa dele
 * fica na pasta demos/.
 */

// O índice da abertura: cada faixa é vestida da sua época (ver styles.module.css).
const ERAS = [
  { id: '70', anchor: 'anos-70', name: 'Anos 70', years: '1970 a 1979', line: 'Quente, macio e feito à mão.' },
  { id: '80', anchor: 'anos-80', name: 'Anos 80', years: '1980 a 1989', line: 'Elétrico, noturno e exagerado.' },
  { id: '90', anchor: 'anos-90', name: 'Anos 90', years: '1990 a 1999', line: 'Caseiro, quadrado e cheio de avisos.' },
  { id: 'y2k', anchor: 'y2k', name: 'Y2K', years: '1997 a 2004', line: 'Brilhante, arredondado e otimista.' },
]

/*
 * Descobre qual capítulo está no meio da janela e escreve o nome da época no
 * elemento raiz. É esse nome que o theme.css usa para vestir o menu e o fundo.
 * Fora dos capítulos (na abertura), o nome é retirado e vale a pele "hoje".
 */
function useEraOnScroll(containerRef) {
  useEffect(() => {
    const root = document.documentElement
    const chapters = containerRef.current.querySelectorAll('[data-chapter]')
    const inView = new Set()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inView.add(entry.target)
          else inView.delete(entry.target)
        })
        const current = [...inView][0]
        if (current) root.dataset.era = current.dataset.chapter
        else delete root.dataset.era
      },
      // A "linha de chegada" é uma faixa fina no meio da janela.
      { rootMargin: '-50% 0px -50% 0px' },
    )

    chapters.forEach((chapter) => observer.observe(chapter))
    return () => {
      observer.disconnect()
      delete root.dataset.era
    }
  }, [containerRef])
}

export default function RetroEY2k() {
  const chaptersRef = useRef(null)
  useEraOnScroll(chaptersRef)

  return (
    <>
      {/* Fundo de janela inteira: aparece em volta do menu e muda com a época. */}
      <div className={styles.backdrop} aria-hidden="true" />

      <ConceptPage
        lede="O passado usado de propósito."
        className={styles.page}
        headerClassName={styles.hero}
      >
        <div className={styles.intro}>
          <p>
            Retrô é um visual novo que imita, de propósito, o de uma época
            passada. Esta página percorre quatro delas na ordem em que
            aconteceram. Role para baixo e ela muda de década: as cores, as
            letras, as formas e até o menu.
          </p>
          <p>
            Uma coisa não muda: o texto continua fácil de ler e nada pisca. A
            pele é de época, a leitura é de hoje.
          </p>
        </div>

        <nav className={styles.index} aria-label="As quatro épocas">
          {ERAS.map((era) => (
            <a key={era.id} href={`#${era.anchor}`} className={styles.spine} data-era={era.id}>
              <span className={styles.spineName}>{era.name}</span>
              <span className={styles.spineInfo}>
                <span className={styles.spineYears}>{era.years}</span>
                <span className={styles.spineLine}>{era.line}</span>
              </span>
            </a>
          ))}
        </nav>

        <div ref={chaptersRef}>
          <Seventies />
          <Eighties />
          <Nineties />
          <Y2k />
        </div>

        {/* Fora dos capítulos, a pele volta a ser a de hoje. */}
        <Today />
      </ConceptPage>
    </>
  )
}
