import React, { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesAPI';
import TypeApi from './api/TypeAPI';
import OrderApi from './api/OrderAPI';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token');

                setToken(res?.data?.accesstoken);
                // console.log(res);

                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 * 1000);
            };
            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        typesAPI: TypeApi(),
        orderAPI: OrderApi(),
    };

    return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
