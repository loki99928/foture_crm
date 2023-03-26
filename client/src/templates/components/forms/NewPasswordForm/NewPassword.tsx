import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import cn from "classnames"
import * as Yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {yupResolver} from "@hookform/resolvers/yup";

import s from "../FomControls/Form.module.scss"
import bannerForm from "../../../assets/images/bg-head-form.jpg"
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import Input from "../FomControls/Input";
import {validate} from "../FomControls/Validate";
import {FieldError} from "../FomControls/FeidError";
import {Button} from "../FomControls/Button";
import {fieldsForm} from "../FomControls/FormType";
import {getIsLoad, getMessage} from "../../../../redux/reducer/auth/selectors";
import {TUser} from "../../../../redux/reducer/auth/types";
import {useClearForm} from "../../../../hooks/useClearForm";

const SignupSchema = Yup.object().shape({
    password: validate.password,
    double_password: validate.double_password
});

export const NewPassword: React.FC = () => {

    useClearForm()

    const {handleSubmit, formState: {errors, isValid}, ...handlers} = useForm<fieldsForm>({
        mode: "all",
        resolver: yupResolver(SignupSchema)
    });

    const dispatch = useDispatch()
    const message = useSelector(getMessage)
    const isLoad = useSelector(getIsLoad)

    const [isDisabled, setDisabled] = useState(false)

    const onSubmit: SubmitHandler<fieldsForm> = (data: TUser) => {
        setDisabled(true)
        dispatch(actionsAuth.createNewPasswordResponse(data))
    };
    return (
        <div className={s.blockForm}>
            <div className={s.formBanner}>
                <img src={bannerForm} alt=""/>
            </div>
            <div className={s.containerFields}>
                <h2 className={s.formTitle}>Create New Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input errors={errors}
                           field='password'
                           handlers={handlers}
                           type='password'
                           label='Your password'/>
                    <Input errors={errors}
                           field='double_password'
                           handlers={handlers}
                           type='password'
                           label='Password confirmation'/>
                    <FieldError message={message}/>
                    <Button disabled={isLoad || !isValid}/>
                </form>
                <div className={cn(s.formFooter, s.footer__form)}>
                    <NavLink to="/auth/">Authorize</NavLink>
                    <NavLink to="/registration/">Registration</NavLink>
                </div>
            </div>
        </div>
    )
}
