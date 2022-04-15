import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import Message from "../../components/content/Message/Message";

let MessagePageContainer: React.FC=  () => {

    type state = {
        message: string
    }

    const navigate = useNavigate()
    const { state } = useLocation();
    const [message, setMessage] = useState<string>('');

    // todo-dv разобраться с ошибкой

    // подтверждение почты пользователя при регистрации
    function confirmUser() {
        // @ts-ignore
        setMessage(state.message)
    }

    // запрос на подтверждения почты при регистрации
    function sendMail(): void {
        setMessage('A message has been sent to your mail to confirm the mail.')
    }

    // запрос на восстановление пароля
    function forgetPassword(): void {
        setMessage('A message has been sent to your mail to reset your password.')
    }

    // Сохранение нового пароля
    function newPassword(): void {
        setMessage('Password changed.')
    }

    useEffect(() => {
        // @ts-ignore
        if (!state?.type) {
            navigate('/404')
        }
    })

    useEffect(() => {
        // @ts-ignore
        switch (state?.type) {
            case 'confirmUser':
                confirmUser()
                break;
            case 'sendMail':
                sendMail()
                break;
            case 'forgetPassword':
                forgetPassword()
                break;
            case 'newPassword':
                newPassword()
                break;
        }
    });

    return (
        <main>
            <Message message={message}/>
        </main>
    )
}

export default MessagePageContainer