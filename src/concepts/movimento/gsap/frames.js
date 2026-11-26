/*
 * Os doze quadros do cartão de Muybridge (1878), recortados e tingidos para
 * esta tela a partir da foto da Biblioteca do Congresso dos EUA, em domínio
 * público. Usados pela cena do cavalo.
 */
const files = import.meta.glob('./images/quadro-*.jpg', { eager: true, import: 'default' })

export const FRAMES = Object.keys(files)
  .sort()
  .map((file) => files[file])
