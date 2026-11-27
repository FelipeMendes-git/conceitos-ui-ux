import styles from './regua.module.css'

/*
 * A régua: uma barra de segmentos, cada um com a largura da sua parte.
 * É a unidade visual da tela; aparece no laboratório, nas combinações e em
 * cada site medido.
 *
 * Uso:
 *   <Regua parts={[
 *     { name: 'marinho', color: '#1b2a4a', ink: '#f8f7f2', value: 60 },
 *     { name: 'branco', color: '#f8f7f2', ink: '#1b2a4a', value: 30 },
 *     { name: 'dourado', color: '#c9a84c', ink: '#1b2a4a', value: 10 },
 *   ]} />
 *
 * "ink" é a cor do número dentro do segmento. "text" troca o número da
 * legenda por um texto ("menos de 1%"). Com "legend", os nomes e os números
 * aparecem escritos embaixo; sem ela, só leitores de tela recebem a frase.
 */
export default function Regua({ parts, legend = false, className = '' }) {
  const total = parts.reduce((sum, part) => sum + part.value, 0)
  const percent = (part) => Math.round((part.value / total) * 100)
  const label = (part) => `${part.name} ${part.text ?? `${percent(part)}%`}`

  return (
    <div className={`${styles.regua} ${className}`}>
      <div className={styles.bar} aria-hidden="true">
        {parts.map((part) => (
          <span
            key={part.name}
            className={styles.segment}
            style={{ flexGrow: part.value, background: part.color, color: part.ink }}
          >
            {/* Número só onde cabe: em segmentos muito finos ele sairia. */}
            {percent(part) >= 7 ? percent(part) : ''}
          </span>
        ))}
      </div>
      {legend ? (
        <ul className={styles.legend}>
          {parts.map((part) => (
            <li key={part.name}>{label(part)}</li>
          ))}
        </ul>
      ) : (
        <p className="sr-only">{parts.map(label).join(', ')}</p>
      )}
    </div>
  )
}
