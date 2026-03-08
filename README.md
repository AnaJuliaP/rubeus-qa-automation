# Testes Automatizados – Rubeus

Projeto desenvolvido como parte de um processo seletivo para a vaga de **QA Junior** da empresa Rubeus. Foram realizados testes exploratórios em duas páginas de um ambiente de qualidade, identificando bugs funcionais e inconsistências visuais. Os casos encontrados foram documentados com tipo, classificação e prioridade, e automatizados utilizando **Cypress** com JavaScript.

---

## Estrutura do projeto

```
cypress-tests/
├── package.json
├── cypress.config.js
└── cypress/
    └── e2e/
        ├── certificacao/
        │   └── certification.cy.js     ← Itens 01, 02, 03
        └── site/
            └── site.cy.js              ← Itens 05, 06, 07
```

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|---------------|
| Node.js | 18+ |
| npm | 9+ |

---

## Instalação

```bash
npm install
```

---

## Como executar

```bash
# Abre a interface visual do Cypress
npm run cy:open

# Roda todos os testes em modo headless
npm run cy:run

# Roda apenas os testes de Certificação
npm run cy:run:certificacao

# Roda apenas os testes do Site
npm run cy:run:site
```

---

## Bugs identificados e automatizados

### Página: Certificação

---

#### Item 01 – Botões "Saiba mais" não executam ação

| Campo | Valor |
|-------|-------|
| Tipo | Correção |
| Classificação | Utilidade |
| Prioridade | Alta |

**Descrição:** Os botões "Saiba mais" presentes em seções informativas da página de certificação não executam nenhuma ação ao serem clicados e não redirecionam o usuário para conteúdo adicional.

**Teste:** `[BUG] ao ser clicado, não redireciona para nenhuma página`

**Como identificar a correção:** quando o bug for corrigido, o teste vai falhar automaticamente. Trocar a asserção de `'eq'` para `'not.eq'` e remover o `[BUG]` do nome do teste.

---

#### Item 02 – Botão "Quero me certificar" redireciona para pesquisa do Google

| Campo | Valor |
|-------|-------|
| Tipo | Correção |
| Classificação | Utilidade |
| Prioridade | Alta |

**Descrição:** Ao clicar no botão "Quero me certificar", o usuário é redirecionado para uma página de pesquisa do Google, em vez de ser direcionado para o fluxo de certificação da plataforma.

**Testes:**
- `ao ser clicado, não deve redirecionar para o Google`
- `ao ser clicado, deve permanecer na plataforma apprbs`

---

#### Item 03 – Erro ao avançar no processo de inscrição da certificação

| Campo | Valor |
|-------|-------|
| Tipo | Correção |
| Classificação | Utilidade |
| Prioridade | Alta |

**Descrição:** Ao clicar no botão "Avançar" durante o processo de inscrição, o sistema apresenta a mensagem "É necessário informar a base legal", impedindo o progresso do usuário. Foi identificado também um erro HTTP 403 no console do navegador, indicando possível problema de autorização. A mensagem é pouco clara para usuários sem conhecimento técnico.

**Testes:**
- `[BUG] após preencher o formulário, exibe erro de "base legal"`

**Como identificar a correção:** quando o bug for corrigido, o teste vai falhar automaticamente. Trocar a asserção de `'contain.text'` para `'not.contain.text'` e remover o `[BUG]` do nome do teste.

---

#### Item 04 – Problemas de layout e inconsistências visuais na página de certificação

| Campo | Valor |
|-------|-------|
| Tipo | Melhoria |
| Classificação | Desejabilidade |
| Prioridade | Baixa |

**Descrição:** Foram identificadas inconsistências visuais em diferentes seções da página de certificação, incluindo espaçamento irregular entre textos, desalinhamento de elementos visuais e inconsistências estéticas em seções próximas à área de inscrição. Esses problemas não impedem o uso da funcionalidade, mas impactam a experiência visual do usuário.

**Observação:** Inconsistências visuais não são automatizáveis com precisão via Cypress. Recomenda-se validação manual ou uso de ferramentas específicas de teste visual como Percy ou Applitools.

---

### Página: Site

---

#### Item 05 – Botões do carrossel da página inicial não executam ação

| Campo | Valor |
|-------|-------|
| Tipo | Correção |
| Classificação | Utilidade |
| Prioridade | Alta |

**Descrição:** Os elementos “Inscreva-se” e “Saiba mais” exibidos no carrossel da página inicial possuem aparência visual de botões interativos, levando o usuário a interpretar que são clicáveis. No entanto, ao tentar interagir com esses elementos, nenhuma ação é executada e não ocorre redirecionamento para outras páginas. Por apresentarem características visuais semelhantes às de botões, esses elementos podem induzir o usuário a erro, criando a expectativa de navegação ou acesso a informações adicionais, o que pode gerar confusão na experiência de uso..

**Testes:**
- `[BUG] botão "Inscreva-se" não está presente no carrossel`
- `[BUG] botão "Saiba mais" não está presente no carrossel`
- `[BUG] clicar na imagem do carrossel não redireciona`
- `[BUG] imagens do carrossel não possuem ação clicável`

**Como identificar a correção:** quando o bug for corrigido, os testes vão falhar automaticamente. Inverter as asserções e remover os `[BUG]` dos nomes dos testes.

---

#### Item 06 – Erro ao concluir processo de inscrição

| Campo | Valor |
|-------|-------|
| Tipo | Correção |
| Classificação | Utilidade |
| Prioridade | Alta |

**Descrição:** Ao clicar no botão "Concluir" durante o processo de inscrição, o sistema apresenta a mensagem "É necessário informar a base legal", impedindo o progresso do usuário. A mensagem é pouco clara e pode gerar confusão para usuários sem conhecimento técnico.

**Testes:**
- `[BUG] após preencher o formulário, exibe erro de "base legal"`

**Como identificar a correção:** quando o bug for corrigido, o teste vai falhar automaticamente. Trocar a asserção de `'contain.text'` para `'not.contain.text'` e remover o `[BUG]` do nome do teste.

---

#### Item 07 – Problemas de layout e inconsistências visuais na página institucional

| Campo | Valor |
|-------|-------|
| Tipo | Melhoria |
| Classificação | Desejabilidade |
| Prioridade | Baixa |

**Descrição:** Foram identificadas inconsistências visuais em algumas seções da página institucional, incluindo desalinhamento de textos e emojis, espaçamento excessivo em algumas áreas, sublinhados e traços fora do padrão visual e espaçamento irregular em seções de eventos. Esses pontos não impactam a funcionalidade, mas afetam a experiência visual do usuário.

**Testes automatizados (verificações básicas de layout):**
- `não deve ter scroll horizontal`
- `header deve estar visível e com altura maior que zero`
- `imagens não devem ter src vazio ou ausente`
- `seções não devem ter altura excessiva`

**Observação:** Assim como o Item 04, inconsistências visuais detalhadas recomenda-se validação manual ou ferramentas de teste visual.

---

## Convenção de nomenclatura dos testes

| Prefixo | Significado |
|---------|-------------|
| `[BUG]` | Bug confirmado — asserção invertida, teste passa enquanto o bug existe |
| sem prefixo | Comportamento esperado funcionando corretamente |

Quando um bug for corrigido o teste com `[BUG]` vai **falhar automaticamente**, sinalizando que a asserção deve ser invertida e o prefixo removido. Isso garante que os testes funcionem como regressão após a correção.

---

## Tecnologias utilizadas

| Ferramenta | Versão | Uso |
|------------|--------|-----|
| Cypress | 13.7.3 | Framework de testes E2E |
| Node.js | 18+ | Runtime |