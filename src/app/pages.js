/*
 * Descobre sozinho quais telas já foram construídas.
 *
 * import.meta.glob é um recurso do Vite: ele procura os arquivos que batem com
 * o padrão e devolve, para cada um, uma função que carrega o arquivo só quando
 * alguém pede. Assim, criar a pasta de uma tela já basta para ela entrar no
 * guia, e o visitante só baixa o código da tela que abrir.
 */
import { lazy } from 'react'

const loaders = import.meta.glob('../concepts/*/*/index.jsx')

/** Componentes das telas prontas, indexados por "categoria/slug". */
export const pages = {}

for (const [file, load] of Object.entries(loaders)) {
  const [, category, slug] = file.match(/concepts\/([^/]+)\/([^/]+)\/index\.jsx$/)
  pages[`${category}/${slug}`] = lazy(load)
}

/** A tela "categoria/slug" já foi construída? */
export function isReady(key) {
  return key in pages
}
