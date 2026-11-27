import { useId } from 'react'
import RelatedLinks from '../../../../shared/RelatedLinks.jsx'
import { SITE_TYPES, VERDICTS } from '../../../../shared/siteTypes.js'
import page from '../styles.module.css'
import styles from './resumo.module.css'

/*
 * Na prática: onde a regra serve, quanto custa e de onde vem, num bloco só,
 * dividido em 60-30-10 pela área. O assunto mais longo fica no campo maior;
 * o mais curto, no menor.
 */

// O veredito para cada tipo de site, com o porquê em uma frase.
const WHERE = {
  ecommerce: ['ok', 'O destaque fica só em comprar; as fotos já trazem cor.'],
  landing: ['ok', 'Um objetivo, um destaque.'],
  dashboard: ['warn', 'Gráficos e avisos de erro pedem cores próprias.'],
  app: ['ok', 'Na tela pequena, uma única cor marca a ação principal.'],
  blog: ['ok', 'Fundo calmo para ler; destaque nos links.'],
  portfolio: ['warn', 'O trabalho mostrado já tem cor; a interface recua.'],
}

export function NaPratica() {
  const titleId = useId()

  return (
    <section className={page.band} aria-labelledby={titleId}>
      <div className={page.block}>
        <h2 id={titleId} className={page.sectionTitle}>
          Na prática
        </h2>

        <div className={page.comp}>
          <div className={page.comp60}>
            <h3 className={page.compTitle}>Onde serve</h3>
            <p className={page.compText}>
              Em quase todo site. A regra organiza a interface; fotos, ilustrações e gráficos
              são conteúdo e ficam fora da conta.
            </p>
            <ul className={styles.where}>
              {SITE_TYPES.map((type) => {
                const [verdict, why] = WHERE[type.id]
                return (
                  <li key={type.id}>
                    <h4>{type.label}</h4>
                    <p className={styles.verdict} data-verdict={verdict}>
                      <span className={styles.mark} aria-hidden="true" />
                      {VERDICTS[verdict]}
                    </p>
                    <p className={styles.why}>{why}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={page.comp30}>
            <h3 className={page.compTitle}>Quanto custa</h3>
            <dl className={styles.costs}>
              <div>
                <dt>Leitura</dt>
                <dd>
                  É onde se erra. Cerca de um em cada doze homens não distingue bem as cores,
                  então o destaque nunca é o único sinal: o botão tem texto, o link tem
                  sublinhado.
                </dd>
              </div>
              <div>
                <dt>Produção</dt>
                <dd>Barata. Difícil é escolher as três cores.</dd>
              </div>
              <div>
                <dt>Durabilidade</dt>
                <dd>A proporção não envelhece; a paleta da moda, sim.</dd>
              </div>
              <div>
                <dt>Velocidade</dt>
                <dd>Nenhum custo: cor não pesa.</dd>
              </div>
            </dl>
          </div>

          <div className={page.comp10}>
            <h3 className={page.compTitle}>De onde vem</h3>
            <p className={page.compText}>
              Da decoração: paredes, sofá, almofadas. Em 1961 Johannes Itten deu a teoria; em
              2014 o Google a levou aos aplicativos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ParaIrAlem() {
  const titleId = useId()

  return (
    <section className={page.band} aria-labelledby={titleId}>
      <div className={page.block}>
        <h2 id={titleId} className={page.sectionTitle}>
          Para ir além
        </h2>
        <RelatedLinks
          className={styles.related}
          items={[
            { to: 'cores/harmonias', why: 'Quais cores combinam entre si.' },
            { to: 'cores/psicologia-das-cores', why: 'O que cada cor diz sozinha.' },
            { to: 'cores/construindo-uma-paleta', why: 'Os tons de cada um dos três papéis.' },
            { to: 'cores/contraste-e-leitura', why: 'Como garantir que o destaque seja legível.' },
          ]}
        />
      </div>
    </section>
  )
}
