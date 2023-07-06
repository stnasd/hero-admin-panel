

import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addHero } from '../heroesList/heroesSlice';


const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [skills, setSkills] = useState('');
    const [element, setElement] = useState('');



    const { filters, filtersLoadingStatus } = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSumbitHandler = (e) => {
        e.preventDefault();
        const hero = {
            id: uuidv4(),
            name: heroName,
            description: skills,
            element: element
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
            .then(res => console.log(res))
            .then(dispatch(addHero(hero)))
            .catch(err => console.log(err, 'Ошибка запроса'))

        setHeroName('');
        setSkills('');
        setElement('');
    }

    const renderFilters = (filters, filtersLoadingStatus) => {
        if (filtersLoadingStatus === 'loading') {
            return <option>Загрузка элементов</option>
        } else if (filtersLoadingStatus === 'error') {
            return <option>Ошибка загрузки элементов</option>
        } else if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    const elemsFilters = renderFilters(filters, filtersLoadingStatus);
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => onSumbitHandler(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}>
                    <option value=''>Я владею элементом</option>
                    {elemsFilters}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;