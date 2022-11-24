const { assert } = require('chai');
const { ExampleStore } = require('../../src/server/data');

describe('Тестирование существования страниц', async function() {

    hermione.only.in('defaultChrome');
    it('Тестирование существования домашней страницы', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store');

        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });

    hermione.only.in('defaultChrome');
    it('Тестирование существования страницы контактов', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/contacts');

        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });

    hermione.only.in('defaultChrome');
    it('Тестирование существования страницы доставки', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/delivery');

        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });

    hermione.only.in('defaultChrome');
    it('Тестирование существования страницы каталога', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/catalog');
    
        await browser.assertView('plain', '.Application-Menu', {
            compositeImage: true,
        });
    });

    hermione.only.in('defaultChrome');
    it('Тестирование существования страницы с корзиной', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/cart');
    
        await browser.assertView('plain', '.Application-Menu', {
            compositeImage: true,
        });
    });
});

describe('Тестирование меню "гамбургера"', async function() {
    hermione.only.in('noHamburgerChrome');
    it('Гамбургер не видно при ширине >= 576px', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store');

        const toggler = await browser.$('.Application-Toggler');

        if (await toggler.isDisplayed()) {
            throw new Error('Гамбургер продолжает визуализироваться при ширине >= 576px')
        }
    });
    
    hermione.only.in('noHamburgerChrome');
    it('Меню видно при ширине >= 576px', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store');
        //await browser.setMeta('foo', browser.findElement(By.className('Application-Menu')).isElementDisplayed);

        /*await browser.assertView('plain', '.Application-Menu', {
            compositeImage: true,
        });*/
        
        const menu = await browser.$('.Application-Menu');
        
        if (!await menu.isDisplayed()) {
            throw new Error('Меню скрывается при ширине >= 576px')
        }
    });

    hermione.only.in('hamburgerChrome');
    it('Гамбургер видно при ширине < 576px"', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store');
        //await browser.setMeta('foo', browser.findElement(By.className('Application-Toggler')).isElementDisplayed);

        const toggler = await browser.$('.Application-Toggler');

        if (!await toggler.isDisplayed()) {
            throw new Error('Гамбургер не видно при ширине < 576px')
        }
    });

    hermione.only.in('hamburgerChrome');
    it('Меню видно при ширине < 576px', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store');
        //await browser.setMeta('foo', browser.findElement(By.className('Application-Menu')).isElementDisplayed);

        const menu = await browser.$('.Application-Menu');

        if (await menu.isDisplayed()) {
            throw new Error('Меню продолжает визуализироваться при ширине < 576px')
        }
    });
    
    hermione.only.in('hamburgerChrome');
    it('Меню возникает при клике на гамбургер', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store');
        //await browser.setMeta('foo', browser.findElement(By.className('Application-Menu')).isElementDisplayed);

        const toggler = await browser.$('.Application-Toggler');
        const menu = await browser.$('.Application-Menu');
        await toggler.click();

        if (!await menu.isDisplayed()) {
            throw new Error('Меню не появляется после клика по гамбургеру')
        }
    });

    hermione.only.in('hamburgerChrome');
    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store');
        //await browser.setMeta('foo', browser.findElement(By.className('Application-Menu')).isElementDisplayed);

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
        await browser.url('http://localhost:3000/hw/store');
    
        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });
});

describe('Тестирование каталога', async function() {
    hermione.only.in('defaultChrome');
    it('Отображаются ли товары, приходящие с сервера', async function({browser}) {
        await browser.url('http://localhost:3000/hw/store/catalog');

        throw new Error(ExampleStore.products);
    
        await browser.assertView('plain', 'html', {
            compositeImage: true,
        });
    });
});