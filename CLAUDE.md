# Conceitos UI/UX — regras do projeto

Guia visual e interativo de conceitos de design. Cada tela explica um conceito **e é construída com esse conceito**: a página de glassmorphism é feita em glassmorphism, a de minimalismo é minimalista.

**Para quem é:** alguém que quer entender design e **não programa** — designer iniciante, pessoa de marketing, empreendedor que vai contratar um site. O guia ensina a reconhecer estilos, escolher cores e fontes, entender que tipos de site existem e o que cada escolha visual comunica.

Projeto de portfólio, só front-end, publicado no GitHub. Conteúdo em pt-BR.

**Stack decidida:** React + Vite, JavaScript puro (JSX, sem TypeScript), CSS puro com CSS Modules (sem Tailwind, sem biblioteca de componentes, sem React Router: o roteador é próprio). Roda apenas localmente por enquanto (`npm run dev`); deploy na Vercel fica para depois.

**Bibliotecas:** o ideal é nenhuma além de React e Vite. Antes de instalar qualquer outra, explique ao usuário para que serve, por que não dá para fazer sem ela e quanto ela pesa, e espere a aprovação. Registre a decisão na spec da tela que a exige.

## Documentos de referência

- [docs/ARQUITETURA.md](docs/ARQUITETURA.md) — stack, estrutura de pastas, como o menu troca de estilo, anatomia das telas.
- [docs/specs/README.md](docs/specs/README.md) — o processo de spec-driven development.
- [docs/specs/ROADMAP.md](docs/specs/ROADMAP.md) — mapa de menus, submenus e status de cada spec.
- [docs/specs/_TEMPLATE.md](docs/specs/_TEMPLATE.md) — modelo de spec.

## Regras inegociáveis

1. **Uma spec = uma tela = um item de menu.** Nada é implementado sem spec aprovada pelo usuário.
2. **Pesquisar antes de implementar.** Antes de escrever ou implementar qualquer spec, faça uma pesquisa na web sobre o conceito para garantir que o conteúdo está atualizado: como o mercado usa hoje, exemplos reais recentes, se o estilo ainda é tendência ou já ficou datado, e o que mudou tecnicamente. Registre na spec a data da pesquisa e as fontes. Não ensine de memória o que pode ter mudado. Se a pesquisa registrada na spec for antiga quando a implementação começar, refaça.
3. **Ensinar antes de implementar.** O usuário está aprendendo design junto com o desenvolvimento. Antes de construir uma tela, explique no chat o conceito seguindo o "Roteiro de explicação" da spec: o que é, o que não é, por que funciona, o que comunica, onde serve. A aula é de **design**, em linguagem de design. Só implemente depois que o usuário disser que entendeu ou pedir para seguir. Tamanho de referência, aprovado pelo usuário: a aula de Glassmorphism — uma demonstração interativa para mexer antes de ler e cerca de sete blocos curtos seguindo o roteiro. **Não termine a aula com perguntas de fixação** nem peça ao usuário que responda algo para prosseguir.
4. **Design na tela, código no repositório.** Nenhuma tela mostra código, nomes de propriedades CSS, nomes de bibliotecas como instrução, nem jargão de programação. O efeito é explicado pelo que se vê: "o fundo atrás do painel fica desfocado", não `backdrop-filter`. O código existe e é bem organizado, mas vive só no repositório, para quem quiser abrir.
5. **Contexto de uso e de negócio.** Toda spec, toda aula e toda tela respondem, além de "o que é":
   - **De onde veio e quem usa?** Como o conceito surgiu, quem o popularizou, e empresas ou produtos conhecidos que o adotam hoje, com a história de como chegaram a ele quando houver (ex.: a Apple e o Liquid Glass). Sempre vindo da pesquisa; nunca cite uma empresa de memória.
   - **O que comunica?** A sensação e a mensagem que o conceito passa, e para que tipo de marca combina (marketing).
   - **Onde serve?** Avaliação por tipo de site: e-commerce, landing page, dashboard/SaaS, app mobile, blog/editorial, portfólio. Para cada um: funciona bem, funciona com ressalvas ou atrapalha, e por quê.
   - **Quanto custa?** Em linguagem de quem decide, não de quem programa: deixa o site mais lento? Prejudica a leitura? É caro de produzir? Vai parecer datado em dois anos? Os detalhes técnicos por trás (suporte de navegadores, peso, performance) ficam registrados na spec, na seção de notas de implementação.
6. **A tela pratica o que prega, em todos os níveis.** O visual da página é a aplicação do próprio conceito, e cada exemplo dentro dela demonstra a si mesmo: na tela de tipografia, o texto que explica uma fonte serifada é escrito nessa fonte serifada; na de harmonias de cores, o bloco que explica a harmonia complementar usa cores complementares. Se a spec não descreve como a página aplica o conceito em si mesma, a spec está incompleta.
7. **Código isolado por conceito.** Cada tela vive em sua própria pasta, com seus próprios estilos, sem depender do visual de outra tela.
8. **Código limpo e legível.** O repositório é parte do portfólio: nomes claros, comentários explicando o *porquê* das decisões visuais, sem abstrações espertas.
9. **Explicação técnica curta, só no chat.** Durante a implementação, ao usar uma técnica nova, uma frase dizendo o que ela faz basta. O foco do aprendizado do usuário é design; não transforme a implementação em aula de programação, a menos que ele peça.
10. **Cara de design, não de modelo pronto.** Cada tela tem direção visual própria, decidida na spec a partir da pesquisa e de referências reais do estilo. Evite os vícios de interface genérica: gradiente roxo, cartões arredondados com sombra para tudo, ícones e emojis decorativos, a mesma fonte em todas as telas. Depois de construir, olhe a tela no navegador e critique antes de entregar.
11. **Acessibilidade não é opcional.** Contraste suficiente para leitura, navegação por teclado, respeito a quem pede menos movimento. Quando o próprio estilo prejudica a acessibilidade (ex.: neumorphism), a tela diz isso explicitamente — faz parte do ensino.
12. **Sem backend.** Tudo estático; conteúdo em arquivos do repositório.
13. **Ordem livre.** As telas são desacopladas entre si, então o usuário escolhe qual construir a seguir conforme o que quer aprender. Não imponha nem sugira uma sequência. A única exceção é a SPEC-000 (casca da aplicação), que precisa existir antes de qualquer tela porque é ela que fornece o menu e as rotas.

14. **Protótipo de direção visual antes da tela completa.** Toda tela é construída em duas etapas. Primeiro o protótipo, já no código real e na pasta definitiva: a pele (fundo, cores, fontes, menu), a abertura e uma seção representativa, de preferência a interativa. O usuário olha no navegador e aprova ou ajusta a direção. Só depois entram as demais seções. O motivo: a direção visual é a parte mais cara de mudar, e todas as seções dependem dela. Não se faz protótipo em ferramenta separada nem em imagem, porque nada disso seria reaproveitado.

15. **A tela de Glassmorphism é a régua de qualidade.** O usuário a validou como "o padrão que espero para todas as telas". Antes de entregar uma tela nova, compare com ela (`src/concepts/estilos/glassmorphism/`): direção visual própria e justificada, nove seções completas, pelo menos três experiências interativas, exemplos visuais em "o que comunica" e "onde aplicar", fatos e empresas conferidos na pesquisa, tudo testado no navegador em janela larga e no celular.
16. **Um commit por tela.** Cada tela entra no repositório em um commit próprio, contendo a pasta da tela e a spec dela, com mensagem no formato `Tela de <nome> (SPEC-XXX)`. Mudanças na casca, nas peças comuns ou na documentação geral vão em commits separados. Só faça commit depois que o usuário validar a tela, e só envie ao GitHub quando ele pedir.

## Fluxo de trabalho por tela

1. O usuário escolhe uma tela do ROADMAP, ou propõe uma ideia nova (que entra no ROADMAP).
2. **Pesquisa** na web sobre o conceito (regra 2).
3. Escrever a spec a partir do template, com o resultado da pesquisa → usuário revisa.
4. **Aula** de design no chat (regras 3 e 5).
5. **Protótipo** (regra 14): copiar `src/concepts/oficina/modelo/` para a pasta da tela, definir a pele no `theme.css`, construir a abertura e uma seção representativa → usuário aprova a direção visual.
6. Construir as demais seções.
7. Usuário navega na tela e valida contra os critérios de aceite.
8. Atualizar o status no ROADMAP e a tabela de progresso do README.
9. Commit da tela (regra 16).

Repositório: https://github.com/FelipeMendes-git/conceitos-ui-ux (público).

## Convenções

- Idioma: textos da interface e documentação em pt-BR; identificadores de código em inglês.
- Arquivos de componente em `.jsx`, demais em `.js`.
- Slugs em kebab-case sem acento (`glassmorphism`, `regra-60-30-10`).
- Ideias novas do usuário vão primeiro para a seção "Ideias" do ROADMAP, depois viram spec.
