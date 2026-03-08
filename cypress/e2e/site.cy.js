/**
 * Testes automatizados – Página institucional (Site)
 * URL: https://qualidade.apprbs.com.br/site
 *
 * Itens cobertos:
 *   Item 05 – Botões do carrossel ("Inscreva-se" / "Saiba mais") devem executar ação
 *   Item 06 – Botão "Concluir" não deve exibir erro de base legal / HTTP 403
 *   Item 07 – Verificações visuais básicas
 */

describe('Site – Testes de funcionalidade', () => {

  beforeEach(() => {
    cy.visit('https://qualidade.apprbs.com.br/site')
  })

  // -------------------------------------------------------------------------
  // Abertura de página
  // -------------------------------------------------------------------------

  it('deve abrir na URL correta', () => {
    cy.url().should('include', 'site')
  })

  // -------------------------------------------------------------------------
  // Carrossel – estrutura
  // -------------------------------------------------------------------------

  context('Carrossel – estrutura', () => {

    it('deve conter slides', () => {
      cy.get('.mySlides').should('have.length.greaterThan', 0)
    })

    it('deve conter imagens nos slides', () => {
      cy.get('.mySlides img').should('have.length.greaterThan', 0)
    })

    it('[BUG] imagens do carrossel não possuem ação clicável', () => {
      cy.get('.mySlides img').each(($img) => {
        const hasParentLink = $img.closest('a').length > 0
        const hasOnClick    = $img.attr('onclick') !== undefined

        // Asserção invertida — documenta que o bug existe
       // Quando o bug for corrigido, trocar para .to.be.true
        expect(
          hasParentLink || hasOnClick,
          `Bug Item 05 CONFIRMADO: Imagem sem ação clicável — src: ${$img.attr('src')}`
        ).to.be.false
      })
    })

  })

  // -------------------------------------------------------------------------
  // Carrossel – navegação
  // -------------------------------------------------------------------------

  context('Carrossel – navegação', () => {

    it('clicar em próximo deve mudar o slide visível', () => {
      cy.get('.mySlides').then(($slides) => {
        const visibleBefore = [...$slides].findIndex(
          (s) => getComputedStyle(s).display !== 'none'
        )

        cy.get('.next').click()

        cy.get('.mySlides').then(($slidesAfter) => {
          const visibleAfter = [...$slidesAfter].findIndex(
            (s) => getComputedStyle(s).display !== 'none'
          )
          expect(visibleAfter).to.not.equal(
            visibleBefore,
            'Bug: clicar em próximo não alterou o slide visível'
          )
        })
      })
    })

    it('clicar em anterior deve mudar o slide visível', () => {
      cy.get('.next').click()

      cy.get('.mySlides').then(($slides) => {
        const visibleAfterNext = [...$slides].findIndex(
          (s) => getComputedStyle(s).display !== 'none'
        )

        cy.get('.prev').click()

        cy.get('.mySlides').then(($slidesAfter) => {
          const visibleAfterPrev = [...$slidesAfter].findIndex(
            (s) => getComputedStyle(s).display !== 'none'
          )
          expect(visibleAfterPrev).to.not.equal(
            visibleAfterNext,
            'Bug: clicar em anterior não alterou o slide visível'
          )
        })
      })
    })

  })

  // -------------------------------------------------------------------------
  // Item 05 – Botões do carrossel devem executar ação
  // -------------------------------------------------------------------------

  context('Item 05 – Botões do carrossel', () => {

  it('[BUG] botão "Inscreva-se" não está presente no carrossel', () => {
    // Asserção invertida — documenta que o bug existe
    // Quando o bug for corrigido, trocar para 'exist'
    cy.contains('a, button', 'Inscreva-se').should('not.exist')
  })

  it('[BUG] botão "Saiba mais" não está presente no carrossel', () => {
    // Asserção invertida — documenta que o bug existe
    // Quando o bug for corrigido, trocar para 'exist'
    cy.contains('a, button', 'Saiba mais').should('not.exist')
  })

  it('[BUG] clicar na imagem do carrossel não redireciona', () => {
    cy.url().then((urlBefore) => {
      cy.get('.mySlides img').first().click()

      // Asserção invertida — documenta que o bug existe
      // Quando o bug for corrigido, trocar para 'not.eq'
      cy.url().should(
        'eq',
        urlBefore,
        'Bug Item 05 CONFIRMADO: Imagem do carrossel não redirecionou'
      )
    })
  })

})

  // -------------------------------------------------------------------------
  // Item 06 – Botão "Concluir" não deve exibir erro de base legal
  // -------------------------------------------------------------------------

  context('Item 06 – Botão "Concluir" no fluxo de inscrição', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('ActionsForm is not defined')) {
        return false
      }
    })
  })

  it('[BUG] após preencher o formulário, exibe erro de "base legal"', () => {
    cy.get('[name="pessoa.nome"]').clear().type('Teste QA')
    cy.get('[name="pessoa.emailPrincipal"]').clear().type('teste@email.com')
    cy.get('[name="pessoa.telefonePrincipal"]').clear().type('35999999999')

    cy.contains('button, a', /Avançar|Concluir/).click()

    // Asserção invertida — documenta que o bug existe
    // Quando o bug for corrigido, trocar para 'not.contain.text'
    cy.get('#toast-container .rbToasterError li')
      .should(
        'contain.text',
        'É necessário informar a base legal',
        'Bug Item 06 CONFIRMADO: Mensagem "É necessário informar a base legal" exibida ao clicar em Concluir'
      )
  })

})

})