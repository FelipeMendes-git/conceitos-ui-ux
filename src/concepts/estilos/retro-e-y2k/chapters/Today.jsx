import RelatedLinks from '../../../../shared/RelatedLinks.jsx'
import VerdictTable from '../../../../shared/VerdictTable.jsx'
import DoseDemo from '../demos/DoseDemo.jsx'
import s from './today.module.css'

/*
 * DE VOLTA A HOJE: o fechamento da página.
 *
 * Depois dos quatro capítulos de época, a pele volta a ser a de hoje, limpa
 * e discreta, para tratar do que fazer com tudo aquilo: o que separa uma
 * releitura de uma cópia, quanta época usar, o que cada passado comunica,
 * onde serve e quanto custa.
 */

const DISTINCTIONS = [
  {
    title: 'Retrô não é vintage',
    text: 'Vintage é o objeto que realmente tem aquela idade. Retrô é o novo feito para parecer antigo. Nesta página, as quatro fotos de objetos são vintage; todo o resto é retrô.',
  },
  {
    title: 'Y2K não é tudo dos anos 2000',
    text: 'O Y2K original é futurista e limpo. O exagero de strass, rosa e ostentação que veio logo depois tem outro nome, McBling. As bolhas brilhantes com céu azul e grama, do fim da década, também: Frutiger Aero.',
  },
  {
    title: 'O passado volta em ciclos, mais ou menos',
    text: 'Costuma-se dizer que a cultura revisita o que aconteceu vinte a trinta anos antes, quando quem cresceu com aquilo vira adulto e passa a criar e a comprar. É um padrão observado, não uma lei: no começo de 2026 as redes sociais já estavam com saudade de 2016.',
  },
]

const OWN_PAST = [
  {
    name: 'Burger King, 2021',
    text: 'Voltou ao desenho do nome entre dois pães, usado a partir de 1969, e trocou o azul por laranjas, marrons e creme. A justificativa: comida de verdade, sem nada artificial.',
  },
  {
    name: 'Pepsi, 2023',
    text: 'Nos 125 anos da marca, o nome voltou para o centro do globo, em preto, como era dos anos 80 ao fim dos 90. Segundo a empresa, era a versão que tinha ficado na memória das pessoas.',
  },
  {
    name: 'Kolynos e Kibon, 2025 e 2026',
    text: 'No Brasil, a Sorriso relançou a Kolynos com a embalagem verde e amarela de antes de 1997, e a Kibon vestiu Chicabon e Eski-bon com embalagens antigas nos seus 85 anos. As duas em edição limitada, que é a dose mais segura.',
  },
]

const BORROWED_PAST = [
  {
    name: 'Nothing, 2022',
    text: 'Um celular novo, de marca nova, com a traseira transparente. O fundador o descreveu como retrofuturista, inspirado em aparelhos antigos; a imprensa viu ali a volta do plástico translúcido dos anos 90.',
  },
  {
    name: 'Stranger Things',
    text: 'A abertura da série usa uma letra dos anos 70 e 80, escolhida a partir de capas de livros da época. Uma única letra carrega uma década inteira.',
  },
  {
    name: 'Poolsuite FM',
    text: 'Uma rádio na internet com cara de computador dos anos 90. Funciona de verdade, e ao ir para o celular ganhou um desenho próprio em vez de imitar janelas em tela pequena.',
  },
]

const VERDICTS = {
  ecommerce: {
    verdict: 'warn',
    why: 'Ótimo para moda, música, comida e edições limitadas, na vitrine e nos banners. A foto do produto, o preço e o botão de comprar ficam sem fantasia.',
  },
  landing: {
    verdict: 'ok',
    why: 'Campanha, lançamento, evento: pouco texto, muito impacto e vida curta. A página sai do ar antes de a moda passar.',
  },
  dashboard: {
    verdict: 'avoid',
    why: 'Ferramenta de uso diário pede neutralidade. Letra de época e janelas de mentira cansam e atrapalham; no máximo, um toque na marca.',
  },
  app: {
    verdict: 'warn',
    why: 'Funciona em música, jogos e câmera. Imitar janelas de computador antigo não cabe na tela pequena.',
  },
  blog: {
    verdict: 'warn',
    why: 'Capas e títulos de época funcionam bem em cultura e música. O texto corrido fica em letra de leitura.',
  },
  portfolio: {
    verdict: 'ok',
    why: 'Mostra personalidade e repertório. Cuidado com o clichê: o portfólio que imita a área de trabalho dos anos 90 já foi muito feito.',
  },
}

const COSTS = [
  {
    name: 'Velocidade',
    headline: 'A cor não pesa; a letra e a textura, sim',
    text: 'Cores e formas não deixam o site mais lento. O peso vem de cada letra de época, que é um arquivo a mais, e principalmente de texturas, fotos granuladas, vídeos e animações.',
  },
  {
    name: 'Leitura',
    headline: 'O maior risco está na cópia fiel',
    text: 'Letra de pixel pequena, neon sobre preto, pares de cores que vibram, texto piscando. A releitura resolve mantendo o texto corrido simples, como nos quatro capítulos desta página.',
  },
  {
    name: 'Produção',
    headline: 'Fácil de fazer mal, trabalhoso de fazer bem',
    text: 'Um modelo pronto com cara de antigo sai em minutos. Acertar a época exige pesquisar os detalhes: a letra, a cor e o material certos daquele ano.',
  },
  {
    name: 'Durabilidade',
    headline: 'Envelhece duas vezes',
    text: 'A época imitada já é antiga, e a moda de imitá-la também passa. O Y2K barulhento de 2021 a 2023 já esfriou. Dura mais quando o passado é da própria marca e quando a dose é pequena.',
  },
]

const RELATED = [
  { to: 'estilos/memphis', why: 'O lado geométrico e colorido dos anos 80, que ficou de fora daqui.' },
  { to: 'estilos/esqueumorfismo', why: 'Imitar objetos reais, em vez de imitar épocas.' },
  { to: 'estilos/glassmorphism', why: 'O vidro de hoje tem um pé no plástico e no gel da virada do milênio.' },
  { to: 'estilos/maximalismo', why: 'Quando o excesso é a intenção, com ou sem nostalgia.' },
  { to: 'estilos/linha-do-tempo', why: 'Como cada estilo nasceu em reação ao anterior.' },
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
      <header className={s.opening}>
        <h2 id="titulo-hoje">De volta a hoje</h2>
        <p>
          Você atravessou trinta e cinco anos de estilos. Agora, o que fazer
          com eles.
        </p>
      </header>

      {/* ---------- Releitura não é cópia ---------- */}
      <div className={s.part}>
        <h3>Releitura não é cópia</h3>
        <div className={s.prose}>
          <p>
            Nenhum dos quatro capítulos acima é uma cópia. Uma página de 1997
            de verdade teria letra miúda, texto piscando e largura pensada
            para um monitor pequeno. O que você viu são releituras: a
            aparência é de época, a organização e a leitura são de hoje.
          </p>
        </div>
        <dl className={s.distinctions}>
          {DISTINCTIONS.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- Quanta época usar ---------- */}
      <div className={s.part}>
        <h3>Quanta época usar</h3>
        <div className={s.prose}>
          <p>
            A regra prática é a dose. A época entra na pele, que são as cores,
            os títulos e as ilustrações, e fica fora da tarefa, que é ler,
            comparar, preencher e pagar. Escolha uma época e aumente a dose na
            mesma página de produto.
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

        <p className={s.mirror}>
          <strong>O caso espelhado.</strong> Em agosto de 2025, a rede americana
          de restaurantes Cracker Barrel trocou o logotipo antigo, com a figura
          de um senhor ao lado de um barril, por uma versão só com o nome. A
          reação foi tão forte que a empresa voltou atrás em cerca de uma
          semana. A nostalgia tem dono, e tirá-la também custa.
        </p>
      </div>

      {/* ---------- Onde serve ---------- */}
      <div className={s.part}>
        <h3>Onde serve</h3>
        <div className={s.prose}>
          <p>
            Quanto mais curta a vida da página, maior a dose que ela aguenta.
            Combina com moda, música, eventos, comida e marcas jovens; destoa
            em banco, saúde e serviços públicos, onde o visitante quer
            confiança antes de diversão.
          </p>
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
