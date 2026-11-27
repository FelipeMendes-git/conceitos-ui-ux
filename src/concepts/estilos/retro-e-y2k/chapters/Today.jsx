import RelatedLinks from '../../../../shared/RelatedLinks.jsx'
import VerdictTable from '../../../../shared/VerdictTable.jsx'
import DoseDemo from '../demos/DoseDemo.jsx'
import s from './today.module.css'

/*
 * DE VOLTA A HOJE: o fechamento da página.
 *
 * Depois dos quatro capítulos de época, a pele volta a ser a de hoje, limpa
 * e discreta, para tratar do que fazer com tudo aquilo: o que separa uma
 * releitura de uma cópia (na abertura), quanta época usar, o que cada passado
 * comunica, onde serve e quanto custa. Cada parte é curta.
 */

const OWN_PAST = [
  {
    name: 'Burger King, 2021',
    text: 'Voltou ao desenho do nome entre dois pães, usado a partir de 1969.',
  },
  {
    name: 'Kolynos e Kibon, 2025 e 2026',
    text: 'No Brasil, a Kolynos foi relançada com a embalagem de antes de 1997, e a Kibon vestiu Chicabon e Eski-bon com embalagens antigas, em edição limitada.',
  },
]

const BORROWED_PAST = [
  {
    name: 'Nothing, 2022',
    text: 'Um celular novo, de marca nova, com a traseira transparente, como o plástico translúcido dos anos 90.',
  },
]

const VERDICTS = {
  ecommerce: {
    verdict: 'warn',
    why: 'Ótimo na vitrine de moda, música e comida. Preço e botão de comprar ficam sem fantasia.',
  },
  landing: {
    verdict: 'ok',
    why: 'Campanha, lançamento, evento: muito impacto e vida curta.',
  },
  dashboard: {
    verdict: 'avoid',
    why: 'Ferramenta de uso diário pede neutralidade. Letra de época cansa.',
  },
  app: {
    verdict: 'warn',
    why: 'Funciona em música, jogos e câmera. Janelas de computador antigo não cabem na tela pequena.',
  },
  blog: {
    verdict: 'warn',
    why: 'Capas e títulos de época, sim. O texto corrido fica em letra de leitura.',
  },
  portfolio: {
    verdict: 'ok',
    why: 'Mostra personalidade. Cuidado com o clichê da área de trabalho dos anos 90.',
  },
}

const COSTS = [
  {
    name: 'Velocidade',
    headline: 'A cor não pesa; a textura, sim',
    text: 'Cores e formas não pesam. O peso vem das letras de época e, principalmente, de texturas, fotos granuladas e vídeos.',
  },
  {
    name: 'Leitura',
    headline: 'O maior risco está na cópia fiel',
    text: 'Letra de pixel pequena, neon sobre preto, texto piscando. A releitura mantém o texto corrido simples, como nesta página.',
  },
  {
    name: 'Produção',
    headline: 'Fácil de fazer mal',
    text: 'Um modelo pronto sai em minutos. Acertar a época exige pesquisar a letra, a cor e o material daquele ano.',
  },
  {
    name: 'Durabilidade',
    headline: 'Envelhece duas vezes',
    text: 'A época imitada já é antiga, e a moda de imitá-la também passa. Dura mais quando o passado é da própria marca.',
  },
]

const RELATED = [
  { to: 'estilos/memphis', why: 'O lado geométrico dos anos 80, que ficou de fora daqui.' },
  { to: 'estilos/esqueumorfismo', why: 'Imitar objetos reais, em vez de épocas.' },
  { to: 'estilos/glassmorphism', why: 'O vidro de hoje tem um pé no gel da virada do milênio.' },
  { to: 'estilos/maximalismo', why: 'Quando o excesso é a intenção.' },
]

function Cases({ title, lead, items }) {
  return (
    <div className={s.caseGroup}>
      <h4>{title}</h4>
      <p className={s.caseLead}>{lead}</p>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Today() {
  return (
    <section className={s.today} aria-labelledby="titulo-hoje">
      {/* A abertura já diz o que separa a releitura da cópia. */}
      <header className={s.opening}>
        <h2 id="titulo-hoje">De volta a hoje</h2>
        <p>
          Você atravessou trinta e cinco anos de estilos. Agora, o que fazer
          com eles.
        </p>
        <div className={s.prose}>
          <p>
            Nenhum dos quatro capítulos acima é uma cópia. O que você viu são
            releituras: a aparência é de época, a leitura é de hoje. E retrô
            não é vintage: vintage é o objeto que tem mesmo aquela idade;
            retrô é o novo feito para parecer antigo.
          </p>
        </div>
      </header>

      {/* ---------- Quanta época usar ---------- */}
      <div className={s.part}>
        <h3>Quanta época usar</h3>
        <div className={s.prose}>
          <p>
            A regra prática é a dose. A época entra na pele, que são as cores,
            os títulos e as ilustrações, e fica fora da tarefa, que é ler,
            comparar e pagar. Escolha uma época e aumente a dose.
          </p>
        </div>
        <DoseDemo />
      </div>

      {/* ---------- O que cada passado diz ---------- */}
      <div className={s.part}>
        <h3>O que cada passado diz</h3>
        <div className={s.prose}>
          <p>
            Todo retrô diz "você já conhece isso, e gostava". O resto da
            mensagem depende de quem é o dono daquele passado.
          </p>
        </div>

        <div className={s.cases}>
          <Cases
            title="Passado próprio"
            lead="A marca antiga que volta ao seu visual diz: somos os originais."
            items={OWN_PAST}
          />
          <Cases
            title="Passado emprestado"
            lead="Quem pega uma época emprestada diz: somos divertidos e do momento. Dura enquanto a moda durar."
            items={BORROWED_PAST}
          />
        </div>
      </div>

      {/* ---------- Onde serve ---------- */}
      <div className={s.part}>
        <h3>Onde serve</h3>
        <div className={s.prose}>
          <p>Quanto mais curta a vida da página, maior a dose que ela aguenta.</p>
        </div>
        <VerdictTable verdicts={VERDICTS} className={s.verdicts} />
      </div>

      {/* ---------- Quanto custa ---------- */}
      <div className={s.part}>
        <h3>Quanto custa</h3>
        <ul className={s.costs}>
          {COSTS.map((cost) => (
            <li key={cost.name}>
              <span className={s.costName}>{cost.name}</span>
              <strong>{cost.headline}</strong>
              <p>{cost.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Para ir além ---------- */}
      <div className={s.part}>
        <h3>Para ir além</h3>
        <RelatedLinks items={RELATED} className={s.related} />
      </div>
    </section>
  )
}
