# Arquitetura

Este documento é para quem clonou o repositório e quer entender como o código está organizado. Ele fala de código; **as telas do guia não falam**: lá tudo é explicado pelo que se vê.

## Stack

| Peça | Escolha | Por quê |
|---|---|---|
| Build | Vite | Rápido, zero configuração. |
| UI | React 19 | Requisito do projeto. |
| Linguagem | JavaScript puro (JSX) | Mais simples para quem abre o repositório. |
| Rotas | Roteador próprio (`src/app/router.jsx`, ~40 linhas) | A navegação é só "início + um endereço por tela"; o navegador já oferece o necessário e uma biblioteca seria peso sem ganho. |
| Fontes | Google Fonts, por uma linha no `index.html` | Fraunces, IBM Plex Sans e IBM Plex Mono são a pele padrão. Não é biblioteca, mas exige internet. Cada tela pode trocar as suas. |
| Estilos | CSS Modules + variáveis CSS | Cada tela tem uma linguagem visual diferente; CSS Modules impede que o estilo de uma vaze para outra. |
| Animação | GSAP 3, só na tela que fala dele (`concepts/movimento/gsap/`) | A tela é sobre a ferramenta e é feita com ela. Nas outras, transições em CSS. |
| Deploy | Vercel ([conceitos-ui-ux.vercel.app](https://conceitos-ui-ux.vercel.app/)); localmente, `npm run dev` | Site estático, sem servidor próprio. |

Deliberadamente **sem** Tailwind e **sem** biblioteca de componentes: um framework visual imporia um estilo único, e o projeto existe para mostrar estilos diferentes lado a lado.

As dependências instaladas são `react`, `react-dom`, `vite`, `@vitejs/plugin-react` e `gsap`. Nenhuma outra entra sem um bom motivo. O GSAP entrou com a tela que o explica; como cada tela é carregada à parte, só quem abre essa tela baixa a biblioteca (cerca de 80 kB comprimidos, junto com o código da própria tela), e a página inicial continua sem ela.

## Estrutura de pastas

```
index.html                  # página única; carrega as fontes padrão
src/
├── main.jsx                # ponto de entrada
├── app/                    # a casca
│   ├── App.jsx             # decide o que mostrar para cada endereço
│   ├── Shell.jsx           # layout: menu + conteúdo; gaveta no celular
│   ├── router.jsx          # roteador próprio (usePath, navigate, Link)
│   ├── catalog.js          # mapa do guia: categorias e telas (fonte do menu)
│   ├── pages.js            # descobre sozinho quais telas já têm pasta
│   ├── Menu/               # o menu, estilizado só por variáveis --menu-*
│   ├── Home/               # página inicial (provisória)
│   └── Placeholder.jsx     # "em breve" e "página não encontrada"
├── shared/                 # peças comuns a todas as telas
│   ├── base.css            # reset + pele padrão (todas as variáveis)
│   ├── ConceptPage.jsx     # moldura: cabeçalho e links anterior/próxima
│   ├── Section.jsx         # uma seção numerada
│   ├── VerdictTable.jsx    # tabela "onde aplicar" por tipo de site
│   ├── RelatedLinks.jsx    # lista "para ir além" (vira link quando a tela existir)
│   ├── siteTypes.js        # os seis tipos de site e os três vereditos
│   └── concept.module.css  # estrutura das três peças acima
└── concepts/               # UMA PASTA POR TELA
    ├── oficina/modelo/     # tela-modelo: o molde a copiar (só em desenvolvimento)
    │   ├── index.jsx           # a página
    │   ├── theme.css           # variáveis que vestem a página E o menu
    │   └── styles.module.css   # estilos próprios da página
    ├── estilos/
    │   └── glassmorphism/      # mesma estrutura, mais demos/ quando houver
    ├── tipografia/
    └── ...
```

A regra de dependência é de mão única: `concepts/*` importa de `shared/`, `shared/` importa de `app/` (catálogo e roteador), e um conceito **nunca** importa de outro. As peças de `shared/` são estruturais; quem dá a aparência é o tema de cada tela.

## Como o menu muda de estilo em cada tela

O menu é um componente só, estruturalmente igual em todas as telas (mesmos itens, mesma posição — consistência é um princípio de UX e não vamos quebrá-lo). O que muda é a **pele**.

1. O menu é estilizado apenas com variáveis CSS: `--menu-bg`, `--menu-border`, `--menu-blur`, `--menu-radius`, `--menu-shadow`, `--menu-font`, `--menu-inset`, etc. A lista completa, com os valores padrão, está em `src/shared/base.css`.
2. Cada conceito define essas variáveis no seu `theme.css`, sob um seletor `[data-concept="glassmorphism"]`.
3. O `Shell` coloca `data-concept="<slug>"` no elemento raiz ao trocar de rota.

Resultado: na tela de glassmorphism o menu vira vidro fosco; na de brutalismo ganha borda preta grossa e sombra dura — sem nenhum `if` no código do menu.

**Fundo de janela inteira.** Uma tela pode pintar a janela toda, inclusive atrás do menu, com um elemento de posição fixa (`position: fixed; inset: 0; z-index: -1`). Ele fica acima do fundo da casca e abaixo do menu. Com `--menu-inset` maior que zero o menu se descola das bordas e "flutua" sobre esse fundo. A tela-modelo demonstra os dois recursos.

## Anatomia comum de uma tela

Toda tela segue a mesma sequência, para que o leitor saiba onde encontrar cada coisa — o visual muda, a estrutura não. Tudo em linguagem de design, sem código.

1. **Abertura** — nome do conceito e uma frase que o define. A própria abertura já é o conceito aplicado.
2. **O que é** — explicação curta, com origem e contexto.
3. **O que não é** — confusões comuns e contraexemplos lado a lado.
4. **Anatomia** — as peças visuais que produzem o efeito, destacadas uma a uma e descritas pelo que se vê ("fundo desfocado", "borda de luz").
5. **Laboratório** — demo interativa: o leitor mexe em controles com nomes de design (desfoque, transparência, arredondamento) e vê o resultado. Nenhum código é exibido.
6. **O que comunica** — a sensação que o conceito passa, que tipo de marca combina com ele, que mensagem ele manda ao visitante.
7. **Onde aplicar** — avaliação por tipo de site (e-commerce, landing page, dashboard/SaaS, app mobile, blog/editorial, portfólio): onde funciona bem, onde funciona com ressalvas, onde atrapalha, e por quê.
8. **Quanto custa** — em linguagem de quem decide: deixa o site lento? Prejudica a leitura? É caro de produzir? Vai envelhecer rápido?
9. **No mundo real** — produtos e marcas conhecidos que usam o conceito.
10. **Para ir além** — conceitos relacionados (links para outras telas).

Nem toda tela usa todas as seções com o mesmo peso: uma tela de "Tipos de site" não tem a mesma anatomia que uma de estilo visual.

Dentro de cada seção vale a autoaplicação em nível de exemplo: cada item explicado é mostrado usando ele mesmo. Na tela de tipografia, o parágrafo sobre uma fonte é escrito nessa fonte; na de ritmo de animação, o cartão de cada curva se move com essa curva.

## Larguras de tela

Toda tela precisa funcionar do celular ao monitor largo. O conteúdo fica em uma coluna de largura máxima, no meio da área ao lado do menu: em janelas largas a sobra se divide entre os dois lados, em vez de ficar toda à direita. O texto continua alinhado à esquerda dentro da coluna.

A moldura comum (`ConceptPage`) já faz isso. Uma tela que queira fundos de ponta a ponta, como a de Retrô e Y2K, abre mão da largura máxima da moldura e passa a centralizar cada bloco por conta própria, sempre na mesma coluna, para que todos comecem na mesma linha vertical.

Abaixo de 900 px o menu vira uma gaveta e o conteúdo ocupa a janela inteira.

## Independência entre telas

As telas não dependem umas das outras: nenhuma importa código de outra, e os links "relacionados" para telas ainda não construídas simplesmente não aparecem. Por isso a ordem de construção é livre. A única dependência real é a casca (`src/app/`), que precisa existir primeiro.

## Catálogo e descoberta de telas

`src/app/catalog.js` lista todas as categorias e telas do guia, prontas ou planejadas. Menu, página inicial e links "anterior/próxima" saem dele.

`src/app/pages.js` procura as pastas `src/concepts/<categoria>/<slug>/index.jsx` e considera pronta toda tela que tiver a sua. Telas do catálogo sem pasta aparecem no menu apagadas, como "em breve".

Adicionar uma tela nova = copiar a pasta da tela-modelo para o lugar certo. Se a tela ainda não estiver no catálogo, acrescentar uma linha nele.
