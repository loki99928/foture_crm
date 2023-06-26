import React, {FC, useEffect, useLayoutEffect} from "react";
import {useForm} from "react-hook-form";
import {fieldsUserSettingsForm} from "../util/FormType";
import {useDispatch, useSelector} from "react-redux";
import Input from "../FomControls/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {validate} from "../util/Validate";
import {Button} from "../FomControls/Button";
import {getIsLoad, getMessage} from "../../../../redux/reducer/auth/selectors";

const SignupSchema = Yup.object().shape({
    login: validate.login,
    email: validate.email,
    password: validate.password,
    double_password: validate.double_password,
});

const UserSetting: FC = () => {

    const dispatch = useDispatch()

    const {
        formState: {errors, isValid},
        ...handlers
    } = useForm<fieldsUserSettingsForm>({
        mode: "all",
        resolver: yupResolver(SignupSchema)
    });

    const message = useSelector(getMessage)
    const isLoad = useSelector(getIsLoad)

    return (
        <>
            <form action="">
                <Input errors={errors}
                       field='login'
                       handlers={handlers}
                       type='text'
                       label='Your name'/>
                <Input errors={errors}
                       field='email'
                       handlers={handlers}
                       type='text'
                       label='Your email'/>
                <Input errors={errors}
                       field='phone'
                       handlers={handlers}
                       type='phone'
                       label='Your phone'/>
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
                <Button disabled={isLoad || !isValid}/>
            </form>
        </>
    )
}

export default UserSetting