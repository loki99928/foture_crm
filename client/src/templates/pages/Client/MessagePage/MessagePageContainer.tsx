import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import Message from "../../../components/content/Message/Message";
import {getMessage} from "../../../../redux/reducer/auth/selectors";

let MessagePageContainer: React.FC=  () => {

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

export default MessagePageContainer