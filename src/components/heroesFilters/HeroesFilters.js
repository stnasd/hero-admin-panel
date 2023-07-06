
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { activeFilterChanged, fetchFilters } from './heroesFiltersSlice'
import classNames from 'classnames';
import Spinner from "../spinner/Spinner";


const HeroesFilters = () => {
    const { filters, activeFilter, filtersLoadingStatus } = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, [])

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filtersButton = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({ name, className, label }) => {

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button
                key={name}
                id={name}
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(name))}
            >{label}</button>
        })
    }
    const buttonElems = filtersButton(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttonElems}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;