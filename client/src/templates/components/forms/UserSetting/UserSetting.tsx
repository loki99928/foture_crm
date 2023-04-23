import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {fieldsForm} from "../util/FormType";
import {useDispatch} from "react-redux";
import Input from "../FomControls/Input";

const UserSetting: FC = () => {

    const dispatch = useDispatch()

    const {handleSubmit, formState: {errors, isValid}, ...handlers} = useForm<fieldsForm>({
        mode: "all",
        // resolver: yupResolver(SignupSchema)
    });

    const onSubmit: SubmitHandler<any> = (): void => {

    }

    return (
        <>
            <form action="" onSubmit={onSubmit}>
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