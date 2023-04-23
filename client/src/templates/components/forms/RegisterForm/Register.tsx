import React, {useState, FC} from "react";
import cn from "classnames"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import * as Yup from "yup";

import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {getIsLoad, getMessage} from "../../../../redux/reducer/auth/selectors";
import s from "../util/Form.module.scss"
import Input from "../FomControls/Input";
import {FieldError} from "../FomControls/FeidError";
import {Button} from "../FomControls/Button";
import {fieldsForm} from "../util/FormType";
import {TUser} from "../../../../redux/reducer/auth/types";
import {yupResolver} from "@hookform/resolvers/yup";
import {validate} from "../util/Validate";
import {useClearForm} from "../../../../hooks/useClearForm";

const SignupSchema = Yup.object().shape({
    email: validate.email,
    password: validate.password
});

const Register: FC = () => {

    useClearForm()

    const {handleSubmit, formState: {errors, isValid}, ...handlers} = useForm<fieldsForm>({
        // defaultValues: {
        //     email: 'loki99928@yandex.ru',
        //     password: '123Qw@',
        // },
        mode: "all",
        resolver: yupResolver(SignupSchema)
    });

    const dispatch = useDispatch()
    const message = useSelector(getMessage)
    const isLoad = useSelector(getIsLoad)

    const onSubmit: SubmitHandler<fieldsForm> = (data: TUser) => {
        dispatch(actionsAuth.registerUserRequest(data))
    };

    return (
        <div className={s.blockForm}>
            <div className={s.formBanner}>
                <img src={bannerForm} alt=""/>
            </div>
            <div className={s.containerFields}>
                <h2 className={s.formTitle}>Registration Info</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        errors={errors}
                        field='email'
                        handlers={handlers}
                        label='Your email'/>
                    <Input
                        errors={errors}
                        field='password'
                        handlers={handlers}
                        type='password'
                        label='Your password'/>
                    {message && <FieldError message={message}/>}
                    <Button disabled={isLoad || !isValid}/>
                </form>
                <div className={cn(s.formFooter, s.footer__form)}>
                    <NavLink to="/auth/">Authorize</NavLink>
                    <NavLink to="/forget/">forget password</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Register
