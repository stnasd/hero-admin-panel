import { configureStore } from '@reduxjs/toolkit'


import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/heroesFiltersSlice';

const stringMidleWare = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: { heroes: heroes, filters: filters },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMidleWare),
    devTools: process.env.NODE_ENV !== 'production',
})


export default store;