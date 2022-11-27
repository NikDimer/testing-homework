const { assert } = require('chai');
<<<<<<< Updated upstream

describe('github', async function() {
    it('Тест, который пройдет', async function() {
        await this.browser.url('https://github.com/gemini-testing/hermione');
        await this.browser.assertView('plain', '#readme', {
            compositeImage: true,
        });

        const title = await this.browser.$('#readme h1').getText();
        assert.equal(title, 'Hermione');
=======

let bug = '?bug_id=0';
// Для генерации бага достаточно поменять цыфру в строке выше на номер бага

describe('Тестирование существования страниц', async function() {

    hermione.only.in('defaultChrome');
    it('Тестирование существования домашней страницы', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store' + bug);

        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });

    hermione.only.in('defaultChrome');
    it('Тестирование существования страницы контактов', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/contacts' + bug);

        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });

    hermione.only.in('defaultChrome');
    it('Тестирование существования страницы доставки', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/delivery' + bug);

        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });

    hermione.only.in('defaultChrome');
    it('Тестирование существования страницы каталога', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/catalog' + bug);
    
        if (!await browser.$("#root > div > div > div > div:nth-child(2) > div:nth-child(1)").isExisting()) {
            throw new Error('Что-то не так со прогрузкой страницы каталога');
        }
    });

    hermione.only.in('defaultChrome');
    it('Тестирование существования страницы с корзиной', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (!await browser.$("#root > div > div > div > div:nth-child(1)").isExisting()) {
            throw new Error('Что-то не так со прогрузкой страницы корзины');
        }
    });
});

describe('Тестирование меню "гамбургера"', async function() {
    hermione.only.in('noHamburgerChrome');
    it('Гамбургер не видно при ширине >= 576px', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store' + bug);

        const toggler = await browser.$('.Application-Toggler');

        if (await toggler.isDisplayed()) {
            throw new Error('Гамбургер продолжает визуализироваться при ширине >= 576px')
        }
    });
    
    hermione.only.in('noHamburgerChrome');
    it('Меню видно при ширине >= 576px', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store' + bug);
        
        const menu = await browser.$('.Application-Menu');
        
        if (!await menu.isDisplayed()) {
            throw new Error('Меню скрывается при ширине >= 576px')
        }
    });

    hermione.only.in('hamburgerChrome');
    it('Гамбургер видно при ширине < 576px"', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store' + bug);

        const toggler = await browser.$('.Application-Toggler');

        if (!await toggler.isDisplayed()) {
            throw new Error('Гамбургер не видно при ширине < 576px')
        }
    });

    hermione.only.in('hamburgerChrome');
    it('Меню видно при ширине < 576px', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store' + bug);

        const menu = await browser.$('.Application-Menu');

        if (await menu.isDisplayed()) {
            throw new Error('Меню продолжает визуализироваться при ширине < 576px')
        }
    });
    
    hermione.only.in('hamburgerChrome');
    it('Меню возникает при клике на гамбургер', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store' + bug);

        const toggler = await browser.$('.Application-Toggler');
        const menu = await browser.$('.Application-Menu');
        await toggler.click();

        if (!await menu.isDisplayed()) {
            throw new Error('Меню не появляется после клика по гамбургеру')
        }
    });

    hermione.only.in('hamburgerChrome');
    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store' + bug);

        const toggler = await browser.$('.Application-Toggler');
        const menu = await browser.$('.Application-Menu');
        const menu_item = await browser.$('#root > div > nav > div > div > div > a:nth-child(1)');
        await toggler.click();
        await menu_item.click();
        

        if (await menu.isDisplayed()) {
            throw new Error('Меню гамбургера не исчезает после выбора элемента из него')
        }
    });

});

describe('Адаптивность сайта', async function() {
    hermione.skip.in('defaultChrome', "Только браузеры для проверки адаптивности и ничего более")
            .in('hamburgerChrome', "Только браузеры для проверки адаптивности и ничего более")
            .in('noHamburgerChrome', "Только браузеры для проверки адаптивности и ничего более");
    it('Адаптивность сайта', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store' + bug);
    
        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });
});

describe('Тестирование каталога', async function() {
    hermione.only.in('defaultChrome');
    it('Отображаются ли товары, приходящие с сервера', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/api/products' + bug);

        const products = JSON.parse(await browser.$('body > pre').getText());

        await browser.url('http://localhost:3000/hw/store/catalog' + bug);
        
        let catalog_item, catalog_item_name, catalog_item_price, catalog_item_detailsLink;
        for (let i = 0; i < products.length; i++) {
            catalog_item = await browser.$('#root > div > div > div > div:nth-child(2) > div[data-testid="' + i.toString() + '"]');
            catalog_item_name = catalog_item.$('.ProductItem-Name');
            catalog_item_price = catalog_item.$('.ProductItem-Price');
            catalog_item_detailsLink = catalog_item.$('.ProductItem-DetailsLink');
            if (await catalog_item_price.getText() !== '$' + products[i].price) {
                throw new Error('Цена продукта на сайте не совпадает с данными о цене на сервере');
            }
            if (await catalog_item_name.getText() !== products[i].name) {
                throw new Error('Наименование продукта на сайте не совпадает с данными о наименовании на сервере');
            }
            if (await catalog_item_detailsLink.getAttribute('href') !== '/hw/store/catalog/' + i.toString()) {
                throw new Error('Ссылка на детали о продукте неверна');
            }
        }
    });

    hermione.only.in('defaultChrome');
    it('На странице с деталями о товаре, вся информация присутствует и совпадает с информацией на сервере', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/api/products' + bug);

        const products = JSON.parse(await browser.$('body > pre').getText());

        let product, product_name, product_price, product_description, product_color, product_material, addToCart_button, colorText, materialText, colorDataText, materialDataText;
        for (let i = 0; i < products.length; i++) {
            await browser.url('http://localhost:3000/hw/store/api/products/' + i.toString() + bug);

            product_data = JSON.parse(await browser.$('body > pre').getText());

            await browser.url('http://localhost:3000/hw/store/catalog/' + i.toString() + bug);
            product = await browser.$('#root > div > div > div');
            product_name = await product.$('.ProductDetails-Name');
            product_price = await product.$('.ProductDetails-Price');
            product_description = await product.$('.ProductDetails-Description');
            product_color = await product.$('.ProductDetails-Color');
            product_material = await product.$('.ProductDetails-Material');
            addToCart_button = await product.$('.ProductDetails-AddToCart');
            
            if (await product_price.getText() !== '$' + product_data.price.toString()) {
                throw new Error('Цена продукта на сайте с деталями не совпадает с данными о цене на сервере');
            }
            if (await product_name.getText() !== product_data.name) {
                throw new Error('Наименование продукта на сайте с деталями не совпадает с данными о наименовании на сервере');
            }
            if (await product_description.getText() !== product_data.description) {
                throw new Error('Описание продукта на сайте с деталями не совпадает с данными об описании на сервере');
            }
            colorText = (await product_color.getText()).toString().toLowerCase();
            colorDataText = (product_data.color).toString().toLowerCase();
            if (colorText !== colorDataText) {
                throw new Error('Цвет продукта на сайте с деталями не совпадает с данными о цвете на сервере');
            }
            materialText = (await product_material.getText()).toString().toLowerCase();
            materialDataText = (product_data.material).toString().toLowerCase();
            if (materialText !== materialDataText) {
                throw new Error('Материал продукта на сайте с деталями не совпадает с данными о материале на сервере');
            }
            if (await addToCart_button.getText() !== 'Add to Cart') {
                throw new Error('В кнопке для добавления товара в корзину содержится неправильный текст');
            }
        }

        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        await browser.assertView('plain', '.ProductDetails-AddToCart', {
            compositeImage: true,
        });
    });

    hermione.only.in('defaultChrome');
    it('Товар добавляется в корзину', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        let productsForCart = [];
        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        productsForCart.push({
            id: '0',
            name: await browser.$('.ProductDetails-Name').getText(),
            count: 1,
            price: Number((await browser.$('.ProductDetails-Price').getText()).substr(1))
        });
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/catalog/1' + bug);
        productsForCart.push({
            id: '1',
            name: await browser.$('.ProductDetails-Name').getText(),
            count: 3,
            price: Number((await browser.$('.ProductDetails-Price').getText()).substr(1))
        });
        await browser.$('.ProductDetails-AddToCart').click();
        await browser.$('.ProductDetails-AddToCart').click();
        await browser.$('.ProductDetails-AddToCart').click();



        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        let cart = [];
        let productsInCart = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody').getText()).split('\n');
        let productInCart;
        for (let i = 0; i < productsForCart.length; i++) {
            productInCart = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(' + (i + 1).toString() + ')'));
            cart.push({
                id: (await productInCart.getAttribute('data-testid')).toString(),
                name: productsInCart[i].split('\t')[1],
                count: Number(productsInCart[i].split('\t')[3]),
                price: Number(productsInCart[i].split('\t')[2].substr(1))
            })
        };
        productsForCart = productsForCart.sort(function(a, b) { return a - b; });
        cart = cart.sort(function(a, b) { return a - b; });
        if (productsForCart.length != cart.length) {
            throw new Error('Количество типов товаров добавленных в корзину и находящихся в корзине не совпадают');
        }

        let forEl;
        let cartEl;
        for (let i = 0; i < cart.length; i++) {
            forEl = productsForCart[i];
            cartEl = cart[i];
            if (forEl.id != cartEl.id || forEl.name != cartEl.name || forEl.count != cartEl.count || forEl.price != cartEl.price) {
                throw new Error('Список добавленных в корзину товаров и список находящихся в ней не совпадают');
            }
        }
    });

    hermione.only.in('defaultChrome');
    it('Если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart + bug');

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        let productsForCart = [];
        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        productsForCart.push({
            id: '0',
            name: await browser.$('.ProductDetails-Name').getText(),
            count: 1,
            price: Number((await browser.$('.ProductDetails-Price').getText()).substr(1))
        });
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/catalog/1' + bug);
        productsForCart.push({
            id: '1',
            name: await browser.$('.ProductDetails-Name').getText(),
            count: 3,
            price: Number((await browser.$('.ProductDetails-Price').getText()).substr(1))
        });
        await browser.$('.ProductDetails-AddToCart').click();
        await browser.$('.ProductDetails-AddToCart').click();
        await browser.$('.ProductDetails-AddToCart').click();



        await browser.url('http://localhost:3000/hw/store/catalog' + bug);

        let catalogEl;
        for (let i = 0; i < productsForCart.length; i++) {
            if (!await browser.$(".ProductItem[data-testid='" + productsForCart[i].id.toString() + "'] " + ".CartBadge").isExisting()) {
                throw new Error('В каталоге нет пометки о том что товар добавлен в корзину, хотя товар в ней находится');
            }
        }

        for (let i = 0; i < productsForCart.length; i++) {
            await browser.url('http://localhost:3000/hw/store/catalog/' + productsForCart[i].id + bug);
            if (!await browser.$('.CartBadge').isExisting()) {
                throw new Error('На странице товара нет пометки о том что он добавлен в корзину, хотя товар в ней находится');
            }
        }
    });

    hermione.only.in('defaultChrome');
    it('Если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        let cart = [];
        let productsInCart = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody').getText()).split('\n');
        let productInCart;
        for (let i = 0; i < 1; i++) {
            productInCart = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(' + (i + 1).toString() + ')'));
            cart.push({
                id: (await productInCart.getAttribute('data-testid')).toString(),
                name: productsInCart[i].split('\t')[1],
                count: Number(productsInCart[i].split('\t')[3]),
                price: Number(productsInCart[i].split('\t')[2].substr(1))
            })
        };
        
        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        let cart1 = [];
        let productsInCart1 = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody').getText()).split('\n');
        let productInCart1;
        for (let i = 0; i < 1; i++) {
            productInCart1 = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(' + (i + 1).toString() + ')'));
            cart1.push({
                id: (await productInCart1.getAttribute('data-testid')).toString(),
                name: productsInCart1[i].split('\t')[1],
                count: Number(productsInCart1[i].split('\t')[3]),
                price: Number(productsInCart1[i].split('\t')[2].substr(1))
            })
        };

        if (cart[0].count + 1 !== cart1[0].count) {
            throw new Error('Товар уже в корзине, но при ещё одном клике на кнопку "Добавить в корзину", его количество в корзине не увеличивается на 1');
        }
    });

    hermione.only.in('defaultChrome');
    it('Cодержимое корзины должно сохраняться между перезагрузками страницы', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        let cart = [];
        let productsInCart = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody').getText()).split('\n');
        let productInCart;
        for (let i = 0; i < 1; i++) {
            productInCart = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(' + (i + 1).toString() + ')'));
            cart.push({
                id: (await productInCart.getAttribute('data-testid')).toString(),
                name: productsInCart[i].split('\t')[1],
                count: Number(productsInCart[i].split('\t')[3]),
                price: Number(productsInCart[i].split('\t')[2].substr(1))
            })
        };
        
        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        let cart1 = [];
        let productsInCart1 = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody').getText()).split('\n');
        let productInCart1;
        for (let i = 0; i < 1; i++) {
            productInCart1 = (await browser.$('#root > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(' + (i + 1).toString() + ')'));
            cart1.push({
                id: (await productInCart1.getAttribute('data-testid')).toString(),
                name: productsInCart1[i].split('\t')[1],
                count: Number(productsInCart1[i].split('\t')[3]),
                price: Number(productsInCart1[i].split('\t')[2].substr(1))
            })
        };

        if (cart[0].id !== cart1[0].id || cart[0].name !== cart1[0].name || cart[0].count !== cart1[0].count || cart[0].price !== cart1[0].price) {
            throw new Error('При перезагрузке содержимое страницы не сохранилось. Очень жаль.');
        }
    });
});

describe('Тестирование корзины', async function() {
    hermione.only.in('defaultChrome');
    it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        let cartTitle = (await browser.$('.nav-link.active').getText()).toString();

        let cartTitleCount = cartTitle.split(' ');
        if (cartTitleCount.length < 2) {
            throw new Error('Число товаров в корзине не отображается в навигационном заголовке корзины');
        }
        if (cartTitleCount[1] !== '(1)') {
            throw new Error('Количество товаров в навигационном заголовке корзины в шапке не совпадает с реальным количеством товаров в ней');
        }
    });

    hermione.only.in('defaultChrome');
    it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (!await browser.$('.Cart-Clear').isExisting()) {
            throw new Error('Кнопка очистки корзины не визуализируется несмотря на то, что в корзине есть товары');
        } else {
            await browser.$('.Cart-Clear').click();
            if (await browser.$('.Cart-Table').isExisting()) {
                throw new Error('Кнопка очистки корзины после клика по ней не очистила корзину');
            }
        }
    });

    hermione.only.in('defaultChrome');
    it('Если корзина пустая, должна отображаться ссылка на каталог товаров', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (!await browser.$("#root > div > div > div > div > div > a[href='/hw/store/catalog']").isExisting()) {
            throw new Error('Ссылка на каталог не отображается при пустой корзине');
        }
    });

    hermione.only.in('defaultChrome');
    it('Форма checkout работает правильно', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        let formNameInput = await browser.$('#f-name');
        await formNameInput.setValue('Dmitriy');

        let formPhoneInput = await browser.$('#f-phone');
        await formPhoneInput.setValue('+71112223344');

        let formAddressInput = await browser.$('#f-address');
        await formAddressInput.setValue('Adress');

        let formSubmit = await browser.$('.Form-Submit');
        await formSubmit.click();

        if (!await browser.$("#root > div > div > div > div > div > div > div > div").isExisting()) {
            throw new Error('Что-то не так с формой заказа, введены коректные данные, но она их не принимает');
        }
    });

    hermione.only.in('defaultChrome');
    it('Форма checkout выдаёт корректное сообщение о сделанном заказе', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        if (await browser.$('.Cart-Clear').isExisting()) {
            await browser.$('.Cart-Clear').click();
        }

        await browser.url('http://localhost:3000/hw/store/catalog/0' + bug);
        await browser.$('.ProductDetails-AddToCart').click();

        await browser.url('http://localhost:3000/hw/store/cart' + bug);

        let formNameInput = await browser.$('#f-name');
        await formNameInput.setValue('Dmitriy');

        let formPhoneInput = await browser.$('#f-phone');
        await formPhoneInput.setValue('+71112223344');

        let formAddressInput = await browser.$('#f-address');
        await formAddressInput.setValue('Adress');

        await browser.$('.Form-Submit').click();

        await browser.assertView('plain', "html", {
            compositeImage: true,
        });
>>>>>>> Stashed changes
    });
});