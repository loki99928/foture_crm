import React, {useEffect, FC} from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import Message from "../../../components/main/Message";
import {getMessage} from "../../../../redux/reducer/auth/selectors";

const MessagePageContainer: FC = () => {

    const navigate = useNavigate()
    const message = useSelector(getMessage);

    useEffect(() => {
        if (message === undefined) {
            navigate('/404')
        }
    }, [])

    return (
        <main>
            <Message message={message}/>
        </main>
    )
}


export default MessagePageContainer;