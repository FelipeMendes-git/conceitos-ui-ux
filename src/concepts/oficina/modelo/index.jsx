import ConceptPage from '../../../shared/ConceptPage.jsx'
import Section from '../../../shared/Section.jsx'
import VerdictTable from '../../../shared/VerdictTable.jsx'
import './theme.css'
import styles from './styles.module.css'

/*
 * TELA-MODELO
 *
 * Não é um conceito do guia: é o molde das telas e a prova de que a casca
 * funciona (o menu muda de pele ao entrar aqui). Só aparece em desenvolvimento.
 *
 * Para criar uma tela nova:
 *   1. Copie esta pasta para src/concepts/<categoria>/<slug>/.
 *   2. Em theme.css, troque 'modelo' pelo slug e defina a pele.
 *   3. Escreva o conteúdo de cada seção a partir da spec da tela.
 * A tela entra no menu sozinha, desde que o slug esteja em src/app/catalog.js.
 */

// As dez seções de toda tela, na ordem. O texto diz o que cada uma deve conter.
const SECTIONS = [
  {
    title: 'O que é',
    text: 'Duas ou três frases, sem jargão. Depois, de onde o conceito veio: quando surgiu, quem popularizou, a que ele reagiu.',
  },
  {
    title: 'O que não é',
    text: 'As confusões mais comuns, mostradas lado a lado. Quem lê deve sair sabendo distinguir o conceito dos seus vizinhos.',
  },
  {
    title: 'Anatomia',
    text: 'As peças visuais que produzem o efeito, uma por vez, descritas pelo que se vê. O ideal é poder ligar e desligar cada peça.',
  },
  {
    title: 'Laboratório',
    text: 'Pelo menos um exemplo em que a pessoa mexe em controles com nomes de design e observa o resultado mudar. Nenhum código na tela.',
  },
  {
    title: 'O que comunica',
    text: 'A sensação que o conceito passa, a mensagem que manda ao visitante e o tipo de marca com que combina (e com que não combina).',
  },
]

const SECTIONS_AFTER_TABLE = [
  {
    title: 'Quanto custa',
    text: 'Em linguagem de quem decide: deixa o site mais lento? Prejudica a leitura? É trabalhoso de produzir? Vai parecer datado em dois anos?',
  },
  {
    title: 'No mundo real',
    text: 'Empresas e produtos conhecidos que usam o conceito, e a história de como chegaram a ele. Sempre vindos da pesquisa, nunca de memória.',
  },
  {
    title: 'Para ir além',
    text: 'Links para as telas de conceitos relacionados ou que costumam ser confundidos com este.',
  },
]

// Exemplo de preenchimento da tabela "Onde aplicar".
const EXAMPLE_VERDICTS = {
  ecommerce: { verdict: 'warn', why: 'Exemplo de veredito com ressalvas e sua justificativa.' },
  landing: { verdict: 'ok', why: 'Exemplo de veredito positivo e sua justificativa.' },
  dashboard: { verdict: 'warn', why: 'Cada linha explica o porquê em uma ou duas frases.' },
  app: { verdict: 'ok', why: 'Os seis tipos de site são sempre os mesmos, em todas as telas.' },
  blog: { verdict: 'avoid', why: 'Exemplo de veredito negativo e sua justificativa.' },
  portfolio: { verdict: 'ok', why: 'O veredito usa símbolo e texto, não só cor.' },
}

function pad(number) {
  return String(number).padStart(2, '0')
}

export default function Modelo() {
  return (
    <>
      {/* Fundo de janela inteira. Por ter posição fixa, ele se estende também
          por trás do menu; é assim que uma tela pinta a janela toda. */}
      <div className={styles.grid} aria-hidden="true" />

      <ConceptPage lede="O molde de todas as telas do guia. A abertura já é o conceito aplicado: aqui, uma planta de construção.">
        {SECTIONS.map((section, index) => (
          <Section
            key={section.title}
            number={pad(index + 1)}
            title={section.title}
            className={styles.sheet}
          >
            <p>{section.text}</p>
          </Section>
        ))}

        <Section number={pad(SECTIONS.length + 1)} title="Onde aplicar" className={styles.sheet}>
          <p>
            O veredito para cada tipo de site, com o porquê. A tabela é uma peça
            pronta: basta preencher.
          </p>
          <VerdictTable verdicts={EXAMPLE_VERDICTS} className={styles.table} />
        </Section>

        {SECTIONS_AFTER_TABLE.map((section, index) => (
          <Section
            key={section.title}
            number={pad(SECTIONS.length + 2 + index)}
            title={section.title}
            className={styles.sheet}
          >
            <p>{section.text}</p>
          </Section>
        ))}
      </ConceptPage>
    </>
  )
}
