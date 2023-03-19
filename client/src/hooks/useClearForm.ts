import {useEffect} from "react";
import {actionsAuth} from "../redux/reducer/auth/actions";
import {useDispatch} from "react-redux";

/**
 * очищаем данные state для form
 */
export const useClearForm = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionsAuth.clearForm())
    }, [])
}