import React, {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {fieldsUserSettingsForm} from "../util/FormType";
import {useDispatch} from "react-redux";
import Input from "../FomControls/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {validate} from "../util/Validate";

const SignupSchema = Yup.object().shape({
    email: validate.email,
    password: validate.password,
    double_password: validate.double_password,
    login: validate.login
});

const UserSetting: FC = () => {

    const dispatch = useDispatch()

    const {
        formState: {errors},
        ...handlers
    } = useForm<fieldsUserSettingsForm>({
        mode: "all",
        resolver: yupResolver(SignupSchema)
    });

    useEffect(() => {
        let arr = handlers.watch()
        // console.log(arr.email)
    })

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
            </form>
        </>
    )
}

export default UserSetting