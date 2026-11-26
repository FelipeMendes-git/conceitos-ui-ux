import gameBoy from '../images/y2k-game-boy-color.jpg'
import s from './y2k.module.css'

/*
 * Y2K: a abertura de um site e o painel de um aparelho, por volta de 2000.
 *
 * Prata e azul-gelo, cromo, cápsulas de gel, painéis de cantos desiguais,
 * cantoneiras e uma malha de linhas onduladas. As mesmas quatro partes dos
 * outros capítulos: a capa, "Como era", "Os ingredientes" e "Uma peça da
 * época".
 */

const PALETTE = [
  { name: 'Prata', where: 'O corpo dos aparelhos', color: '#c3cedb' },
  { name: 'Azul-gelo', where: 'Telas e fundos', color: '#a9dcf7' },
  { name: 'Azul elétrico', where: 'Botões e destaques', color: '#1e6bff' },
  { name: 'Laranja', where: 'O contraste quente', color: '#ff6a00' },
  { name: 'Verde-limão', where: 'O toque ácido', color: '#a4e000' },
  { name: 'Grafite', where: 'O lugar do preto', color: '#28344d' },
]

const MOMENTS = [
  {
    year: '1998',
    text: 'O iMac troca o bege dos computadores por plástico colorido e translúcido. Em dois anos, tudo era translúcido.',
  },
  {
    year: '2000',
    text: 'A Apple mostra a interface Aqua, com botões de gel que Steve Jobs chamou de "lambíveis".',
  },
  {
    year: '2001',
    text: 'O Windows XP responde com barra azul, botões arredondados e uma colina verde de fundo.',
  },
]

// A malha de linhas onduladas do fundo: catorze curvas quase paralelas.
const WAVES = Array.from({ length: 14 }, (_, index) => {
  const y = 40 + index * 22
  const bend = 70 - index * 7
  return `M0 ${y} C 300 ${y - bend}, 600 ${y + bend}, 900 ${y} S 1500 ${y - bend}, 1800 ${y}`
})

function Waves({ className }) {
  return (
    <svg className={className} viewBox="0 0 1800 380" preserveAspectRatio="none" aria-hidden="true">
      {WAVES.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  )
}

export default function Y2k() {
  return (
    <section id="y2k" data-chapter="y2k" className={s.chapter} aria-labelledby="titulo-y2k">
      {/* ---------- A capa ---------- */}
      <header className={s.cover}>
        <Waves className={s.waves} />

        <div className={s.frame}>
          <p className={s.status}>Sistema pronto. Futuro carregado.</p>
          <p className={s.years}>1997 a 2004</p>
          <h2 id="titulo-y2k" className={s.title}>
            Y2K
          </h2>
          <p className={s.tagline}>Brilhante, arredondado e otimista.</p>

          {/* A barra de carregamento, já cheia. */}
          <div className={s.loader} aria-hidden="true">
            <span className={s.loaderBar}>
              <span />
            </span>
            <span className={s.loaderText}>100%</span>
          </div>
        </div>
      </header>

      <div className={s.body}>
        {/* ---------- Como era ---------- */}
        <div className={`${s.panel} ${s.story}`}>
          <h3 className={s.heading}>Como era</h3>

          <div className={s.text}>
            <p>
              A virada do milênio veio com medo do bug do ano 2000, a pane que
              os computadores poderiam ter na troca de data, e com a certeza
              de que o futuro seria ótimo. O visual ficou com o otimismo: tudo
              brilhava, tudo era redondo, tudo parecia novo.
            </p>
            <p>
              O lado gráfico vinha dos jogos e da música eletrônica. O estúdio
              inglês The Designers Republic desenhou para o jogo de corrida
              Wipeout, de 1995, logotipos, painéis e marcas de equipes
              inventadas que pareciam vindos do futuro.
            </p>
            <p>
              Na internet, os sites abriam com uma animação de entrada e um
              botão para pular a introdução. A navegação imitava o painel de
              um aparelho, com botões de gel e telas dentro da tela.
            </p>
          </div>

          <ol className={s.moments}>
            {MOMENTS.map((moment) => (
              <li key={moment.year}>
                <span className={s.year}>{moment.year}</span>
                <span>{moment.text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ---------- Um objeto de verdade ---------- */}
        <figure className={s.real}>
          <div className={s.realPhoto}>
            <img src={gameBoy} alt="Videogame portátil Game Boy Color de plástico roxo translúcido, com as peças internas visíveis através da carcaça." width="900" height="1224" loading="lazy" />
          </div>
          <figcaption>
            <h3 className={s.realTitle}>Um objeto de verdade</h3>
            <p className={s.realTag}>Isto é vintage: é mesmo da época, não uma releitura.</p>
            <p>
              Um Game Boy Color de 1998, na versão de plástico roxo translúcido. Dá para ver as peças por dentro. É a mesma ideia do iMac, lançado no mesmo ano: a tecnologia deixou de se esconder.
            </p>
            <p className={s.credit}>Foto de Evan-Amos, em domínio público, via Wikimedia Commons.</p>
          </figcaption>
        </figure>

        {/* ---------- Os ingredientes ---------- */}
        <div className={s.ingredients}>
          <h3 className={s.heading}>Os ingredientes</h3>

          <h4 className={s.label}>Paleta</h4>
          <ul className={s.palette}>
            {PALETTE.map((item) => (
              <li key={item.name}>
                <span className={s.capsule} style={{ '--gel': item.color }} />
                <strong>{item.name}</strong>
                <span>{item.where}</span>
              </li>
            ))}
          </ul>

          <div className={s.pair}>
            <div>
              <h4 className={s.label}>Letras</h4>
              <ul className={s.specimens}>
                <li>
                  <span className={s.chromeType} aria-hidden="true">
                    Brilho
                  </span>
                  <span>Larga e arredondada, com reflexo de metal.</span>
                </li>
                <li>
                  <span className={s.pixelType} aria-hidden="true">
                    Pixel
                  </span>
                  <span>Miúda e quadriculada, nas etiquetas técnicas.</span>
                </li>
                <li>
                  <span className={s.screenType} aria-hidden="true">
                    Tela
                  </span>
                  <span>Larga e clara, feita para ler no monitor.</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={s.label}>Formas e material</h4>
              <ul className={s.shapes}>
                <li>
                  <span className={`${s.shape} ${s.shapeCapsule}`} aria-hidden="true" />
                  <span>Cápsulas de gel</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeCorners}`} aria-hidden="true" />
                  <span>Painel de cantos desiguais</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeTarget}`} aria-hidden="true" />
                  <span>Cantoneiras e linhas de mira</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeMetal}`} aria-hidden="true" />
                  <span>Metal escovado e plástico translúcido</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- Uma peça da época ---------- */}
        <figure className={s.piece}>
          <h3 className={s.heading}>Uma peça da época</h3>

          <div className={s.intro}>
            <Waves className={s.introWaves} />

            <div className={s.introNav} aria-hidden="true">
              <span>Início</span>
              <span>Mundo</span>
              <span>Sons</span>
              <span>Contato</span>
            </div>

            <div className={s.introCore}>
              <p className={s.introLabel}>Experiência digital, versão 2.0</p>
              <p className={s.introLogo}>Nexo</p>
              <div className={s.introLoader} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className={s.introStatus}>Carregando o futuro: 100%</p>
            </div>

            <div className={s.introFoot}>
              <span className={s.skip}>Pular introdução »</span>
              <span>Melhor com o som ligado</span>
            </div>
          </div>

          <figcaption>
            A abertura do site de uma marca inventada. Repare no nome cromado,
            nas cápsulas de gel do alto, na barra de carregamento em gomos, nas
            cantoneiras e nas linhas onduladas do fundo.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
