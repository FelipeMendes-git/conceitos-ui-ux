/*
 * Mapa completo do guia: a única fonte do menu e da página inicial.
 *
 * Estar aqui não significa estar pronta. Uma tela só "existe" quando há uma
 * pasta src/concepts/<categoria>/<slug>/index.jsx (ver pages.js). Até lá ela
 * aparece no menu como "em breve".
 *
 * O número de cada tela (spec) só a identifica; não define a ordem de construção.
 */

const allCategories = [
  {
    id: 'estilos',
    number: '01',
    title: 'Estilos visuais',
    blurb: 'As grandes linguagens visuais da web, cada uma desenhada nela mesma.',
    items: [
      { spec: '101', slug: 'glassmorphism', title: 'Glassmorphism' },
      { spec: '102', slug: 'minimalismo', title: 'Minimalismo' },
      { spec: '103', slug: 'maximalismo', title: 'Maximalismo' },
      { spec: '104', slug: 'neumorphism', title: 'Neumorphism' },
      { spec: '105', slug: 'brutalismo', title: 'Brutalismo e neobrutalismo' },
      { spec: '106', slug: 'flat-design', title: 'Flat design' },
      { spec: '107', slug: 'esqueumorfismo', title: 'Esqueumorfismo' },
      { spec: '108', slug: 'material-design', title: 'Material Design' },
      { spec: '109', slug: 'claymorphism', title: 'Claymorphism' },
      { spec: '110', slug: 'bento-grid', title: 'Bento grid' },
      { spec: '111', slug: 'aurora-e-gradientes', title: 'Aurora e gradientes' },
      { spec: '112', slug: 'estilo-suico', title: 'Estilo suíço' },
      { spec: '113', slug: 'editorial', title: 'Editorial' },
      { spec: '114', slug: 'retro-e-y2k', title: 'Retrô e Y2K' },
      { spec: '115', slug: 'memphis', title: 'Memphis' },
      { spec: '116', slug: 'estetica-dark', title: 'Modo escuro e estética dark' },
      { spec: '117', slug: 'linha-do-tempo', title: 'Linha do tempo dos estilos' },
    ],
  },
  {
    id: 'tipografia',
    number: '02',
    title: 'Tipografia',
    blurb: 'Como escolher, combinar e hierarquizar fontes.',
    items: [
      { spec: '201', slug: 'anatomia-da-letra', title: 'Anatomia da letra' },
      { spec: '202', slug: 'familias-tipograficas', title: 'Famílias tipográficas' },
      { spec: '203', slug: 'personalidade-das-fontes', title: 'Personalidade das fontes' },
      { spec: '204', slug: 'hierarquia-tipografica', title: 'Hierarquia tipográfica' },
      { spec: '205', slug: 'combinacao-de-fontes', title: 'Combinação de fontes' },
      { spec: '206', slug: 'legibilidade', title: 'Legibilidade' },
      { spec: '207', slug: 'tipografia-como-imagem', title: 'Tipografia como imagem' },
    ],
  },
  {
    id: 'cores',
    number: '03',
    title: 'Cores',
    blurb: 'Quais cores combinam, o que comunicam e como montar uma paleta.',
    items: [
      { spec: '301', slug: 'circulo-cromatico', title: 'Círculo cromático' },
      { spec: '302', slug: 'harmonias', title: 'Harmonias de cores' },
      { spec: '303', slug: 'regra-60-30-10', title: 'Regra 60-30-10' },
      { spec: '304', slug: 'psicologia-das-cores', title: 'Psicologia das cores' },
      { spec: '305', slug: 'cores-e-marca', title: 'Cores e marca' },
      { spec: '306', slug: 'construindo-uma-paleta', title: 'Construindo uma paleta' },
      { spec: '307', slug: 'contraste-e-leitura', title: 'Contraste e leitura' },
      { spec: '308', slug: 'claro-e-escuro', title: 'Modo claro e modo escuro' },
      { spec: '309', slug: 'gradientes', title: 'Gradientes' },
    ],
  },
  {
    id: 'composicao',
    number: '04',
    title: 'Composição',
    blurb: 'Como organizar os elementos para o olho saber por onde começar.',
    items: [
      { spec: '401', slug: 'hierarquia-visual', title: 'Hierarquia visual' },
      { spec: '402', slug: 'espaco-em-branco', title: 'Espaço em branco' },
      { spec: '403', slug: 'quatro-principios', title: 'Contraste, repetição, alinhamento, proximidade' },
      { spec: '404', slug: 'gestalt', title: 'Princípios da Gestalt' },
      { spec: '405', slug: 'grade-e-ritmo', title: 'Grade e ritmo' },
      { spec: '406', slug: 'padroes-de-leitura', title: 'Padrões de leitura' },
      { spec: '407', slug: 'profundidade', title: 'Profundidade' },
      { spec: '408', slug: 'imagens-e-icones', title: 'Fotografia, ilustração e ícones' },
    ],
  },
  {
    id: 'tipos-de-site',
    number: '05',
    title: 'Tipos de site',
    blurb: 'O que existe, para que serve cada um e como reconhecer.',
    items: [
      { spec: '501', slug: 'landing-page', title: 'Landing page' },
      { spec: '502', slug: 'site-institucional', title: 'Site institucional' },
      { spec: '503', slug: 'e-commerce', title: 'E-commerce' },
      { spec: '504', slug: 'portfolio', title: 'Portfólio' },
      { spec: '505', slug: 'blog-e-editorial', title: 'Blog e site editorial' },
      { spec: '506', slug: 'dashboard', title: 'Dashboard e aplicação web' },
      { spec: '507', slug: 'site-ou-aplicativo', title: 'Site ou aplicativo?' },
      { spec: '508', slug: 'uma-pagina-ou-varias', title: 'Uma página ou várias?' },
    ],
  },
  {
    id: 'marketing',
    number: '06',
    title: 'Marketing e conversão',
    blurb: 'O design a serviço de um objetivo de negócio.',
    items: [
      { spec: '601', slug: 'pagina-que-vende', title: 'Anatomia de uma página que vende' },
      { spec: '602', slug: 'primeira-dobra', title: 'Primeira dobra' },
      { spec: '603', slug: 'chamada-para-acao', title: 'Chamada para ação' },
      { spec: '604', slug: 'prova-social', title: 'Prova social' },
      { spec: '605', slug: 'funil', title: 'Funil e jornada do visitante' },
      { spec: '606', slug: 'gatilhos-de-persuasao', title: 'Gatilhos de persuasão' },
      { spec: '607', slug: 'texto-que-orienta', title: 'Texto que orienta' },
      { spec: '608', slug: 'identidade-visual', title: 'Identidade visual' },
      { spec: '609', slug: 'dark-patterns', title: 'Dark patterns' },
    ],
  },
  {
    id: 'padroes',
    number: '07',
    title: 'Padrões de interface',
    blurb: 'Peças e situações que se repetem em quase todo site.',
    items: [
      { spec: '701', slug: 'skeleton', title: 'Skeleton' },
      { spec: '702', slug: 'estados-de-carregamento', title: 'Estados de carregamento' },
      { spec: '703', slug: 'estados-vazios', title: 'Estados vazios' },
      { spec: '704', slug: 'estados-de-um-botao', title: 'Estados de um botão' },
      { spec: '705', slug: 'avisos-e-notificacoes', title: 'Avisos e notificações' },
      { spec: '706', slug: 'janelas-sobrepostas', title: 'Janelas sobrepostas' },
      { spec: '707', slug: 'formularios', title: 'Formulários' },
      { spec: '708', slug: 'navegacao', title: 'Padrões de navegação' },
      { spec: '709', slug: 'cartoes-e-listas', title: 'Cartões e listas' },
      { spec: '710', slug: 'microinteracoes', title: 'Microinterações' },
    ],
  },
  {
    id: 'movimento',
    number: '08',
    title: 'Movimento',
    blurb: 'Animação com propósito, do detalhe ao espetáculo.',
    items: [
      { spec: '801', slug: 'principios-de-animacao', title: 'Princípios de animação' },
      { spec: '802', slug: 'ritmo-do-movimento', title: 'Ritmo do movimento' },
      { spec: '803', slug: 'animacoes-de-rolagem', title: 'Animações de rolagem' },
      { spec: '804', slug: 'parallax', title: 'Parallax' },
      { spec: '805', slug: 'transicoes-entre-paginas', title: 'Transições entre páginas' },
      { spec: '806', slug: 'gsap', title: 'GSAP e sites premiados' },
      { spec: '807', slug: 'movimento-na-medida', title: 'Movimento na medida' },
    ],
  },
  {
    id: 'ux',
    number: '09',
    title: 'Experiência do usuário',
    blurb: 'Por que algumas interfaces são fáceis e outras cansam.',
    items: [
      { spec: '901', slug: 'ui-e-ux', title: 'UI ≠ UX' },
      { spec: '902', slug: 'leis-de-ux', title: 'Leis de UX' },
      { spec: '903', slug: 'heuristicas-de-nielsen', title: 'Heurísticas de Nielsen' },
      { spec: '904', slug: 'pistas-de-uso', title: 'Pistas de uso' },
      { spec: '905', slug: 'carga-mental', title: 'Carga mental' },
      { spec: '906', slug: 'design-responsivo', title: 'Design responsivo' },
      { spec: '907', slug: 'acessibilidade', title: 'Acessibilidade' },
      { spec: '908', slug: 'sistemas-de-design', title: 'Sistemas de design' },
    ],
  },
  {
    // Só aparece ao rodar o projeto localmente (npm run dev).
    id: 'oficina',
    number: '00',
    title: 'Oficina',
    blurb: 'Ferramentas de quem constrói o guia.',
    devOnly: true,
    items: [{ spec: '000', slug: 'modelo', title: 'Tela-modelo' }],
  },
]

/** Categorias visíveis: as de oficina somem na versão publicada. */
export const categories = allCategories.filter(
  (category) => !category.devOnly || import.meta.env.DEV,
)

/** Todas as telas em uma lista só, cada uma já com seu endereço. */
export const concepts = categories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    category,
    key: `${category.id}/${item.slug}`,
    path: `/${category.id}/${item.slug}`,
  })),
)

/** A tela que mora em um endereço, ou null se o endereço não é de nenhuma. */
export function findConcept(path) {
  return concepts.find((concept) => concept.path === path) ?? null
}
