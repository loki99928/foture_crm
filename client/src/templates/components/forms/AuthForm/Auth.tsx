import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import cn from "classnames"
import {SubmitHandler, useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {TUser} from "../../../../redux/reducer/auth/types";
import {getIsLoad, getMessage} from "../../../../redux/reducer/auth/selectors";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {useClearForm} from "../../../../hooks/useClearForm";
import s from "../FomControls/Form.module.scss"
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {fieldsForm} from "../FomControls/FormType";
import Input from "../FomControls/Input";
import {Button} from "../FomControls/Button";
import {validate} from "../FomControls/Validate";
import {FieldError} from "../FomControls/FeidError";

const SignupSchema = Yup.object().shape({
    email: validate.email,
    password: validate.password
});

const Auth: React.FC = () => {

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
        dispatch(actionsAuth.authUserRequest(data))
    };

    return (
        <div className={s.blockForm}>
            <div className={s.formBanner}>
                <img src={bannerForm} alt=""/>
            </div>
            <div className={s.containerFields}>
                <h2 className={s.formTitle}>Authorize Info</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input errors={errors}
                           field='email'
                           handlers={handlers}
                           type='text'
                           label='Your email'/>
                    <Input errors={errors}
                           field='password'
                           handlers={handlers}
                           type='password'
                           label='Your password'/>
                    {message && <FieldError message={message}/>}
                    <Button disabled={isLoad || !isValid}/>
                </form>
                <div className={cn(s.formFooter, s.footer__form)}>
                    <NavLink to="/registration/">registration</NavLink>
                    <NavLink to="/forget/">forget password</NavLink>
                </div>
            </div>
        </div>
    );
}
export default Auth