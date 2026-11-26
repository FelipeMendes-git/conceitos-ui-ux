# SPEC-101 · Glassmorphism

| | |
|---|---|
| **Categoria / menu** | Estilos visuais |
| **Slug / rota** | `/estilos/glassmorphism` |
| **Pasta** | `src/concepts/estilos/glassmorphism/` |
| **Status** | 🚀 pronta: validada pelo autor em 2026-11-25 como régua de qualidade para as demais telas |
| **Depende de** | SPEC-000 |
| **Relacionadas** | SPEC-104 Neumorphism, SPEC-111 Aurora e gradientes, SPEC-407 Profundidade, SPEC-307 Contraste e leitura |

## 1. Objetivo de aprendizado

Ao sair desta tela, o leitor consegue:

- Reconhecer glassmorphism em um site ou aplicativo e diferenciá-lo de simples transparência.
- Nomear as cinco peças visuais que produzem o efeito.
- Dizer que sensação o estilo passa e para que tipo de marca combina.
- Decidir onde o estilo ajuda e onde prejudica a leitura.

## 2. O conceito

### O que é
Um estilo em que as superfícies parecem placas de vidro fosco flutuando sobre um fundo colorido. O que está atrás do painel continua visível, mas borrado, o que dá sensação de profundidade e de camadas sem esconder o contexto.

### O que não é
- **Não é só transparência.** Um painel apenas transparente deixa o fundo nítido atrás do texto e a leitura fica ruim. O que faz o vidro é o **desfoque do que está atrás**.
- **Não é um painel borrado.** No vidro, o conteúdo do painel continua nítido; quem fica desfocado é o fundo.
- **Não é neumorphism.** O neumorphism é opaco e simula relevo em uma única superfície; o glassmorphism é translúcido e simula camadas separadas.
- **Não funciona sobre fundo liso.** Sem cor ou forma atrás, não há o que desfocar e o painel vira um retângulo acinzentado.

### De onde vem
A ideia aparece no Windows Vista (2007), volta com o iOS 7 (2013) e o macOS Big Sur (2020), e ganha o nome "glassmorphism" em 2020, com o designer Michal Malewicz. Em 2025 a Apple transforma o vidro na linguagem visual de todos os seus sistemas, com o nome Liquid Glass.

O Liquid Glass é também o melhor caso de estudo do estilo. No lançamento (setembro de 2025) recebeu muitas críticas de usuários por texto difícil de ler e por lentidão nas animações. A Apple reduziu a transparência ainda nos testes, depois ofereceu uma opção para o usuário deixar o vidro mais sólido e, em junho de 2026, anunciou que estava refazendo a base do efeito "para garantir a leitura", com um controle que vai do vidro totalmente claro ao totalmente tingido. Lição: nem a empresa que popularizou o estilo escapou do seu principal risco.

### O que comunica
- **Sensações:** modernidade, leveza, tecnologia, sofisticação. O vidro sugere um produto atual e bem acabado.
- **Combina com:** tecnologia, fintechs, aplicativos de música e clima, produtos digitais que querem parecer premium.
- **Não combina com:** marcas que precisam passar tradição e solidez (advocacia, bancos tradicionais), ou sites cujo conteúdo é texto longo.
- **Risco de imagem:** usado em tudo, vira "modelo pronto de 2021". Funciona melhor como destaque do que como regra.
- **Onde o estilo está hoje (2026):** deixou de ser novidade e virou recurso estabelecido, muito associado à Apple. A versão atual é mais contida: desfoque discreto, bom contraste, aplicado em poucos elementos. A recomendação do Nielsen Norman Group vai na mesma direção: funciona em pequenas doses.

### Onde aplicar, por tipo de site

Regra geral: o vidro serve para elementos que **flutuam sobre conteúdo** (barras, janelas, cartões sobre imagem) e atrapalha onde há texto denso ou fundo imprevisível. É um tempero, não o prato: aplicar no elemento mais importante da tela e deixar o resto sólido.

A pesquisa confirma o uso atual em painéis de SaaS, sobreposições em apps de celular e landing pages de produtos premium. Para e-commerce não apareceu nenhuma loja conhecida usando o estilo na vitrine, o que reforça a ressalva. Os vereditos abaixo são avaliação nossa a partir dessas fontes, não uma classificação oficial.

| Tipo de site | Veredito | Por quê |
|---|---|---|
| E-commerce | ⚠️ com ressalvas | Bom na barra de navegação fixa e no carrinho flutuante sobre fotos. Ruim na vitrine e no checkout: a foto do produto e o botão de comprar precisam de contraste máximo, e muita gente compra de celulares simples. |
| Landing page | ✅ bom | Pouco texto, muito impacto visual. Funciona na abertura e em cartões de destaque sobre fundo colorido; um bom uso é destacar só o cartão da oferta principal. |
| Dashboard / SaaS | ⚠️ com ressalvas | É comum em painéis de SaaS, mas dados densos pedem superfícies sólidas. Reservar para o que se sobrepõe: janelas, menus, painéis laterais. |
| App mobile | ✅ bom | É a linguagem nativa do iPhone em barras e painéis. Testar em celulares de entrada. |
| Blog / editorial | ❌ evitar | Leitura longa sobre fundo translúcido cansa; no máximo no cabeçalho fixo. |
| Portfólio | ✅ bom | Mostra domínio visual e o conteúdo é curto. |

### Quanto custa

| Custo | Avaliação |
|---|---|
| Velocidade do site | Não aumenta o tempo de carregamento. O custo aparece na fluidez: desfocar o fundo exige trabalho do aparelho a cada movimento. Um ou dois painéis não se notam; muitos painéis grandes sobre fundo animado deixam a rolagem travada em celulares simples. |
| Leitura e acessibilidade | É o maior risco. A cor atrás do texto muda conforme o fundo, então a mesma frase pode estar legível em um ponto e ilegível em outro. |
| Produção | Rápido de fazer, trabalhoso de fazer bem: precisa de um fundo pensado para o efeito e de teste de leitura em vários pontos. |
| Durabilidade | Boa na versão discreta, ruim na exagerada. O estilo já teve auges em 2013 e 2020-21 e voltou com força em 2025; hoje é tratado como recurso estabelecido, mas os painéis carregados de vidro de 2021 já parecem datados. |

## 3. Anatomia visual

| Peça | O que se vê | Papel | Sem ela |
|---|---|---|---|
| Fundo vivo | Gradiente, manchas de cor ou imagem atrás do painel | Dá ao vidro algo para desfocar | O painel parece um cinza chapado |
| Preenchimento translúcido | Uma película clara, quase transparente, sobre o painel | Tinge o vidro e separa o painel do fundo | O painel some |
| Desfoque do fundo | Tudo o que passa atrás do painel fica borrado | É o efeito fosco; garante a leitura | Vira transparência comum, texto ilegível |
| Borda de luz | Uma linha fina e clara no contorno | Simula a aresta do vidro pegando luz; define a forma | O painel perde o contorno |
| Sombra suave | Uma sombra larga e leve embaixo | Descola o painel do fundo | Parece pintado no fundo, não flutuando |

Complementos: cantos bem arredondados (vidro com quina viva parece janela, não interface) e um leve reforço na vivacidade das cores desfocadas, que tendem a ficar acinzentadas.

## 4. Autoaplicação

### Como a página pratica o conceito
- O fundo da página inteira é um gradiente escuro com três ou quatro manchas de cor grandes e desfocadas que se movem lentamente — é o "fundo vivo" da anatomia.
- **Todo** bloco de conteúdo é um painel de vidro. O leitor aprende sobre glassmorphism dentro de glassmorphism.
- Painéis em níveis diferentes têm desfoque e transparência diferentes, mostrando hierarquia por camadas.

### Como cada exemplo demonstra a si mesmo
Cada peça da anatomia é explicada em um painel onde só aquela peça está em destaque; o cartão "o que não é: só transparência" é, ele mesmo, só transparente e difícil de ler.

### Pele do menu
O menu vira uma placa de vidro flutuante, descolada das bordas da janela, com cantos arredondados. É mais discreto que os painéis de conteúdo (mais transparente, mais desfocado), porque o menu é apoio, não protagonista.

## 5. Seções da tela

1. **Abertura** — título grande dentro de um painel de vidro, com as manchas de cor passando atrás. Frase: "Superfícies de vidro fosco que deixam o contexto aparecer."
2. **O que é** — texto curto + linha do tempo compacta (2007 → 2013 → 2020 → 2025).
3. **O que não é** — três cartões lado a lado sobre o mesmo fundo: *só transparente*, *painel borrado*, *vidro de verdade*. A diferença salta aos olhos.
4. **Anatomia** — um painel de vidro com cinco interruptores, um por peça. Desligar cada um mostra o que ele faz.
5. **Laboratório** — ver seção 6.
6. **O que comunica** — as sensações, com três marcas fictícias lado a lado: uma em que o vidro combina (app de música), uma neutra, uma em que destoa (escritório de advocacia).
7. **Onde aplicar** — seis mini-maquetes em vidro, uma por tipo de site, cada uma com seu veredito. O leitor vê o vidro funcionando na landing page e falhando no artigo.
8. **Quanto custa** — os quatro custos da tabela, em frases curtas.
9. **No mundo real** — ver seção 7.
10. **Para ir além** — links para Neumorphism, Aurora e gradientes, Contraste e leitura.

## 6. Laboratório

**Demo 1 — Construtor de vidro.** Controles deslizantes: desfoque, transparência, vivacidade das cores, brilho da borda, arredondamento. Um painel de exemplo reage em tempo real. Nenhum código é exibido. *Ensina:* a faixa em que o efeito funciona; fora dela vira transparência comum ou vira um painel branco sólido. O controle de transparência é o mesmo tipo de ajuste que a Apple acabou entregando aos usuários em 2026, e a tela faz essa ligação.

**Demo 2 — O fundo importa.** Botões trocam o fundo atrás do mesmo painel: liso, gradiente suave, manchas de cor, foto movimentada. *Ensina:* o vidro depende do que está atrás.

**Demo 3 — Dá para ler?** O leitor arrasta o painel sobre regiões claras e escuras do fundo e um indicador mostra "fácil de ler", "no limite" ou "difícil de ler". *Ensina:* a legibilidade no vidro não é fixa.

## 7. No mundo real

- **Apple (iPhone, iPad, Mac):** o exemplo central. Pastas, notificações e barras em vidro há anos; desde 2025, o Liquid Glass em todo o sistema.
- **O caso Liquid Glass (2025-2026):** apresentado como uma pequena linha do tempo — lançamento, críticas de leitura, opção de vidro mais sólido, reformulação anunciada em 2026. É a prova prática da seção "Quanto custa".
- **Microsoft (Windows 11):** dois materiais. O Acrílico é o vidro fosco, e a orientação da própria Microsoft é usá-lo só em superfícies passageiras, como menus; para o fundo das janelas existe o Mica, que é opaco. É a regra das pequenas doses escrita por quem faz o sistema.
- **Onde procurar mais:** painéis de SaaS, landing pages de produtos de tecnologia, sobreposições em apps de celular. Nenhuma marca específica além da Apple apareceu de forma consistente nas fontes, então a tela não cita outras pelo nome.

## 8. Acessibilidade

- O texto se mantém legível em qualquer posição do fundo, garantido por uma película mínima no painel.
- Quem pediu menos movimento no aparelho vê o fundo parado.
- A tela tem um botão visível "vidro mais sólido", que deixa todos os painéis quase opacos. Ele existe porque a preferência de "reduzir transparência" do aparelho ainda não chega ao site em todos os navegadores, e porque é exatamente a saída que a Apple adotou. A tela conta isso ao leitor, em linguagem simples.
- Toda a tela funciona só com teclado, com indicação visível de onde está o foco.

## 9. Critérios de aceite

Marcados os que Claude conferiu no navegador em 2026-11-25. A validação final é do autor.

- [x] Nenhum código ou termo de programação aparece na tela.
- [x] O menu aparece como vidro fosco nesta tela e volta ao estilo de outra tela ao navegar.
- [x] Todo o conteúdo está em painéis de vidro sobre fundo com cor em movimento.
- [x] A seção "O que não é" mostra os três cartões comparativos sobre o mesmo fundo.
- [x] Os cinco interruptores da anatomia ligam e desligam cada peça individualmente.
- [x] O construtor atualiza o painel em tempo real, com controles nomeados em linguagem de design.
- [x] A seção "O que comunica" mostra as sensações e os exemplos de marca.
- [x] A seção "Onde aplicar" mostra os seis tipos de site, cada um com maquete e veredito.
- [x] A seção "Quanto custa" cobre velocidade, leitura, produção e durabilidade.
- [ ] O texto de corpo é legível em qualquer posição do fundo (contraste mínimo 4,5:1). *(calculado em mais de 7:1 no pior caso; não medido com ferramenta)*
- [x] A seção "No mundo real" conta o caso Liquid Glass em linha do tempo.
- [x] O botão "vidro mais sólido" deixa todos os painéis quase opacos.
- [ ] Com a preferência de menos movimento ativa, o fundo fica parado. *(implementado, não testado)*
- [ ] Em navegador sem suporte ao desfoque, o conteúdo continua legível. *(implementado, não testado)*
- [ ] Toda a tela é navegável por teclado, com foco visível sobre o vidro. *(controles são botões e campos nativos; não testado tecla a tecla)*
- [x] A pasta não importa nada de outro conceito.

## 10. Roteiro de explicação (aula antes de construir)

1. **Camadas e profundidade** — por que interfaces simulam "coisas em cima de coisas" e o que o vidro comunica que uma sombra sozinha não comunica.
2. **Transparência × desfoque** — a diferença entre ver através e ver através de um vidro fosco, e por que só a segunda permite ler.
3. **As cinco peças**, uma por vez, na ordem da anatomia.
4. **O que o estilo comunica** — sensações, setores que combinam, o risco de parecer modelo pronto.
5. **Onde aplicar** — percorrer os seis tipos de site e o critério por trás dos vereditos: quantidade de texto, previsibilidade do fundo, aparelhos do público.
6. **Quanto custa** — fluidez, leitura, produção, durabilidade.
7. **O caso Liquid Glass** — o que a Apple lançou em 2025, por que foi criticada, o que mudou até 2026 e o que isso ensina sobre usar vidro em pequenas doses.

## 11. Protótipo de direção visual

**Direção visual:** vidro claro, não o vidro escuro e neon que virou clichê do estilo em 2021.

- **Fundo:** papel frio quase branco com quatro círculos grandes de cor chapada (coral, âmbar, azul-cobalto, verde-água) que se movem devagar. Círculos de contorno nítido, e não manchas difusas, deixam evidente o que o vidro faz: a forma é nítida fora do painel e fosca atrás dele.
- **Vidro:** película branca translúcida, desfoque forte, borda de luz branca, sombra azulada larga, cantos de 28px.
- **Texto:** azul-tinta quase preto. Sobre vidro claro o contraste fica acima de 7:1 mesmo quando o círculo mais escuro passa atrás, o que resolve o principal risco do estilo já na escolha da paleta.
- **Fonte:** Manrope em toda a tela, com título em peso leve e letras apertadas, na linha das interfaces de sistema que popularizaram o vidro.
- **Evitado de propósito:** gradiente roxo e rosa, fundo escuro com brilho neon, texto branco sobre vidro.

**O que entra no protótipo:** a pele (fundo e menu de vidro), a abertura, o botão "vidro mais sólido", a seção "O que é" com a linha do tempo e a seção "Anatomia" com os cinco interruptores.

**Aprovação:** direção aprovada pelo autor em 2026-11-25, sem ajustes.

## 12. Pesquisa e referências

**Pesquisado em:** 2026-11-25 (seis buscas na web; os resumos dos resultados foram lidos, os artigos não foram abertos um a um).

**O que a pesquisa confirmou ou mudou:**

- **Liquid Glass virou o fato central.** Lançado em setembro de 2025, foi criticado por leitura difícil e lentidão; a Apple reduziu a transparência, deu ao usuário a opção de vidro mais sólido e, na WWDC de junho de 2026, anunciou a reformulação da base do efeito e um controle de intensidade. As primeiras impressões do iOS 27 são positivas, mas vêm de poucos dias de uso de versão de testes.
- **Tendência ou datado?** Nem um nem outro: as fontes tratam o estilo como recurso estabelecido, na versão contida. Ressalva: quase todas são blogs de agências de design, com interesse comercial, então o consenso é mais fraco do que parece.
- **Nielsen Norman Group:** define o estilo pela translucidez que separa frente e fundo; recomenda pequenas doses e alerta para problemas de acessibilidade no exagero.
- **Onde é usado:** janelas, avisos, cartões flutuantes e navegação; comum em painéis de SaaS, sobreposições de apps e landing pages premium. Nenhuma loja virtual conhecida foi encontrada como exemplo.
- **Origem do nome:** as fontes atribuem o termo ao designer Michal Malewicz, em 2020. São fontes secundárias; o texto original dele não foi localizado.
- **Histórico:** Windows Vista (anunciado em 2006, lançado ao público em 2007) já teve queixas de texto difícil de ler; iOS 7 em 2013; macOS Big Sur em 2020.
- **Windows 11:** a documentação da Microsoft descreve o Acrílico como material translúcido reservado a superfícies passageiras e o Mica como material opaco para o fundo das janelas.
- **Ajuste da Apple:** o iOS 26.1, de 3 de novembro de 2025, trouxe a escolha entre vidro claro e tingido.

**Fontes:**

- [Microsoft Learn — Materials in Windows 11](https://learn.microsoft.com/windows/apps/design/signature-experiences/materials)
- [MacRumors — Apple lança o iOS 26.1](https://www.macrumors.com/2025/11/03/apple-releases-ios-26-1/)
- [TechCrunch — iOS 26.1 permite reduzir a transparência do Liquid Glass](https://techcrunch.com/2025/11/04/ios-26-1-lets-you-turn-down-liquid-glass-transparency)
- [Engadget — Liquid Glass e o Windows Vista](https://www.engadget.com/computing/apples-liquid-glass-is-windows-vista-done-well-181954910.html?src=rss)
- [Tuts+ — What is the glassmorphism web design trend](https://webdesign.tutsplus.com/what-is-the-glassmorphism-web-design-trend--cms-93333a)
- [Wikipedia — Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass)
- [Nielsen Norman Group — Glassmorphism](https://www.nngroup.com/articles/glassmorphism/)
- [MacRumors — críticas ao Liquid Glass no iOS 26](https://www.macrumors.com/2025/09/17/ios-26-liquid-glass-critiques/)
- [TechCrunch — Apple ajusta o Liquid Glass (jun. 2026)](https://techcrunch.com/2026/06/08/apple-is-tweaking-its-controversial-liquid-glass-design)
- [9to5Mac — iOS 27 e as correções do Liquid Glass](https://9to5mac.com/2026/06/12/ios-27-fixes-liquid-glass-and-not-just-with-a-slider/)
- [TechRepublic — transparência reduzida no beta 3 do iOS 26](https://www.techrepublic.com/article/news-apple-ios-26-beta-3-liquid-glass/)
- [Clay — Glassmorphism UI](https://clay.global/blog/glassmorphism-ui)
- [LogRocket — What is glassmorphism](https://blog.logrocket.com/ux-design/what-is-glassmorphism)
- [Setproduct — Liquid glass vs glassmorphism em 2026](https://setproduct.com/blog/liquid-glass-vs-glassmorphism)
- [Can I use — backdrop-filter](https://caniuse.com/backdrop-filter)
- [Chrome for Developers — prefers-reduced-transparency](https://developer.chrome.com/blog/css-prefers-reduced-transparency)
- [MDN — prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency)

## 13. Notas de implementação (não aparecem na tela)

- Desfoque do fundo com `backdrop-filter: blur()` combinado com `saturate()`. A propriedade é suportada por todos os navegadores atuais (Baseline desde setembro de 2024). O Safari exigiu o prefixo `-webkit-` até a versão 18, e há relato contestando que a 18 já aceite sem prefixo; por segurança, declarar as duas formas na mesma regra.
- `prefers-reduced-transparency` só é confiável no Chrome e no Edge (a partir da 118); o Safari não suporta e as fontes divergem sobre o Firefox. Usar como melhoria quando existir, e por isso a tela tem o botão "vidro mais sólido".
- Preenchimento com cor em canal alfa, não `opacity` (que deixaria o texto transparente também).
- Alternativa via `@supports` para navegadores sem `backdrop-filter`: preenchimento mais opaco.
- `prefers-reduced-motion` tratado no tema.
- Controles do construtor alteram variáveis CSS do painel.
- Performance: no máximo um nível de vidro sobre vidro; as manchas do fundo animam só `transform`.
- **Vidro dentro de vidro:** um elemento com `backdrop-filter` dentro de outro com `backdrop-filter` fez o conteúdo do painel externo desaparecer no navegador de teste. Solução adotada: nos painéis da página, película e desfoque ficam em um `::before` atrás do conteúdo, de modo que nenhum vidro é descendente de outro.

## 14. Notas pós-implementação

- **Fundo:** a spec previa manchas difusas sobre gradiente escuro. Ficou vidro claro sobre círculos de cor chapada e contorno nítido, decisão registrada e aprovada na seção 11.
- **Anatomia:** o interruptor "fundo vivo" apaga os círculos da página inteira, não só de um exemplo. Todo o vidro da tela perde o efeito junto, o que ensina mais.
- **"Dá para ler?":** em vez de arrastar o painel com o mouse, o leitor usa um controle deslizante, que funciona também por teclado e toque. Entrou um interruptor "película mais forte" para mostrar como se garante um piso de leitura.
- **"O fundo importa":** a opção "foto movimentada" virou "cheio de detalhes", feita com listras, porque o projeto não tem fotos.
- **Onde aplicar:** as seis maquetes são esquemáticas (blocos de cor, linhas no lugar de texto), mostrando onde o vidro entra em cada tipo de site.
- **No mundo real:** entrou a Microsoft, com fonte oficial. A terceira "marca neutra" de "O que comunica" virou um hortifrúti de bairro.
- **Para ir além:** virou peça comum (`src/shared/RelatedLinks.jsx`); telas ainda não construídas aparecem como texto com "em breve".
- **Peso:** a tela acrescenta cerca de 13 kB comprimidos ao que o visitante baixa, mais a fonte Manrope.
