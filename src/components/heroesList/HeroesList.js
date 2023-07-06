import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { createSelector } from '@reduxjs/toolkit'

import { heroesDelete, fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


import './heroList.scss'


const HeroesList = () => {

    const filterHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes
            } else if (filter !== 'all' && heroes !== []) {
                return heroes.filter(item => item.element === filter)
            } else if (heroes === []) {
                // } else if (!heroes.filter(item => item.element === filter)) {
                return heroes = []
            }
        }
    )

    const filteredHeroes = useSelector(filterHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);


    const onDeleteHero = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data => console.log(data))
            .then(dispatch(heroesDelete(id)))
            .catch(err => console.log(err))
    }, [])


    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }





    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={200}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDeleteHero={() => onDeleteHero(id)} />
                </CSSTransition>
            )
        })
    }



    return (
        <ul>
            <TransitionGroup component={"ul"}>
                {renderHeroesList(filteredHeroes)}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;