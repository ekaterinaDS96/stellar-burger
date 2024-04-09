describe('Проверка работы приложения', () => {
    const mainPage = '/';
  
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as(`${'getAllIngredients'}`);
  
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'user.json'
      }).as(`${'getUser'}`);
  
      cy.setCookie('accessToken', 'accessToken');
      window.localStorage.setItem('refreshToken', 'refreshToken');
  
      cy.visit(mainPage);
    });
  
    afterEach(() => {
      cy.setCookie('accessToken', '');
      window.localStorage.setItem('refreshToken', '');
    });
  
    it('Проверка того, что данные загрузились', function () {
      cy.wait(['@getAllIngredients']);
    })

    describe('Тестирование работы модальных окон', () => {
        beforeEach(() => {
          const ingredient = cy.contains('Биокотлета из марсианской Магнолии');
          ingredient.click();
        });
    
        it('Проверка октрытия модального окна ингредиента', () => {
          cy.contains('Детали ингредиента').should('exist');
    
          cy.get('li').children('p').contains('Калории, ккал').next('p').contains('4242');
          cy.get('li').children('p').contains('Белки, г').next('p').contains('420');
          cy.get('li').children('p').contains('Жиры, г').next('p').contains('142');
          cy.get('li').children('p').contains('Углеводы, г').next('p').contains('242');
        });
    
        it('Проверка того, что модальное окно ингредиента закрывается по нажатию на крестик', () => {
          const closeButton = cy.get(`[data-cy="Детали ингредиента"]`);
          closeButton.click();
          cy.contains('Детали ингредиента').should('not.exist');
        });
      });
    
      describe('Проверка добавления ингредиента в конструктор', () => {
        it('Ингредиент добавляется в конструктор', () => {
          const mains = cy.get('h3').contains('Начинки').next('ul');
          const addButton = mains.contains('Добавить');
    
          cy.get('div').contains('Выберите начинку').should('exist');
    
          addButton.click();
    
          cy.get('div').contains('Выберите начинку').should('not.exist');
        });
      });
    
      describe('Проверка оформления заказа', () => {
        it('Проверка нажатия на кнопку «Оформить заказ»', () => {
          cy.intercept('POST', 'api/orders', {
            fixture: 'order.json'
          }).as(`${'orderRequest'}`);
    
          const bunsList = cy.get('h3').contains('Булки').next('ul');
          const addBunButton = bunsList.contains('Добавить');
          addBunButton.click();
    
          const mainsList = cy.get('h3').contains('Начинки').next('ul');
          const addMainButton = mainsList.contains('Добавить');
          addMainButton.click();
    
          const orderRequestButton = cy.contains('Оформить заказ');
          orderRequestButton.click();
    
          cy.contains('37807');
    
          cy.get('body').type('{esc}');
    
          cy.contains('37807').should('not.exist');
          cy.contains('Выберите булки').should('exist');
          cy.contains('Выберите начинку').should('exist');
        });
      });

});