/*
 * Os seis tipos de site pelos quais todo conceito é avaliado na seção
 * "Onde aplicar". A lista é fixa de propósito: como todas as telas usam os
 * mesmos seis, o leitor consegue comparar um conceito com outro.
 */
export const SITE_TYPES = [
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'landing', label: 'Landing page' },
  { id: 'dashboard', label: 'Dashboard / SaaS' },
  { id: 'app', label: 'App de celular' },
  { id: 'blog', label: 'Blog / editorial' },
  { id: 'portfolio', label: 'Portfólio' },
]

/** Os três vereditos possíveis e o texto que aparece para cada um. */
export const VERDICTS = {
  ok: 'Funciona bem',
  warn: 'Com ressalvas',
  avoid: 'Evite',
}
