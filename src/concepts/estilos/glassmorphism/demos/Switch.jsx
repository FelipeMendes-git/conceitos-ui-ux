import styles from './demos.module.css'

/*
 * Interruptor liga/desliga com nome e uma linha de explicação.
 *
 * É um <button> com role="switch": funciona com Enter e Espaço, e leitores de
 * tela anunciam "ligado" ou "desligado".
 */
export default function Switch({ checked, onChange, name, role }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={styles.switch}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
      </span>
      <span className={styles.label}>
        <span className={styles.name}>{name}</span>
        {role && <span className={styles.role}>{role}</span>}
      </span>
    </button>
  )
}
