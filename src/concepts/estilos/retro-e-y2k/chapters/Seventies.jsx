import atari from '../images/anos-70-atari-2600.jpg'
import s from './seventies.module.css'

/*
 * ANOS 70: um anúncio de revista.
 *
 * Papel creme, tinta marrom, letras gordas e apertadas, arcos e uma faixa de
 * listras que faz curva. Todo capítulo tem as mesmas quatro partes: a capa,
 * "Como era", "Os ingredientes" e "Uma peça da época".
 */

const PALETTE = [
  { name: 'Creme', where: 'O papel de fundo', color: '#f3e4c4' },
  { name: 'Dourado', where: 'Geladeiras e fogões', color: '#dba032' },
  { name: 'Abacate', where: 'A cor da cozinha', color: '#6f7f2e' },
  { name: 'Laranja queimado', where: 'Tapetes e sofás', color: '#c9531c' },
  { name: 'Ferrugem', where: 'Títulos e capas', color: '#a8400f' },
  { name: 'Marrom', where: 'O lugar do preto', color: '#4b2a17' },
]

export default function Seventies() {
  return (
    <section id="anos-70" data-chapter="70" className={s.chapter} aria-labelledby="titulo-anos-70">
      <div className={s.grain} aria-hidden="true" />

      {/* ---------- A capa ---------- */}
      <header className={s.cover}>
        <div>
          <p className={s.years}>1970 a 1979</p>
          <h2 id="titulo-anos-70" className={s.title}>
            Anos 70
          </h2>
          <p className={s.tagline}>Quente, macio e feito à mão.</p>
        </div>

        {/* Arcos encaixados: o arco-íris terroso da década. */}
        <div className={s.arches} aria-hidden="true">
          <span>
            <span>
              <span>
                <span />
              </span>
            </span>
          </span>
        </div>
      </header>

      {/* A faixa de quatro listras que atravessa a página fazendo curva. Nos
          anos 70 essas faixas eram pintadas em paredes inteiras. */}
      <svg className={s.ribbon} viewBox="0 0 1200 262" aria-hidden="true">
        <path d="M-10 30 H700 A80 80 0 0 1 780 110 A80 80 0 0 0 860 190 H1210" stroke="#a8400f" />
        <path d="M-10 48 H700 A62 62 0 0 1 762 110 A98 98 0 0 0 860 208 H1210" stroke="#c9531c" />
        <path d="M-10 66 H700 A44 44 0 0 1 744 110 A116 116 0 0 0 860 226 H1210" stroke="#dba032" />
        <path d="M-10 84 H700 A26 26 0 0 1 726 110 A134 134 0 0 0 860 244 H1210" stroke="#6f7f2e" />
      </svg>

      <div className={s.body}>
        {/* ---------- Como era ---------- */}
        <div className={s.story}>
          <h3 className={s.heading}>Como era</h3>
          <div className={s.columns}>
            <p>
              A década abriu com o primeiro Dia da Terra, em 1970, e a casa
              inteira foi atrás da natureza: geladeira verde-abacate, fogão
              dourado, tapete laranja queimado. Os tons de terra eram também
              uma resposta aos tons pastel da geração anterior.
            </p>
            <p>
              As letras engordaram e se apertaram. Os textos passaram a ser
              compostos por fotografia, no lugar das peças de metal, e isso
              deixava encostar uma letra na outra. Os títulos ficaram bem
              juntos, quase se tocando, como o desta página.
            </p>
            <p>
              Em 1970 surgiram duas famílias de letras que marcaram a década,
              a Avant Garde e a Souvenir. A Cooper Black, desenhada em 1922,
              virou a cara das capas de disco e das placas de loja.
            </p>
            <p>
              Listras de arco-íris apareciam em tudo, da roupa de ginástica ao
              logotipo da Apple de 1977. E existiu outra década de 70 ao mesmo
              tempo, a da discoteca, metálica e brilhante. Esta página fica
              com a terrosa.
            </p>
          </div>
        </div>

        {/* ---------- Um objeto de verdade ---------- */}
        <figure className={s.real}>
          <div className={s.realPhoto}>
            <img src={atari} alt="Videogame Atari preto, com uma faixa que imita madeira na frente, detalhes em laranja e um controle de alavanca." width="900" height="525" loading="lazy" />
          </div>
          <figcaption>
            <h3 className={s.realTitle}>Um objeto de verdade</h3>
            <p className={s.realTag}>Isto é vintage: é mesmo da época, não uma releitura.</p>
            <p>
              Um Atari, o videogame lançado em 1977; o aparelho da foto é de alguns anos depois. Repare na faixa que imita madeira e nos detalhes em laranja: até a tecnologia se vestia de tons de terra.
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
                <span className={s.chip} style={{ background: item.color }} />
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
                  <span className={s.fat} aria-hidden="true">
                    Aa
                  </span>
                  <span>Gorda, de pontas macias e arredondadas.</span>
                </li>
                <li>
                  <span className={s.tight} aria-hidden="true">
                    Juntinhas
                  </span>
                  <span>Apertada: as letras quase se tocam.</span>
                </li>
                <li>
                  <span className={s.swash} aria-hidden="true">
                    Curvas
                  </span>
                  <span>A itálica, cheia de curvas, para o apoio.</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={s.label}>Formas e material</h4>
              <ul className={s.shapes}>
                <li>
                  <span className={`${s.shape} ${s.shapeArch}`} aria-hidden="true" />
                  <span>Arcos encaixados</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeStripes}`} aria-hidden="true" />
                  <span>Listras em faixa</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeRays}`} aria-hidden="true" />
                  <span>Raios de sol</span>
                </li>
                <li>
                  <span className={`${s.shape} ${s.shapeGrain}`} aria-hidden="true" />
                  <span>Papel com grão de impressão</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- Uma peça da época ---------- */}
        <figure className={s.piece}>
          <h3 className={s.heading}>Uma peça da época</h3>

          <div className={s.pieceGrid}>
            <div className={s.poster}>
              <div className={s.rays} aria-hidden="true" />
              <p className={s.posterKicker}>Três dias de música ao ar livre</p>
              <p className={s.posterTitle}>Sol de Verão</p>
              <div className={`${s.arches} ${s.posterArches}`} aria-hidden="true">
                <span>
                  <span>
                    <span>
                      <span />
                    </span>
                  </span>
                </span>
              </div>
              <p className={s.posterFoot}>
                Sábado, 12 de janeiro de 1974
                <br />
                Parque da Lagoa, a partir das 16h
              </p>
              <span className={s.seal}>
                <span>
                  Entrada
                  <br />
                  franca
                </span>
              </span>
            </div>

            <figcaption>
              O cartaz de um festival inventado, com os ingredientes da década:
              título gordo e apertado, arcos, raios de sol, um selo em estrela e
              a segunda cor impressa um pouco fora do lugar.
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}
