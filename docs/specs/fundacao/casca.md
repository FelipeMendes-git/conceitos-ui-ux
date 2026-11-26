# SPEC-000 · Casca da aplicação

| | |
|---|---|
| **Categoria** | Fundação |
| **Pasta** | `src/app/` e `src/shared/` |
| **Status** | 🚀 pronta |
| **Depende de** | nada |

Esta é a única spec que não descreve um conceito de design. Ela descreve a estrutura que todas as telas usam, por isso não segue o template das outras.

## 1. O que entrega

- Projeto Vite + React rodando localmente.
- Menu lateral com as categorias e telas do guia, que troca de aparência conforme a tela aberta.
- Navegação entre telas com endereço próprio para cada uma.
- Catálogo único de onde saem o menu e a página inicial.
- Peças comuns para montar uma tela: cabeçalho, seção, tabela "onde aplicar".
- Uma tela-modelo, visível só em desenvolvimento, que serve de molde para as próximas.
- Página inicial provisória com o mapa do guia (a definitiva é a SPEC-001).

## 2. Bibliotecas

Regra do projeto: o mínimo possível. Cada biblioteca precisa de justificativa.

| Biblioteca | Para quê | Dá para ficar sem? |
|---|---|---|
| `react`, `react-dom` | Montar a interface em componentes | Não; é a escolha do projeto. |
| `vite` | Servidor de desenvolvimento e empacotador | Não; é a escolha do projeto. |
| `@vitejs/plugin-react` | Faz o Vite entender JSX e atualizar a tela sem recarregar | Não; é o complemento oficial do Vite para React. |

**O que ficou de fora de propósito:**

- **React Router.** A navegação do guia é simples (uma página inicial e um endereço por tela), então um roteador próprio de cerca de 40 linhas resolve, usando o que o navegador já oferece. Se um dia surgirem rotas aninhadas ou carregamento de dados por rota, vale reconsiderar.
- **Biblioteca de ícones, de animação, de componentes.** Nada disso é necessário na casca. O GSAP entra só quando uma tela de movimento exigir, com sua própria justificativa na spec dela.

**Recurso externo que não é biblioteca:** as fontes padrão (Fraunces, IBM Plex Sans, IBM Plex Mono) são carregadas do Google Fonts por uma linha no `index.html`. Exige internet; se virar problema, os arquivos podem ser copiados para dentro do projeto.

## 3. Como o menu troca de pele

O menu é um componente só. Ele não sabe em que tela está; apenas usa variáveis de aparência. Cada tela redefine essas variáveis no seu `theme.css`.

| Variável | Controla | Padrão |
|---|---|---|
| `--page-bg`, `--page-fg`, `--page-muted`, `--page-accent`, `--page-rule` | Fundo, texto, texto secundário, destaque e linhas da página | papel claro, tinta escura, vermelho-telha |
| `--font-display`, `--font-body`, `--font-mono` | Fontes de título, texto e números | Fraunces, IBM Plex Sans, IBM Plex Mono |
| `--menu-bg`, `--menu-fg`, `--menu-muted`, `--menu-accent` | Cores do menu | derivadas do papel |
| `--menu-border`, `--menu-divider` | Contorno do menu e linha que o separa do conteúdo | sem contorno, linha fina à direita |
| `--menu-radius`, `--menu-shadow`, `--menu-blur` | Cantos, sombra e desfoque do que está atrás | retos, sem sombra, sem desfoque |
| `--menu-inset` | Distância entre o menu e as bordas da janela (um valor maior que zero faz o menu "flutuar") | 0 |
| `--menu-font`, `--menu-width` | Fonte e largura do menu | fonte de texto, 19rem |

A casca escreve o nome da tela aberta no elemento raiz (`data-concept="glassmorphism"`), e o `theme.css` de cada tela usa esse nome como seletor.

**Fundo de janela inteira:** uma tela pode pintar a janela toda, inclusive atrás do menu, colocando um elemento de posição fixa dentro dela. O menu fica sempre por cima. É o que permite ao menu de vidro desfocar as cores da página.

## 4. Catálogo e descoberta de telas

- `src/app/catalog.js` lista todas as categorias e telas do guia. É a única fonte do menu e da página inicial.
- Uma tela é considerada pronta quando existe `src/concepts/<categoria>/<slug>/index.jsx`. O projeto descobre isso sozinho; não há lista de telas prontas para manter.
- Telas ainda não construídas aparecem no menu como texto apagado, sem link.

Criar uma tela nova = criar a pasta. Se a tela ainda não estiver no catálogo, acrescentar uma linha nele.

## 5. Acessibilidade

- Link "Pular para o conteúdo" como primeiro elemento da página.
- Menu navegável por teclado; grupos abrem e fecham com Enter ou Espaço e anunciam seu estado.
- A tela atual é marcada no menu para leitores de tela.
- Ao trocar de tela, a rolagem volta ao topo e o foco vai para o conteúdo.
- No celular o menu vira uma gaveta que fecha com Esc, ao tocar fora ou ao escolher uma tela.
- Quem pede menos movimento não vê as transições.
- Os vereditos da tabela "onde aplicar" usam forma e texto, não só cor.

## 6. Critérios de aceite

Marcados os que Claude conferiu no navegador em 2026-11-25. A validação final é do autor.

- [x] `npm run dev` sobe o projeto sem erros no terminal nem no console do navegador.
- [x] A página inicial mostra o mapa do guia com todas as categorias.
- [x] O menu lista as 9 categorias; cada grupo abre e fecha.
- [x] Telas não construídas aparecem apagadas e não são clicáveis.
- [x] Abrir a tela-modelo muda a aparência do menu; voltar ao início restaura a aparência padrão.
- [x] O botão voltar do navegador funciona.
- [x] Um endereço inexistente mostra uma página de "não encontrada" com caminho de volta.
- [x] Em tela estreita o menu vira gaveta, abre pelo botão e fecha com Esc.
- [ ] Toda a casca é utilizável só com teclado, com foco sempre visível. *(implementado, não testado tecla a tecla)*
- [x] Nenhuma biblioteca além das três da seção 2 está instalada.
- [x] `npm run build` gera a versão de produção sem erros.

## 7. Pesquisa

**Pesquisado em:** 2026-11-25, direto no registro do npm.

- Vite 8.3.8, React 19.3.1 e `@vitejs/plugin-react` 6.3.0 são as versões atuais; o plugin 6 exige Vite 8.
- O Vite 8 exige Node 20.19+ ou 22.12+. Node instalado na máquina: 24.12.

## 8. Notas pós-implementação

- A tabela "onde aplicar" foi planejada em três colunas e ficou apertada em janelas médias. Passou a ter tipo de site e veredito na primeira linha e a justificativa embaixo, o que funciona em qualquer largura.
- A tela-modelo ganhou uma pele de planta de construção (blueprint), bem diferente da padrão, para que a troca de pele do menu ficasse evidente no teste.
- A categoria "Oficina" some do menu na versão publicada, mas o código da tela-modelo ainda é empacotado junto (cerca de 5 kB). Se incomodar, dá para excluí-la do empacotamento.
- A versão de produção inteira pesa cerca de 75 kB comprimida, quase tudo do próprio React.
