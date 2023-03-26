import React, {useState} from "react";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

import s from "../FomControls/Form.module.scss"
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import bannerForm from "../../../assets/images/bg-head-form.jpg";
import {fieldsForm} from "../FomControls/FormType";
import Input from "../FomControls/Input";
import {validate} from "../FomControls/Validate";
import {FieldError} from "../FomControls/FeidError";
import {Button} from "../FomControls/Button";
import {getIsLoad, getMessage} from "../../../../redux/reducer/auth/selectors";
import {TUser} from "../../../../redux/reducer/auth/types";
import {useClearForm} from "../../../../hooks/useClearForm";

const SignupSchema = Yup.object().shape({
    email: validate.email
});

const Forget: React.FC = () => {

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
        dispatch(actionsAuth.forgetUserRequest(data))
    };

    return (
        <div className={s.blockForm}>
            <div className={s.formBanner}>
                <img src={bannerForm} alt=""/>
            </div>
            <div className={s.containerFields}>
                <h2 className={s.formTitle}>Forgotten Your Password?</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        errors={errors}
                        field='email'
                        handlers={handlers}
                        type='text'
                        label='Your email'/>
                    {message && <FieldError message={message}/>}
                    <Button disabled={isLoad || !isValid}/>
                </form>
                <div className={cn(s.formFooter, s.footer__form)}>
                    <NavLink to="/auth/">Authorize</NavLink>
                    <NavLink to="/registration/">registration</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Forget

