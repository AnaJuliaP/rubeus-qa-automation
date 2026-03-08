/**
 * Testes automatizados – Página de Certificação
 * URL: https://qualidade.apprbs.com.br/certificacao
 *
 * Itens cobertos:
 *   Item 01 – Botões "Saiba mais" devem executar ação / redirecionar
 *   Item 02 – Botão "Quero me certificar" não deve ir para o Google
 *   Item 03 – Botão "Avançar" não deve exibir erro de base legal / HTTP 403
 */

describe('Certificação – Testes de funcionalidade', () => {

  beforeEach(() => {
    cy.visit('https://qualidade.apprbs.com.br/certificacao')
  })

  // -------------------------------------------------------------------------
  // Item 01 – Botão "Saiba mais"
  // -------------------------------------------------------------------------

 context('Item 01 – Botão "Saiba mais"', () => {

  it('deve estar presente na página', () => {
    cy.get('.gjs-cell').contains('Saiba mais').should('exist')
  })

  it('[BUG] ao ser clicado, deve redirecionar para outra página', () => {
    cy.url().then((urlBefore) => {
      cy.get('.gjs-cell').contains('Saiba mais').first().click()

      // Asserção invertida — documenta que o bug existe
      // Quando o bug for corrigido, trocar para 'not.eq'
      cy.url().should(
        'eq',
        urlBefore,
        'Bug Item 01: Botão "Saiba mais" não redirecionou para nenhuma página'
      )
    })
  })

})

  // -------------------------------------------------------------------------
  // Item 02 – Botão "Quero me certificar"
  // -------------------------------------------------------------------------

  context('Item 02 – Botão "Quero me certificar"', () => {

    it('deve estar presente na página', () => {
      cy.contains('a, button', 'Quero me certificar').should('exist')
    })

    it('ao ser clicado, não deve redirecionar para o Google', () => {
      cy.contains('a, button', 'Quero me certificar').click()

      cy.url().should(
        'not.include',
        'google',
        'Bug Item 02: Botão "Quero me certificar" redirecionou para o Google'
      )
    })

    it('ao ser clicado, deve permanecer na plataforma apprbs', () => {
      cy.contains('a, button', 'Quero me certificar').click()

      cy.url().should(
        'include',
        'apprbs.com.br',
        'Bug Item 02: Após clicar, usuário saiu da plataforma'
      )
    })

  })

  // -------------------------------------------------------------------------
  // Item 03 – Botão "Avançar" no fluxo de inscrição
  // -------------------------------------------------------------------------

  context('Item 03 – Botão "Avançar" no fluxo de inscrição', () => {

      // Ignora erros de JS da aplicação que não são do teste
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('ActionsForm is not defined')) {
        return false
      }
    })
  })

    
  it('[BUG] após preencher o formulário, NÃO deve exibir erro de "base legal"', () => {
    cy.get('[name="pessoa.nome"]').clear().type('Teste QA')
    cy.get('[name="pessoa.emailPrincipal"]').clear().type('teste@email.com')
    cy.get('[name="pessoa.telefonePrincipal"]').clear().type('35999999999')

    cy.contains('button, a', 'Avançar').click()

    // Asserção invertida — documenta que o bug existe
    // Quando o bug for corrigido, trocar para 'not.contain.text'
    cy.get('#toast-container .rbToasterError li')
      .should(
        'contain.text',
        'É necessário informar a base legal',
        'Bug Item 03: Mensagem "É necessário informar a base legal" exibida após clicar em Avançar'
      )
  })

  it('após preencher o formulário, não deve retornar HTTP 403', () => {
    cy.intercept('**').as('anyRequest')

    cy.get('[name="pessoa.nome"]').clear().type('Teste QA')
    cy.get('[name="pessoa.emailPrincipal"]').clear().type('teste@email.com')
    cy.get('[name="pessoa.telefonePrincipal"]').clear().type('35999999999')

    cy.contains('button, a', 'Avançar').click()

    cy.wait('@anyRequest', { timeout: 5000 }).then((interception) => {
      expect(
        interception.response?.statusCode,
        'Bug Item 03: Requisição retornou HTTP 403 — possível problema de autorização'
      ).to.not.equal(403)
    })

    })
  }) 

})