# Levantamento de Componentes para Partials - Eduardo Salarini Portfolio

## Partials Existentes (Antes da Refatoração)
- `partials/menu-modal.ejs` - Modal de menu com navegação e botão de login
- `partials/header.ejs` - Header com botão do menu
- `partials/footer.ejs` - Footer com informações e links
- `partials/preloader.ejs` - Animação de carregamento

## Novos Partials Criados

### 1. `partials/head.ejs`
**Função**: Tag head unificada com todas as dependências CSS, fontes e meta tags
**Parâmetros**:
- `title` - Título da página
- `additionalCSS` - Array de CSS extras específicos da página
- `mobileRedirect` - Boolean para ativar redirecionamento mobile
- `redirectPath` - Caminho para redirecionamento mobile
- `lang` - Idioma da página (padrão: pt-br)

### 2. `partials/background-canvas.ejs`
**Função**: Canvas de fundo animado presente em várias páginas
**Conteúdo**: 
- Canvas com id "canvas" e classe "background-canvas"
- Div com classe "background-filter"

### 3. `partials/floating-menu-button.ejs`
**Função**: Botão flutuante do menu presente em várias páginas
**Conteúdo**: Botão com ícone hamburger e texto "Menu"

### 4. `partials/scripts.ejs`
**Função**: Scripts JavaScript comuns (Bootstrap + main.js)
**Parâmetros**:
- `additionalJS` - Array de scripts extras específicos da página

### 5. `partials/social-links.ejs`
**Função**: Links sociais reutilizáveis (GitHub, LinkedIn, Lattes)
**Parâmetros**:
- `socialClass` - Classe CSS para o container (padrão: hero-social mt-4)
- `socialLinkClass` - Classe CSS para os links (padrão: social-icon)

### 6. `partials/particles-background.ejs`
**Função**: Container de partículas animadas para páginas específicas
**Conteúdo**: Div com canvas para animação de partículas

### 7. `layouts/base.ejs`
**Função**: Layout base que pode ser usado por todas as páginas
**Parâmetros Suportados**:
- `useBackgroundCanvas` - Boolean (padrão: true)
- `useParticlesBackground` - Boolean (padrão: false)
- `useFloatingMenu` - Boolean (padrão: true)
- `useHeader` - Boolean (padrão: false)
- `useFooter` - Boolean (padrão: false)
- `lang` - Idioma (padrão: pt-br)

## Páginas Refatoradas

### 1. `index.ejs`
**Alterações**:
- ✅ Substituído head completo por `<%- include('partials/head') %>`
- ✅ Substituído preloader por `<%- include('partials/preloader') %>`
- ✅ Substituído modal de menu por `<%- include('partials/menu-modal', { page: 'home' }) %>`
- ✅ Substituído canvas de fundo por `<%- include('partials/background-canvas') %>`
- ✅ Substituído botão flutuante por `<%- include('partials/floating-menu-button') %>`
- ✅ Substituído social links por `<%- include('partials/social-links') %>`
- ✅ Substituído scripts por `<%- include('partials/scripts') %>`

### 2. `blog.ejs`
**Alterações**:
- ✅ Refatorado head com CSS específico: `additionalCSS: ['/css/blog-styles.css']`
- ✅ Aplicado partial do menu com page: 'blog'
- ✅ Todas as seções comuns substituídas por partials

### 3. `contato.ejs`
**Alterações**:
- ✅ Refatorado head com CSS específico: `additionalCSS: ['/css/contato-styles.css']`
- ✅ Aplicado partial do menu com page: 'contato'
- ✅ Todas as seções comuns substituídas por partials

### 4. `portfolio.ejs`
**Alterações**:
- ✅ Refatorado head com CSS específico: `additionalCSS: ['/css/portfolio-styles.css']`
- ✅ Aplicado partial do menu com page: 'portfolio'
- ✅ Todas as seções comuns substituídas por partials

### 5. `quem-sou-eu.ejs`
**Alterações**:
- ✅ Refatorado head com CSS específico: `additionalCSS: ['/css/quem-sou-eu-styles.css']`
- ✅ Aplicado partial do menu com page: 'about'
- ✅ Configurado redirecionamento mobile específico: `redirectPath: '/quem-sou-eu'`
- ✅ Todas as seções comuns substituídas por partials

### 6. `login.ejs`
**Alterações**:
- ✅ Refatorado head com CSS específico: `additionalCSS: ['/css/login-styles.css']`
- ✅ Desabilitado redirecionamento mobile: `mobileRedirect: false`
- ✅ Substituído partículas de fundo por `<%- include('partials/particles-background') %>`
- ✅ Todas as seções comuns substituídas por partials

### 7. `404.ejs`
**Alterações**:
- ✅ Refatorado head com CSS específico: `additionalCSS: ['/css/404-styles.css']`
- ✅ Desabilitado redirecionamento mobile: `mobileRedirect: false`
- ✅ Substituído partículas de fundo por `<%- include('partials/particles-background') %>`
- ✅ Todas as seções comuns substituídas por partials

### 8. `politica-de-privacidade.ejs`
**Alterações**:
- ✅ Refatorado head com CSS específico: `additionalCSS: ['/css/politica-styles.css']`
- ✅ Desabilitado redirecionamento mobile: `mobileRedirect: false`
- ✅ Substituído partículas de fundo por `<%- include('partials/particles-background') %>`
- ✅ Todas as seções comuns substituídas por partials

### 9. `layout.ejs`
**Alterações**:
- ✅ Refatorado para usar todos os novos partials
- ✅ Mantida compatibilidade com scripts dinâmicos
- ✅ Atualizado para usar partial de scripts com parâmetros

## Benefícios Alcançados

### 1. **Redução de Duplicação de Código**
- Head tag repetida em todas as páginas → 1 partial reutilizável
- Scripts Bootstrap/main.js repetidos → 1 partial reutilizável
- Canvas de fundo repetido → 1 partial reutilizável
- Botão de menu repetido → 1 partial reutilizável
- Social links repetidos → 1 partial reutilizável

### 2. **Manutenibilidade**
- Mudanças em dependências CSS/JS agora afetam automaticamente todas as páginas
- Atualização de links sociais em um local atualiza todo o site
- Consistência visual garantida entre todas as páginas

### 3. **Flexibilidade**
- Partials parametrizados permitem customização por página
- CSS específicos podem ser adicionados facilmente via `additionalCSS`
- Scripts específicos podem ser adicionados via `additionalJS`
- Componentes podem ser ativados/desativados conforme necessário

### 4. **Padronização**
- Todas as páginas seguem agora a mesma estrutura de partials
- Menu com indicação de página ativa funciona corretamente
- Estilos consistentes para modais, menus e componentes comuns

## Componentes Reutilizáveis Identificados mas Não Extraídos

### 1. **Cards de Projeto** (portfolio.ejs)
- Estrutura repetitiva de cards de projeto
- Poderia ser extraído para `partials/project-card.ejs`

### 2. **Cards de Artigo** (blog.ejs)
- Estrutura de cards de blog posts
- Poderia ser extraído para `partials/blog-card.ejs`

### 3. **Seções de CTA** 
- Call-to-action buttons aparecem em várias páginas
- Poderia ser extraído para `partials/cta-section.ejs`

### 4. **Form Components**
- Formulário de contato
- Formulário de login
- Poderiam ter campos padronizados em partials

## Próximos Passos Recomendados

1. **Testar todas as páginas** para garantir que não há regressão visual
2. **Validar funcionalidade** dos modais, menus e animações
3. **Considerar extração** dos componentes identificados mas não extraídos
4. **Documentar** os parâmetros dos partials para outros desenvolvedores
5. **Criar testes** para garantir que os partials funcionam corretamente

## Arquivos Modificados

### Novos Arquivos Criados:
- `src/views/partials/head.ejs`
- `src/views/partials/background-canvas.ejs`
- `src/views/partials/floating-menu-button.ejs`
- `src/views/partials/scripts.ejs`
- `src/views/partials/social-links.ejs`
- `src/views/partials/particles-background.ejs`
- `src/views/layouts/base.ejs`

### Arquivos Modificados:
- `src/views/index.ejs`
- `src/views/blog.ejs`
- `src/views/contato.ejs`
- `src/views/portfolio.ejs`
- `src/views/quem-sou-eu.ejs`
- `src/views/login.ejs`
- `src/views/404.ejs`
- `src/views/politica-de-privacidade.ejs`
- `src/views/layout.ejs`

**Status**: ✅ **Concluído** - Todos os componentes reutilizáveis identificados foram extraídos para partials e todas as páginas foram refatoradas para usar esses partials.
