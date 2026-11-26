import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Menu from './Menu/Menu.jsx'
import { Link } from './router.jsx'
import styles from './Shell.module.css'

/*
 * A casca: menu de um lado, conteúdo do outro. É igual em todas as telas;
 * o que muda é só a pele, definida pelas variáveis de cada theme.css.
 */
export default function Shell({ skin, path, title, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const mainRef = useRef(null)
  const previousPath = useRef(path)

  // Escreve o nome da tela no elemento raiz. Os theme.css usam esse nome como
  // seletor: [data-concept="glassmorphism"] { ... }. useLayoutEffect roda antes
  // de o navegador pintar, então a pele antiga não aparece nem por um instante.
  useLayoutEffect(() => {
    document.documentElement.dataset.concept = skin
  }, [skin])

  useEffect(() => {
    document.title = title ? `${title} · Conceitos UI/UX` : 'Conceitos UI/UX'
  }, [title])

  // Ao trocar de tela: volta ao topo e leva o foco para o conteúdo, para quem
  // usa teclado ou leitor de tela não ficar "preso" no menu.
  useEffect(() => {
    if (previousPath.current === path) return
    previousPath.current = path
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [path])

  // No celular o menu é uma gaveta; Esc fecha.
  useEffect(() => {
    if (!drawerOpen) return
    function onKeyDown(event) {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#conteudo">
        Pular para o conteúdo
      </a>

      {/* Barra do topo: só existe em telas estreitas. */}
      <header className={styles.topbar}>
        <Link to="/" className={styles.topbarBrand}>
          Conceitos <span>UI/UX</span>
        </Link>
        <button
          type="button"
          className={styles.topbarButton}
          aria-expanded={drawerOpen}
          aria-controls="menu"
          onClick={() => setDrawerOpen((open) => !open)}
        >
          {drawerOpen ? 'Fechar' : 'Menu'}
        </button>
      </header>

      {/* Fundo escurecido atrás da gaveta; tocar nele fecha o menu. */}
      <button
        type="button"
        className={styles.scrim}
        data-open={drawerOpen}
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
      />

      <div className={styles.menuSlot} data-open={drawerOpen}>
        <Menu currentPath={path} onNavigate={() => setDrawerOpen(false)} />
      </div>

      <main id="conteudo" ref={mainRef} tabIndex={-1} className={styles.main}>
        {children}
      </main>
    </div>
  )
}
