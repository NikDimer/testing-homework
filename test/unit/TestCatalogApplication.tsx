import React, { FC, useCallback, useState } from 'react';
import { Switch, Route } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import { Home } from '../../src/client/pages/Home';
import { Catalog } from '../../src/client/pages/Catalog';
import { Product } from '../../src/client/pages/Product';
import { Delivery } from '../../src/client/pages/Delivery';
import { Contacts } from '../../src/client/pages/Contacts';
import { Helmet } from 'react-helmet';
import { Cart } from '../../src/client/pages/Cart';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../src/client/store';

const bem = cn('TestCatalogApplication');

export const TestCatalogApplication: FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const cart = useSelector((s: ApplicationState) => s.cart);

    const toggle = useCallback(() => setCollapsed(!collapsed), [setCollapsed, collapsed]);
    const hide = useCallback(() => {
        if (process.env.BUG_ID === '4') {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    }, [setCollapsed]);

    const count = Object.keys(cart).length;
    const cartLabel = count ? `Cart (${count})` : 'Cart';
    const navbarClass = collapsed ? 'collapse navbar-collapse' : 'navbar-collapse';

    return <div className={bem()}>
        <Helmet titleTemplate="%s — Example store"/>
        <nav className="navbar navbar-expand-sm navbar-light bg-light" data-testid="header">
            <div className="container">
                <Link className={bem('Brand', ['navbar-brand'])} data-testid="home-logo-link" to="/">Example store</Link>
                <button className={bem('Toggler', ['navbar-toggler'])} data-testid='toggler' aria-label="Toggle navigation" onClick={toggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div data-testid='app-menu' className={bem('Menu', [navbarClass])}>
                    <div className="navbar-nav">
                        <NavLink className="nav-link" activeClassName="active" data-testid="nav-link" to="/catalog" onClick={hide}>Catalog</NavLink>
                        <NavLink className="nav-link" activeClassName="active" data-testid="nav-link" to="/delivery" onClick={hide}>Delivery</NavLink>
                        <NavLink className="nav-link" activeClassName="active" data-testid="nav-link" to="/contacts" onClick={hide}>Contacts</NavLink>
                        <NavLink className="nav-link" activeClassName="active" data-testid="nav-link" to="/cart" onClick={hide}>{cartLabel}</NavLink>
                    </div>
                </div>
            </div>
        </nav>
        <div className="container pt-4">
            <Switch>
                <Route path="/" exact component={Catalog} />
                <Route path="/catalog" exact component={Catalog} />
                <Route path="/catalog/:id" component={Product} />
                <Route path="/delivery" component={Delivery} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/cart" component={Cart} />
            </Switch>
        </div>
    </div>;
};
