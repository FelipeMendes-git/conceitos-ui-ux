# Spec-driven development neste projeto

## A ideia

Em vez de sair codando, primeiro escrevemos um documento curto (a **spec**) dizendo o que a tela precisa ensinar, como ela vai se parecer e como saberemos que está pronta. O código só começa depois que a spec é aprovada.

Aqui a spec tem um papel a mais: ela é também o **plano de aula**. Cada spec contém um roteiro do que precisa ser explicado ao autor do projeto antes da implementação, porque o objetivo é aprender os conceitos enquanto o guia é construído.

## Unidade

**Uma spec = uma tela = um item de menu.**

- A tela de Glassmorphism é uma spec. A de Skeleton é outra.
- A fundação (casca, menu, rotas) é a `SPEC-000`, a única que não corresponde a um conceito.
- Se um conceito ficar grande demais para uma tela, ele é dividido em duas specs (dois itens de menu), nunca uma spec com duas telas.

## Ciclo de vida

| Status | Significado |
|---|---|
| 💡 ideia | Está no ROADMAP, sem spec escrita. |
| 📝 rascunho | Spec escrita, aguardando revisão do usuário. |
| ✅ aprovada | Usuário revisou; pronta para a aula. |
| 🎓 explicada | Conceito explicado no chat e compreendido. |
| 🔨 em construção | Implementação em andamento. |
| 🚀 pronta | Implementada e validada contra os critérios de aceite. |

A ordem importa: **não existe "em construção" sem passar por "explicada"**.

## Etapas

1. **Selecionar** — o usuário escolhe qualquer item 💡 do [ROADMAP](ROADMAP.md), na ordem que quiser.
2. **Pesquisar** — Claude pesquisa o conceito na web antes de escrever: como o mercado usa hoje, exemplos reais recentes, se ainda é tendência ou ficou datado, o que mudou tecnicamente. A data e as fontes ficam registradas na spec.
3. **Especificar** — copiar o [_TEMPLATE.md](_TEMPLATE.md) para `docs/specs/<categoria>/<slug>.md` e preencher com o resultado da pesquisa.
4. **Revisar** — o usuário lê, ajusta, aprova.
5. **Aula** — Claude explica o conceito seguindo o "Roteiro de explicação" da spec: aula de design, incluindo o que o conceito comunica, onde aplicar e quanto custa. O usuário pergunta à vontade. A aula não termina com perguntas de fixação.
6. **Prototipar** — criar a pasta em `src/concepts/` com a pele, a abertura e uma seção representativa. O usuário olha no navegador e aprova ou ajusta a direção visual. Se a pesquisa da spec for antiga, refazer antes.
7. **Completar** — construir as demais seções. Explicação técnica só em uma frase quando surgir algo novo.
8. **Validar** — o usuário navega na tela e confere os critérios de aceite, um por um.
9. **Fechar** — atualizar status no ROADMAP; anotar na spec o que mudou em relação ao planejado.

## Ordem de construção

Livre. As telas são desacopladas, então a sequência é definida pela vontade de aprender do autor, não por um plano. A única exceção é a `SPEC-000` (casca da aplicação): ela vem primeiro porque fornece o menu e as rotas que todas as telas usam.

## O que faz uma boa spec aqui

- **Diz o que não é.** Metade do aprendizado de um conceito visual é saber distingui-lo dos vizinhos (skeleton ≠ spinner; glassmorphism ≠ transparência simples).
- **Está atualizada.** Baseada em pesquisa recente, com data e fontes; não em memória.
- **Descreve a autoaplicação.** Como a própria página demonstra o conceito, como o menu se veste, e como cada exemplo demonstra a si mesmo (a fonte explicada no texto escrito nela).
- **Fala a língua de quem não programa.** Tudo o que vai para a tela é descrito pelo que se vê. Código e termos técnicos ficam só na seção de notas de implementação.
- **Diz o que comunica.** A sensação, a mensagem e o tipo de marca que combina.
- **Diz onde serve.** Avaliação por tipo de site: e-commerce, landing page, dashboard/SaaS, app mobile, blog/editorial, portfólio.
- **Diz quanto custa.** Velocidade, leitura, produção, durabilidade.
- **Tem um laboratório.** Pelo menos uma demo em que o estudante mexe em valores e vê o efeito mudar.
- **É honesta sobre os custos.** Acessibilidade, performance, quando o estilo é modismo.
- **Critérios de aceite verificáveis.** "Fica bonito" não serve; "texto sobre o vidro mantém contraste ≥ 4.5:1" serve.

## Numeração

`SPEC-<categoria><sequência>` — o primeiro dígito é a categoria do menu (ver ROADMAP). Ex.: `SPEC-101` é o primeiro conceito da categoria 1 (Estilos visuais).
