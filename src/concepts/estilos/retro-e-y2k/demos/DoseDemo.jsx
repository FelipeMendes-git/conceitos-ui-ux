import { useId, useState } from 'react'
import s from './doseDemo.module.css'

/*
 * DOSE DE NOSTALGIA
 *
 * A mesma página de produto, em quatro épocas e cinco doses. A cada passo
 * mais uma camada da página ganha a roupa da época: primeiro o título e a
 * cor de destaque, depois o fundo e as formas, depois o botão e, no fim, até
 * o texto corrido e o preço. A demonstração ensina que existe uma faixa em
 * que a época ajuda e que, passando dela, a tarefa de comprar fica difícil.
 *
 * Cada dose liga uma classe a mais na maquete (d1, d2, d3, d4); o visual de
 * cada camada está no arquivo de estilos.
 */

const ERAS = [
  { id: '70', name: 'Anos 70' },
  { id: '80', name: 'Anos 80' },
  { id: '90', name: 'Anos 90' },
  { id: 'y2k', name: 'Y2K' },
]

const DOSES = [
  {
    label: 'Nenhuma',
    level: 'Sem época.',
    note: 'A página de hoje, sem referência nenhuma. Funciona, e poderia ser de qualquer marca.',
    task: 'easy',
  },
  {
    label: 'Um toque',
    level: 'Referência.',
    note: 'Só o título e a cor de destaque são de época. Quase toda marca aguenta esta dose.',
    task: 'easy',
  },
  {
    label: 'Releitura',
    level: 'Releitura.',
    note: 'Entram o fundo, as formas e o material. A época fica clara, e o texto, o preço e o botão continuam simples.',
    task: 'easy',
  },
  {
    label: 'Carregada',
    level: 'No limite.',
    note: 'O botão e os rótulos também se vestem de época. Ainda dá para comprar, mas já é preciso procurar.',
    task: 'limit',
  },
  {
    label: 'Fantasia',
    level: 'Fantasia.',
    note: 'Tudo é de época, até o texto corrido e o preço. Bonito de olhar, difícil de usar.',
    task: 'hard',
  },
]

const TASK_TEXT = {
  easy: 'Comprar continua fácil',
  limit: 'Comprar ficou no limite',
  hard: 'Comprar ficou difícil',
}

export default function DoseDemo() {
  const [era, setEra] = useState('70')
  const [dose, setDose] = useState(2)
  const sliderId = useId()
  const current = DOSES[dose]

  // d1 a d4: uma classe para cada camada já ligada.
  const layers = [s.d1, s.d2, s.d3, s.d4].slice(0, dose).join(' ')

  return (
    <div className={s.demo}>
      <div className={s.controls}>
        <div className={s.eras} role="group" aria-label="Época">
          {ERAS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === era}
              onClick={() => setEra(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className={s.dose}>
          <label htmlFor={sliderId}>Dose de época</label>
          <input
            id={sliderId}
            type="range"
            min="0"
            max="4"
            step="1"
            value={dose}
            aria-valuetext={current.label}
            onChange={(event) => setDose(Number(event.target.value))}
          />
          <div className={s.ticks} aria-hidden="true">
            {DOSES.map((item, index) => (
              <span key={item.label} data-current={index === dose}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* A maquete é uma ilustração: o botão dela não é um botão de verdade. */}
      <div className={s.stage}>
        <div className={`${s.mock} ${layers}`} data-era={era}>
          <div className={s.bar}>
            <span className={s.brand}>Aurora Café</span>
            <span className={s.links}>
              <span>Loja</span>
              <span>Sobre</span>
              <span>Sacola</span>
            </span>
          </div>

          <div className={s.product}>
            <div className={s.photo} aria-hidden="true">
              <span className={s.bag}>
                <span>A</span>
              </span>
            </div>

            <div className={s.info}>
              <p className={s.title}>Café em grãos</p>
              <p className={s.desc}>
                Torra média, com notas de chocolate e laranja. Pacote de 250
                gramas, entregue em até três dias úteis.
              </p>
              <p className={s.price}>R$ 38,00</p>
              <span className={s.buy}>Comprar</span>
            </div>
          </div>
        </div>
      </div>

      {/* aria-live: leitores de tela anunciam a mudança de dose. */}
      <div className={s.readout} aria-live="polite">
        <p>
          <strong>{current.level}</strong> {current.note}
        </p>
        <p className={s.task} data-task={current.task}>
          <span className={s.taskMark} aria-hidden="true" />
          {TASK_TEXT[current.task]}
        </p>
      </div>
    </div>
  )
}
