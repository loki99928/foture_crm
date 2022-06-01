import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {IResponseServer} from "../../../types/ApiUsersTypes";
import {ConfirmUserApi} from "../../../redux/Thank/Auth";

let  UserConfirmationPage: React.FC = () => {

    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useDispatch()

    useEffect( () => {
        if (userId === undefined) return;
        let result = dispatch(ConfirmUserApi(userId)) as unknown as Promise<IResponseServer>
        result.then((res) => {
            navigate('/message', {
                state: {
                    type: 'confirmUser',
                    message: res.message,
                } })
        })
    })

    return (
        <main>
        </main>
    )
}

export default UserConfirmationPage