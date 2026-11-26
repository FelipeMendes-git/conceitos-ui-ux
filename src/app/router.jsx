/*
 * Roteador do guia, feito à mão em vez de usar uma biblioteca.
 *
 * A navegação aqui é simples: uma página inicial e um endereço por tela.
 * O navegador já oferece o necessário (History API); este arquivo só liga
 * isso ao React.
 */
import { useSyncExternalStore } from 'react'

// O React precisa saber quando o endereço muda. O navegador avisa pelo evento
// "popstate" (botões voltar/avançar), e navigate() dispara o mesmo evento.
function subscribe(callback) {
  window.addEventListener('popstate', callback)
  return () => window.removeEventListener('popstate', callback)
}

// "/estilos/glassmorphism/" e "/estilos/glassmorphism" são a mesma tela.
function getPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

/** Endereço atual. O componente que usa este hook redesenha quando ele muda. */
export function usePath() {
  return useSyncExternalStore(subscribe, getPath)
}

/** Vai para outro endereço sem recarregar a página. */
export function navigate(to) {
  if (to === getPath()) return
  window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/**
 * Link interno. É um <a> de verdade (funciona com teclado, leitor de tela e
 * "abrir em nova aba"); só o clique simples é interceptado.
 */
export function Link({ to, onClick, ...rest }) {
  function handleClick(event) {
    onClick?.(event)
    const isPlainClick =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    if (event.defaultPrevented || !isPlainClick) return
    event.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...rest} />
}
