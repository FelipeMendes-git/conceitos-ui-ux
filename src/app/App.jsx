import { Suspense } from 'react'
import { findConcept } from './catalog.js'
import { pages } from './pages.js'
import { usePath } from './router.jsx'
import Shell from './Shell.jsx'
import Home from './Home/Home.jsx'
import Placeholder from './Placeholder.jsx'

/*
 * Decide o que mostrar para o endereço atual. Há quatro casos:
 *   1. "/"                          → página inicial
 *   2. tela do catálogo, construída → a tela
 *   3. tela do catálogo, sem pasta  → aviso de "em breve"
 *   4. qualquer outro endereço      → "não encontrada"
 *
 * "skin" é o nome que vai para o atributo data-concept. É por ele que o
 * theme.css de cada tela veste a página e o menu.
 */
export default function App() {
  const path = usePath()
  const concept = findConcept(path)
  const Page = concept ? pages[concept.key] : null

  let skin = 'inicio'
  let title = null
  let content

  if (path === '/') {
    content = <Home />
  } else if (Page) {
    skin = concept.slug
    title = concept.title
    content = <Page />
  } else if (concept) {
    title = concept.title
    content = <Placeholder concept={concept} />
  } else {
    title = 'Página não encontrada'
    content = <Placeholder />
  }

  return (
    <Shell skin={skin} path={path} title={title}>
      {/* Enquanto o código de uma tela está sendo baixado, a área fica vazia
          por um instante; o menu continua no lugar. */}
      <Suspense fallback={null}>{content}</Suspense>
    </Shell>
  )
}
