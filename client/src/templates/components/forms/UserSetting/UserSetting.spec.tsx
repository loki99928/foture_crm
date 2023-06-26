import {act, fireEvent, screen} from "@testing-library/react";

import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import UserSetting from "./";
import {MESSAGE} from "../util/FormType";
import React from "react";
import NewPassword from "../NewPasswordForm";
import Auth from "../AuthForm";

describe('User setting form', () => {

    it('render required fields', () => {
        renderWithRouter(<UserSetting/>)
        expect(screen.getByTestId('input_login')).toBeInTheDocument()
        expect(screen.getByTestId('input_email')).toBeInTheDocument()
        expect(screen.getByTestId('input_phone')).toBeInTheDocument()
    })

    describe('input email', (): void => {

        it('required', async () => {
            renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.blur(email)
            });
            expect(screen.getByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_REQUIRED);
        })

        it('validate', async () => {
            renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki99928@yandex.ru'}
                })
            });
            expect(screen.queryByTestId("test_email")).toBeNull();
        })

        it('not validate', async () => {
            renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki99928yandex'}
                })
            });
            expect(screen.queryByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_IS_NOT_VALID);
        })

        it('too long', async () => {
            renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki999282342234234234346ty546547456456546/jkdxjlmnkfvbcvb@yandex.ru'}
                })
            });
            expect(screen.queryByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_TO_LONG);
        })
    })
    describe('login', () => {

        it('required', async () => {
            renderWithRouter(<UserSetting/>)
            const login = screen.getByTestId('input_login')
            await act(async () => {
                fireEvent.blur(login)
            })
            expect(screen.getByTestId("test_login")).toHaveTextContent(MESSAGE.EMAIL_REQUIRED);
        })

    })

})