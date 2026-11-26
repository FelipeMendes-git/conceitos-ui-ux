import macintosh from '../images/anos-90-macintosh-lc.jpg'
import s from './nineties.module.css'

/*
 * ANOS 90: a área de trabalho de um computador e uma página pessoal.
 *
 * O capítulo inteiro é uma área de trabalho verde-água com janelas cinza em
 * relevo. A janela maior é um navegador mostrando uma página pessoal, que é
 * ao mesmo tempo a capa, o "Como era" e a peça da época. As janelas menores
 * trazem os ingredientes.
 */

// As 216 cores "seguras": seis níveis de vermelho, de verde e de azul,
// combinados entre si (6 × 6 × 6).
const LEVELS = ['00', '33', '66', '99', 'cc', 'ff']
const SAFE_COLORS = LEVELS.flatMap((r) => LEVELS.flatMap((g) => LEVELS.map((b) => `#${r}${g}${b}`)))

const NAMED_COLORS = [
  { name: 'Cinza de janela', color: '#c0c0c0' },
  { name: 'Azul da barra', color: '#000080' },
  { name: 'Verde-água do fundo', color: '#008080' },
  { name: 'Azul de link', color: '#0000ee' },
  { name: 'Roxo de link visitado', color: '#551a8b' },
  { name: 'Amarelo de aviso', color: '#ffff00' },
]

const FONTS = [
  { sample: 'Times New Roman', className: 'times', note: 'A letra padrão de toda página.' },
  { sample: 'Comic Sans', className: 'comic', note: 'Criada para balões de personagens; foi parar em tudo.' },
  { sample: 'Verdana', className: 'verdana', note: 'De 1996, desenhada para ser lida em tela.' },
  { sample: 'Courier New', className: 'courier', note: 'A da máquina de escrever, para endereços.' },
  { sample: 'Letra de pixel', className: 'pixel', note: 'Menus, contadores e botões pequenos.' },
]

/* Uma janela: moldura em relevo, barra de título azul e três botões de enfeite. */
function Window({ title, heading: Heading = 'h4', className = '', children }) {
  return (
    <div className={`${s.window} ${className}`}>
      <div className={s.titleBar}>
        <Heading className={s.titleText}>{title}</Heading>
        <span className={s.titleButtons} aria-hidden="true">
          <span>_</span>
          <span>□</span>
          <span>×</span>
        </span>
      </div>
      {children}
    </div>
  )
}

export default function Nineties() {
  return (
    <section id="anos-90" data-chapter="90" className={s.chapter} aria-labelledby="titulo-anos-90">
      <div className={s.desktop}>
        {/* ---------- O navegador com a página pessoal ---------- */}
        <div className={`${s.window} ${s.browser}`}>
          <div className={s.titleBar}>
            <span className={s.titleText}>Minha página dos Anos 90 - Navegador</span>
            <span className={s.titleButtons} aria-hidden="true">
              <span>_</span>
              <span>□</span>
              <span>×</span>
            </span>
          </div>

          <div aria-hidden="true">
            <div className={s.menuBar}>
              <span>Arquivo</span>
              <span>Editar</span>
              <span>Exibir</span>
              <span>Ir</span>
              <span>Favoritos</span>
              <span>Ajuda</span>
            </div>
            <div className={s.toolBar}>
              <span>Voltar</span>
              <span>Avançar</span>
              <span>Parar</span>
              <span>Atualizar</span>
              <span>Início</span>
            </div>
            <div className={s.addressBar}>
              <span>Endereço</span>
              <span className={s.address}>http://www.paginas.com.br/~anos90/</span>
            </div>
          </div>

          {/* A página pessoal: fundo repetido como azulejo, tudo centralizado. */}
          <div className={s.homepage}>
            <p className={s.welcome}>Bem-vindo à minha página sobre os</p>
            <h2 id="titulo-anos-90" className={s.wordart}>
              Anos 90
            </h2>
            <p className={s.tagline}>Caseiro, quadrado e cheio de avisos.</p>
            <p className={s.years}>1990 a 1999</p>

            <div className={s.rainbow} aria-hidden="true" />

            <p className={s.construction}>
              <span>Página em construção</span>
            </p>

            <div className={s.table}>
              <div className={s.sideMenu} aria-hidden="true">
                <span>Início</span>
                <span>Como era</span>
                <span>Minhas fotos</span>
                <span>Links legais</span>
                <span>Livro de visitas</span>
                <span>Fale comigo</span>
              </div>

              <div className={s.content}>
                <h3>Como era</h3>
                <p>
                  O computador virou coisa de casa, e a tela dele era cinza.
                  No Windows 95, cada botão tinha uma aresta clara e uma
                  escura para parecer em relevo. Os próprios criadores
                  contaram que usaram sombras e arestas para marcar onde cada
                  coisa começava e terminava.
                </p>
                <p>
                  Muitos monitores mostravam só 256 cores. Para a cor não
                  mudar de um computador para outro, os sites usavam uma
                  paleta segura de 216 cores, puras e fortes. É por isso que a
                  internet da época parece pintada com canetinha.
                </p>
                <p>
                  Qualquer pessoa podia ter uma página pessoal, e quase todas
                  tinham as mesmas peças: fundo repetido como azulejo, placa
                  de "em construção" que nunca saía, contador de visitas,
                  livro de visitas e um anel de sites amigos, em que uma
                  página levava à próxima.
                </p>
              </div>
            </div>

            <div className={s.rainbow} aria-hidden="true" />

            <p className={s.counterLine}>
              Você é o visitante número
              <span className={s.counter} aria-label="1997">
                <span>0</span>
                <span>0</span>
                <span>1</span>
                <span>9</span>
                <span>9</span>
                <span>7</span>
              </span>
            </p>

            <div className={s.badges} aria-hidden="true">
              <span className={s.badgeBlue}>Feito à mão</span>
              <span className={s.badgeYellow}>Melhor em 800 × 600</span>
              <span className={s.badgeGreen}>Nada aqui pisca</span>
              <span className={s.badgeRed}>Assine o livro</span>
            </div>

            <p className={s.webring} aria-hidden="true">
              <span>&lt;&lt; Anterior</span>
              <strong>Anel de sites dos Anos 90</strong>
              <span>Próximo &gt;&gt;</span>
            </p>
          </div>

          <div className={s.statusBar} aria-hidden="true">
            <span>Concluído</span>
            <span>Internet</span>
          </div>
        </div>

        {/* ---------- Um objeto de verdade ---------- */}
        <Window
          title="Um objeto de verdade - Visualizador de imagens"
          heading="h3"
          className={s.viewer}
        >
          <figure className={s.real}>
            <div className={s.realPhoto}>
              <img
                src={macintosh}
                alt="Computador Macintosh bege dos anos 90, com monitor de tubo sobre a base, teclado e mouse de um botão."
                width="900"
                height="578"
                loading="lazy"
              />
            </div>
            <figcaption>
              <p className={s.realTag}>Isto é vintage: é mesmo da época, não uma releitura.</p>
              <p>
                Um Macintosh LC, de 1990. O computador de casa era uma caixa
                bege, de cantos retos, com uma tela pequena e funda. A cor
                ficava do lado de dentro.
              </p>
              <p className={s.credit}>
                Foto de Benoît Prieur, cedida ao domínio público, via Wikimedia
                Commons.
              </p>
            </figcaption>
          </figure>
        </Window>

        {/* ---------- Os ingredientes ---------- */}
        <h3 className={s.desktopLabel}>Os ingredientes</h3>

        <div className={s.windows}>
          <Window title="Paleta - Pintura" className={s.paint}>
            <div className={s.windowBody}>
              <div className={s.safeGrid} aria-hidden="true">
                {SAFE_COLORS.map((color) => (
                  <span key={color} style={{ background: color }} />
                ))}
              </div>
              <p>
                As 216 cores seguras: seis níveis de vermelho, de verde e de
                azul, combinados entre si.
              </p>
              <ul className={s.named}>
                {NAMED_COLORS.map((item) => (
                  <li key={item.name}>
                    <span style={{ background: item.color }} />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Window>

          <Window title="Letras - Fontes" className={s.fonts}>
            <ul className={s.fontList}>
              {FONTS.map((font) => (
                <li key={font.sample}>
                  <span className={s[font.className]}>{font.sample}</span>
                  <span>{font.note}</span>
                </li>
              ))}
            </ul>
          </Window>

          <Window title="Formas e material - Propriedades" className={s.props}>
            <div className={s.windowBody}>
              <ul className={s.shapes}>
                <li>
                  <span className={s.button} aria-hidden="true">
                    OK
                  </span>
                  <span>Botão em relevo: claro em cima, escuro embaixo.</span>
                </li>
                <li>
                  <span className={s.field} aria-hidden="true">
                    texto
                  </span>
                  <span>Campo afundado: o relevo ao contrário.</span>
                </li>
                <li>
                  <span className={s.miniBar} aria-hidden="true" />
                  <span>Barra de título, em toda janela.</span>
                </li>
                <li>
                  <span className={s.tile} aria-hidden="true" />
                  <span>Fundo repetido como azulejo.</span>
                </li>
              </ul>
              <p className={s.material}>
                <strong>Material:</strong> o pixel. Tudo é feito de
                quadradinhos visíveis, sem curvas suaves nem sombras macias.
              </p>
            </div>
          </Window>

          <Window title="leia-me.txt - Bloco de notas" heading="h3" className={s.notepad}>
            <div className={s.note}>
              <p>UMA PEÇA DA ÉPOCA</p>
              <p>
                A peça deste capítulo é a própria página pessoal aí em cima,
                dentro da janela do navegador.
              </p>
              <p>
                Repare no título colorido e com volume, no fundo de estrelas
                que se repete, nas réguas de arco-íris, na faixa de "em
                construção", no contador e nos selos do rodapé.
              </p>
              <p>
                A diferença para uma página de verdade da época: aqui o texto
                está em tamanho confortável e nada pisca.
              </p>
            </div>
          </Window>
        </div>
      </div>

      {/* A barra de tarefas, no pé da área de trabalho. */}
      <div className={s.taskbar} aria-hidden="true">
        <span className={s.start}>Iniciar</span>
        <span className={s.task}>Navegador</span>
        <span className={s.task}>Pintura</span>
        <span className={s.task}>Fontes</span>
        <span className={s.clock}>23:59</span>
      </div>
    </section>
  )
}
