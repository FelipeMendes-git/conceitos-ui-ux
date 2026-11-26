import { useEffect, useState } from 'react'
import ConceptPage from '../../../shared/ConceptPage.jsx'
import RelatedLinks from '../../../shared/RelatedLinks.jsx'
import Section from '../../../shared/Section.jsx'
import AnatomyDemo from './demos/AnatomyDemo.jsx'
import BackgroundDemo from './demos/BackgroundDemo.jsx'
import BrandFit from './demos/BrandFit.jsx'
import GlassBuilder from './demos/GlassBuilder.jsx'
import NotGlass from './demos/NotGlass.jsx'
import ReadabilityDemo from './demos/ReadabilityDemo.jsx'
import SiteMockups from './demos/SiteMockups.jsx'
import Switch from './demos/Switch.jsx'
import './theme.css'
import styles from './styles.module.css'

/*
 * GLASSMORPHISM (SPEC-101)
 *
 * A página pratica o conceito: todo bloco de conteúdo é um painel de vidro
 * sobre um fundo de círculos coloridos que se movem devagar.
 *
 * Este arquivo tem o texto e a ordem das seções. Cada demonstração interativa
 * ou exemplo visual mora em um arquivo próprio, na pasta demos/.
 */

const TIMELINE = [
  {
    year: '2007',
    text: 'O Windows Vista traz janelas com bordas translúcidas. Já na época houve queixa de texto difícil de ler.',
  },
  { year: '2013', text: 'O iPhone adota painéis foscos no iOS 7.' },
  {
    year: '2020',
    text: 'O Mac segue o caminho, e o designer Michal Malewicz dá nome ao estilo: glassmorphism.',
  },
  { year: '2025', text: 'A Apple veste todos os seus sistemas de vidro: o Liquid Glass.' },
]

const SENSATIONS = ['Moderno', 'Leve', 'Tecnológico', 'Sofisticado']

const COSTS = [
  {
    name: 'Velocidade',
    headline: 'Não pesa para abrir, pesa para rolar',
    text: 'O site não demora mais para carregar. O custo aparece na fluidez: desfocar o fundo exige trabalho do aparelho a cada movimento. Um ou dois painéis não se notam; muitos painéis grandes sobre fundo animado travam a rolagem em celulares simples.',
  },
  {
    name: 'Leitura',
    headline: 'O maior risco',
    text: 'A cor atrás do texto muda de um ponto para outro, então a mesma frase pode estar legível aqui e ilegível ali. É preciso testar o texto sobre a parte mais difícil do fundo.',
  },
  {
    name: 'Produção',
    headline: 'Rápido de fazer, trabalhoso de fazer bem',
    text: 'Um painel de vidro sai em minutos. Um bom painel pede um fundo pensado para o efeito e teste de leitura em vários pontos.',
  },
  {
    name: 'Durabilidade',
    headline: 'Boa na versão discreta',
    text: 'O estilo já teve auges em 2013 e em 2020, e voltou com força em 2025. Hoje é recurso estabelecido, mas os painéis carregados de vidro de 2021 já parecem datados.',
  },
]

const LIQUID_GLASS_STORY = [
  {
    when: 'Set. 2025',
    text: 'O iPhone recebe o Liquid Glass. Usuários reclamam de texto difícil de ler e de lentidão nas animações.',
  },
  {
    when: 'Nov. 2025',
    text: 'Uma atualização traz a escolha entre vidro claro e vidro tingido, mais opaco e com mais contraste.',
  },
  {
    when: 'Jun. 2026',
    text: 'A Apple anuncia que está refazendo a base do efeito para garantir a leitura, com um controle de intensidade.',
  },
]

const RELATED = [
  { to: 'estilos/neumorphism', why: 'O estilo com que o vidro mais é confundido: opaco e em relevo.' },
  { to: 'estilos/aurora-e-gradientes', why: 'Os fundos de cor que costumam acompanhar o vidro.' },
  { to: 'cores/contraste-e-leitura', why: 'Como saber se um texto dá para ler, o maior risco do vidro.' },
  { to: 'composicao/profundidade', why: 'Outras formas de mostrar que algo está acima.' },
]

export default function Glassmorphism() {
  // O fundo vivo é a primeira peça da anatomia. Desligá-lo na demonstração
  // apaga os círculos da página inteira, e todo o vidro dela "morre" junto.
  const [liveBackground, setLiveBackground] = useState(true)
  const [solid, setSolid] = useState(false)

  // "Vidro mais sólido" vale para a página e para o menu, por isso o aviso
  // vai para o elemento raiz, onde o theme.css consegue alcançar os dois.
  useEffect(() => {
    const root = document.documentElement
    root.dataset.glass = solid ? 'solid' : 'clear'
    return () => {
      delete root.dataset.glass
    }
  }, [solid])

  const panel = `${styles.glass} ${styles.panel}`

  return (
    <>
      {/* Fundo de janela inteira: passa também por trás do menu. */}
      <div className={styles.backdrop} data-live={liveBackground} aria-hidden="true">
        <span className={`${styles.circle} ${styles.coral}`} />
        <span className={`${styles.circle} ${styles.cobalt}`} />
        <span className={`${styles.circle} ${styles.amber}`} />
        <span className={`${styles.circle} ${styles.teal}`} />
      </div>

      <ConceptPage
        lede="Superfícies de vidro fosco que flutuam sobre a cor e deixam o contexto aparecer."
        className={styles.page}
        headerClassName={`${styles.glass} ${styles.hero}`}
      >
        <div className={`${styles.glass} ${styles.toolbar}`}>
          <Switch
            checked={solid}
            onChange={setSolid}
            name="Vidro mais sólido"
            role="Deixa os painéis quase opacos, para quem prefere ler sem transparência."
          />
        </div>

        <Section number="01" title="O que é" className={panel}>
          <p>
            Um estilo em que as superfícies parecem placas de vidro fosco flutuando
            sobre um fundo colorido. O que está atrás do painel continua visível,
            mas borrado: você percebe que há algo ali sem que isso atrapalhe a
            leitura.
          </p>
          <p>
            O vidro comunica camadas. Uma sombra diz "isto está acima". O vidro
            diz "estou acima, e o que você estava vendo continua aí atrás".
          </p>

          <ol className={styles.timeline}>
            {TIMELINE.map((moment) => (
              <li key={moment.year} className={styles.moment}>
                <span className={styles.year}>{moment.year}</span>
                <span className={styles.momentText}>{moment.text}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section number="02" title="O que não é" className={panel}>
          <p>
            A confusão mais comum é achar que basta deixar um painel transparente.
            Os três cartões abaixo têm o mesmo texto e o mesmo fundo; só um deles
            é vidro.
          </p>
          <p>
            Também não é neumorphism, que é opaco e simula relevo em uma única
            superfície. E não funciona sobre fundo liso: sem cor ou forma atrás,
            não há o que desfocar.
          </p>
        </Section>
        <NotGlass />

        <AnatomyDemo
          number="03"
          liveBackground={liveBackground}
          onLiveBackgroundChange={setLiveBackground}
        />

        <Section number="04" title="Laboratório" className={panel}>
          <GlassBuilder />
          <BackgroundDemo />
          <ReadabilityDemo />
        </Section>

        <Section number="05" title="O que comunica" className={panel}>
          <ul className={styles.sensations}>
            {SENSATIONS.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>

          <div className={styles.fit}>
            <div>
              <h3 className={styles.smallHeading}>Combina com</h3>
              <p>
                Tecnologia, fintechs, aplicativos de música e de clima, produtos
                digitais que querem parecer atuais e bem acabados.
              </p>
            </div>
            <div>
              <h3 className={styles.smallHeading}>Não combina com</h3>
              <p>
                Marcas que precisam passar tradição e solidez, como advocacia e
                bancos tradicionais, e sites feitos para leitura longa.
              </p>
            </div>
            <div>
              <h3 className={styles.smallHeading}>Risco de imagem</h3>
              <p>
                Usado em tudo, vira modelo pronto. Hoje o estilo é recurso
                estabelecido, não novidade, e a versão atual é contida: pouco
                desfoque, bom contraste, poucos elementos.
              </p>
            </div>
          </div>

          <BrandFit />
        </Section>

        <Section number="06" title="Onde aplicar" className={panel}>
          <p>
            O vidro serve para o que flutua sobre conteúdo: barras, janelas,
            cartões sobre imagem. Atrapalha onde há muito texto ou onde o fundo é
            imprevisível. Pense nele como tempero, não como prato: no elemento
            mais importante da tela, com o resto sólido.
          </p>
          <SiteMockups />
          <p className={styles.footnote}>
            Os vereditos são a avaliação deste guia, a partir de como o estilo é
            usado hoje.
          </p>
        </Section>

        <Section number="07" title="Quanto custa" className={panel}>
          <ul className={styles.costs}>
            {COSTS.map((cost) => (
              <li key={cost.name} className={styles.cost}>
                <p className={styles.costName}>{cost.name}</p>
                <h3 className={styles.costHeadline}>{cost.headline}</h3>
                <p className={styles.costText}>{cost.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section number="08" title="No mundo real" className={panel}>
          <div className={styles.company}>
            <h3 className={styles.companyName}>Apple</h3>
            <div>
              <p>
                É o exemplo central. Os painéis foscos estão no iPhone desde 2013
                e, a partir de 2025, o vidro virou a linguagem de todos os
                sistemas da empresa, com o nome Liquid Glass. A história desse
                lançamento é a melhor aula sobre o custo do estilo.
              </p>
              <ol className={styles.story}>
                {LIQUID_GLASS_STORY.map((step) => (
                  <li key={step.when} className={styles.step}>
                    <span className={styles.stepWhen}>{step.when}</span>
                    <span>{step.text}</span>
                  </li>
                ))}
              </ol>
              <p className={styles.lesson}>
                Nem a empresa que popularizou o estilo escapou do seu principal
                risco. E a saída foi a mesma do botão no topo desta página: dar a
                quem lê a escolha de um vidro mais sólido.
              </p>
            </div>
          </div>

          <div className={styles.company}>
            <h3 className={styles.companyName}>Microsoft</h3>
            <div>
              <p>
                No Windows 11 a empresa separa dois materiais. O Acrílico é o
                vidro fosco, e a orientação da própria Microsoft é usá-lo só em
                superfícies passageiras, como menus. Para o fundo das janelas
                existe outro material, o Mica, que é opaco.
              </p>
              <p>É a regra das pequenas doses, escrita por quem faz o sistema.</p>
            </div>
          </div>

          <div className={styles.company}>
            <h3 className={styles.companyName}>Onde mais procurar</h3>
            <div>
              <p>
                Painéis de ferramentas online, páginas de lançamento de produtos
                de tecnologia e as barras e janelas de aplicativos de celular.
              </p>
            </div>
          </div>
        </Section>

        <Section number="09" title="Para ir além" className={panel}>
          <RelatedLinks items={RELATED} />
        </Section>
      </ConceptPage>
    </>
  )
}
