var chai = require('chai');
var expect = chai.expect;
import test from '@jest/globals';
  

import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';
import events from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/client/index.css';




describe('Общие требования', () => {
    it('в шапке отображаются ссылки', () => {
        const basename = '/hw/store';

        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        const {container, getByTestId, getAllByTestId} = render(application);
        //console.log(container.outerHTML)

        //screen.logTestingPlaygroundURL(container);

        const header = getByTestId('header');

        const links = within(header).getAllByTestId('nav-link');

        expect(links[0].getAttribute('href') === '/hw/store/catalog');
        expect(links[1].getAttribute('href') === '/hw/store/delivery');
        expect(links[2].getAttribute('href') === '/hw/store/contacts');
        expect(links[3].getAttribute('href') === '/hw/store/cart');
        expect(links[0].textContent === 'Catalog');
        expect(links[1].textContent === 'Delivery');
        expect(links[2].textContent === 'Contacts');
        expect(links[3].textContent === 'Cart');
    });

    it('название магазина - ссылка на главную страницу', () => {
        const basename = '/hw/store';

        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );
        
        const {container, getByTestId, getAllByTestId} = render(application);

        //console.log(container.outerHTML)

        //screen.logTestingPlaygroundURL(container);

        const homeLink = getByTestId('home-logo-link');

        expect(homeLink.getAttribute('href') === '/hw/store/');
    });

});