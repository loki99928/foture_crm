import React, {FC} from 'react';
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";

import s from './SearchForm.module.scss'
import {fieldsSearchForm} from "../util/FormType";

const SearchForm: FC = () => {
    const {register, handleSubmit} = useForm<fieldsSearchForm>({
        mode: "all",
    });

    const onSubmit: SubmitHandler<fieldsSearchForm> = (data: { search: string }) => {
        console.log(data);
    };

    return (
        <React.Fragment>
            <form className={cn(s.formSearch, s.search__form)} onSubmit={handleSubmit(onSubmit)}>
                <input {...register('search', {required: true})}
                       className={s.searchField}
                       autoComplete="on"
                       placeholder="Search for results..."
                       type="text"
                />
                <button type='submit' className={s.btnSearch}>
                    <svg viewBox="0 0 50 50" width="50px" height="50px">
                        <path
                            d="M 21 3 C 11.654545 3 4 10.654545 4 20 C 4 29.345455 11.654545 37 21 37 C 24.701287 37 28.127393 35.786719 30.927734 33.755859 L 44.085938 46.914062 L 46.914062 44.085938 L 33.875 31.046875 C 36.43682 28.068316 38 24.210207 38 20 C 38 10.654545 30.345455 3 21 3 z M 21 5 C 29.254545 5 36 11.745455 36 20 C 36 28.254545 29.254545 35 21 35 C 12.745455 35 6 28.254545 6 20 C 6 11.745455 12.745455 5 21 5 z"/>
                    </svg>
                </button>
            </form>
        </React.Fragment>
    )
}

export default SearchForm;