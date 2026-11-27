import { PALETTES } from './palettes.js'
import page from '../styles.module.css'

/*
 * Os botões de combinação, presos ao alto da página durante toda a rolagem.
 * Cada um é a combinação em miniatura; o nome completo vai para leitores de
 * tela e aparece ao lado da que está em uso.
 */
export default function Dock({ palette, onPick }) {
  return (
    <div className={page.dock} role="group" aria-label="Cores da página">
      <span className={page.dockList}>
        {PALETTES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={page.dockButton}
            aria-pressed={item.id === palette.id}
            aria-label={item.name}
            title={item.name}
            onClick={() => onPick(item.id)}
          >
            <i style={{ flexGrow: 6, background: item.c60 }} />
            <i style={{ flexGrow: 3, background: item.c30 }} />
            <i style={{ flexGrow: 1, background: item.c10 }} />
          </button>
        ))}
      </span>
      <span className={page.dockName} aria-hidden="true">
        {palette.name}
      </span>
    </div>
  )
}
