import { useEffect, useLayoutEffect, useState } from 'react'
import ConceptPage from '../../../shared/ConceptPage.jsx'
import Combinacao from './combinacao/Combinacao.jsx'
import MundoReal from './mundo/MundoReal.jsx'
import Opening from './Opening.jsx'
import Papeis from './papeis/Papeis.jsx'
import Dock from './parts/Dock.jsx'
import { paintPage, PALETTES, unpaintPage } from './parts/palettes.js'
import { NaPratica, ParaIrAlem } from './resumo/Resumo.jsx'
import './theme.css'
import styles from './styles.module.css'

/*
 * REGRA 60-30-10 (SPEC-303)
 *
 * A página explica a regra usando a própria regra: ela inteira é pintada com
 * três cores, uma por papel (60 no fundo e no menu, 30 nos textos e nas
 * faixas, 10 no que se clica e no campo menor de cada bloco). Não há exemplo
 * dentro da página: o exemplo é ela.
 *
 * O laboratório é trocar a combinação. Os botões escrevem as cores no
 * elemento raiz, e tudo muda junto, do menu ao rodapé.
 */
export default function Regra603010() {
  const [paletteId, setPaletteId] = useState(PALETTES[0].id)
  const palette = PALETTES.find((item) => item.id === paletteId)

  // Pinta a página antes de o navegador desenhar, para a cor antiga não
  // aparecer por um instante.
  useLayoutEffect(() => {
    paintPage(palette)
  }, [palette])

  // Ao sair da tela, as outras telas voltam às cores delas.
  useEffect(() => unpaintPage, [])

  function next() {
    const index = PALETTES.findIndex((item) => item.id === paletteId)
    setPaletteId(PALETTES[(index + 1) % PALETTES.length].id)
  }

  return (
    <ConceptPage
      lede="Uma cor manda, outra acompanha, a terceira chama a atenção. A proporção entre elas decide para onde o olho vai primeiro."
      className={styles.page}
      headerClassName={styles.hero}
    >
      <Opening palette={palette} onNext={next} />
      <Dock palette={palette} onPick={setPaletteId} />
      <Papeis />
      <Combinacao palette={palette} onPick={setPaletteId} />
      <NaPratica />
      <MundoReal />
      <ParaIrAlem />
    </ConceptPage>
  )
}
