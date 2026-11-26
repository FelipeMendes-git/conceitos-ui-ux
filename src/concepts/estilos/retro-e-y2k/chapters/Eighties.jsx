import vhs from '../images/anos-80-fita-vhs.jpg'
import s from './eighties.module.css'

/*
 * ANOS 80: uma fita de vídeo e a TV ligada à noite.
 *
 * Preto de tela com linhas de TV, neon, cromo, listras diagonais de caixa de
 * fita e uma grade deitada no chão. As mesmas quatro partes dos outros
 * capítulos: a capa, "Como era", "Os ingredientes" e "Uma peça da época".
 */

const PALETTE = [
  { name: 'Magenta', where: 'O neon principal', color: '#ff2e88' },
  { name: 'Ciano', where: 'Laser e letreiros', color: '#19e3ff' },
  { name: 'Amarelo', where: 'O brilho mais quente', color: '#ffd60a' },
  { name: 'Roxo', where: 'A sombra colorida', color: '#8a4bff' },
  { name: 'Rosa pastel', where: 'O lado Miami', color: '#ff9ccb' },
  { name: 'Azul-piscina', where: 'O lado Miami', color: '#45d9c8' },
]

export default function Eighties() {
  return (
    <section id="anos-80" data-chapter="80" className={s.chapter} aria-labelledby="titulo-anos-80">
      {/* ---------- A capa ---------- */}
      <header className={s.cover}>
        {/* As listras diagonais das caixas de fita. */}
        <div className={s.stripes} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <p className={s.years}>1980 a 1989</p>
        <h2 id="titulo-anos-80" className={s.title}>
          <span className={s.script}>Anos</span> <span className={s.chrome}>80</span>
        </h2>
        <p className={s.tagline}>Elétrico, noturno e exagerado.</p>

        {/* A grade deitada no chão, sumindo no horizonte. */}
        <div className={s.floor} aria-hidden="true" />
      </header>

      <div className={s.body}>
        {/* ---------- Como era ---------- */}
        <div className={s.story}>
          <h3 className={s.heading}>Como era</h3>

          <div className={s.storyGrid}>
            <div className={s.text}>
              <p>
                A MTV entrou no ar em 1981 com um logotipo que nunca era o
                mesmo: aparecia de tijolo, de pelúcia, de neon, de cromo. A
                regra da década estava dada. Mais brilho, mais cor, mais
                movimento.
              </p>
              <p>
                Neon, metal cromado e degradês feitos com aerógrafo davam a
                qualquer coisa um ar de alta tecnologia. As grades, vindas dos
                primeiros desenhos feitos em computador, completavam a ideia
                de futuro.
              </p>
              <p>
                E o computador chegou à mesa de quem desenhava. O Macintosh,
                de 1984, ganhou no ano seguinte um programa de montar páginas
                e uma impressora a laser. Pela primeira vez dava para compor
                uma página inteira na tela, sem tesoura nem cola.
              </p>
            </div>

            {/* O outro lado da década: o pastel de Miami. */}
            <aside className={s.miami}>
              <h4>O lado Miami</h4>
              <p>
                De dia, a década era pastel. A série Miami Vice, de 1984, tinha
                uma regra de figurino que resume a virada em relação aos anos
                70: nada de tons de terra, nada de cores primárias, só pastel.
                O rosa e o azul-piscina vinham dos prédios antigos da cidade.
              </p>
            </aside>
          </div>

          <ul className={s.warnings}>
            <li>
              <strong>Uma lembrança editada.</strong> O sol listrado sobre uma
              grade, que hoje resume os anos 80, foi desenhado depois. É um
              estilo dos anos 2000 e 2010, uma homenagem à década.
            </li>
            <li>
              <strong>Faltou um pedaço.</strong> O lado geométrico e colorido
              dos anos 80, com formas soltas e padrões, tem tela própria neste
              guia: Memphis.
            </li>
          </ul>
        </div>

        {/* ---------- Um objeto de verdade ---------- */}
        <figure className={s.real}>
          <div className={s.realPhoto}>
            <img src={vhs} alt="Fita de vídeo VHS preta, vista de cima, com os dois carretéis aparecendo pelas janelas transparentes." width="900" height="552" loading="lazy" />
          </div>
          <figcaption>
            <h3 className={s.realTitle}>Um objeto de verdade</h3>
            <p className={s.realTag}>Isto é vintage: é mesmo da época, não uma releitura.</p>
            <p>
              Uma fita de vídeo. Por fora, a tecnologia da década era sóbria: preta, retangular, cheia de ranhuras. A cor e o neon ficavam na caixa em que ela vinha, como a da peça da época, mais abaixo.
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
              <li key={item.name} style={{ '--tube': item.color }}>
                <span className={s.tube} />
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
                  <span className={s.neonType} aria-hidden="true">
                    Neon
                  </span>
                  <span>Tubo de neon: a letra feita de fios de luz.</span>
                </li>
                <li>
                  <span className={s.brushType} aria-hidden="true">
                    Pincel
                  </span>
                  <span>Letra de pincel, inclinada, por cima do título.</span>
                </li>
                <li>
                  <span className={s.chromeType} aria-hidden="true">
                    Cromo
                  </span>
                  <span>Itálica pesada, com reflexo de céu e de chão.</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={s.label}>Formas e material</h4>
              <ul className={s.shapes}>
                <li>
                  <span className={`${s.shape} ${s.shapeStripes}`} aria-hidden="true" />
                  <span>Listras diagonais</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeGrid}`} aria-hidden="true" />
                  <span>Grade em perspectiva</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeTriangles}`} aria-hidden="true" />
                  <span>Triângulos</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeScan}`} aria-hidden="true" />
                  <span>Linhas de TV e brilho de luz</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- Uma peça da época ---------- */}
        <figure className={s.piece}>
          <h3 className={s.heading}>Uma peça da época</h3>

          <div className={s.shelf}>
            {/* A caixa da fita. */}
            <div className={s.tape}>
              <span className={s.tapeSpine} aria-hidden="true">
                Rota Neon
              </span>
              <div className={s.tapeFront}>
                <div className={s.tapeStripes} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <p className={s.tapeStudio}>Vídeo Estrela apresenta</p>
                <p className={s.tapeTitle}>
                  <span className={s.tapeChrome}>Rota</span>
                  <span className={s.tapeScript}>Neon</span>
                </p>
                <div className={s.tapeFloor} aria-hidden="true" />
                <p className={s.tapeInfo}>
                  Colorido, 92 minutos
                  <br />
                  Som estéreo
                </p>
              </div>
            </div>

            {/* A tela da TV, com o aviso do videocassete no canto. */}
            <div className={s.tv}>
              <div className={s.screen}>
                <span className={s.osd}>Play ▸</span>
                <span className={s.counter}>0:00:00</span>
                <span className={s.tracking} aria-hidden="true" />
                <p className={s.screenText}>
                  Ajuste a imagem
                  <br />
                  com o botão do aparelho
                </p>
              </div>
              <div className={s.tvPanel} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <figcaption>
            A caixa de um filme inventado e a tela da TV ao lado. Repare no
            título cromado com a palavra de pincel por cima, nas listras
            diagonais, na grade ao fundo e nas linhas que atravessam a tela.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
