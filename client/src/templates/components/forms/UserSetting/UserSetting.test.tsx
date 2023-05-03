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
        expect(screen.getByTestId('input_password')).toBeInTheDocument()
        expect(screen.getByTestId('input_double_password')).toBeInTheDocument()
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

    describe('input password', (): void => {

        it('validate', async () => {
            renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '123123aA@'}
                })
            });
            expect(screen.queryByTestId("test_password")).toBeNull();
        })

        it('too short', async () => {
            renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: 'lk'}
                })
            });
            expect(screen.queryByTestId("test_password")).toHaveTextContent(MESSAGE.PASSWORD_MIN_LENGTH);
        })

        it('too long', async () => {
            renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '1232133554756786788566345345345345456756878989008907890678'}
                })
            });
            expect(screen.queryByTestId("test_password")).toHaveTextContent(MESSAGE.PASSWORD_MAX_LENGTH);
        })
    })

    describe('input double password', (): void => {

        it('validate', async () => {
            renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            const double_password = screen.getByTestId('input_double_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '123123aA@'}
                })
            });
            await act(async () => {
                fireEvent.change(double_password, {
                    target: {value: '123123aA@'}
                })
            });
            expect(screen.queryByTestId("test_password")).toBeNull();
            expect(screen.queryByTestId("test_double_password")).toBeNull();
        })

        it('different passwords', async () => {
            renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            const double_password = screen.getByTestId('input_double_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '123123aA@'}
                })
                fireEvent.change(double_password, {
                    target: {value: '123pass456345'}
                })
            });
            expect(screen.queryByTestId("test_double_password")).toHaveTextContent(MESSAGE.PASSWORD_MISMATCH);
        })

        it('too short', async () => {
            renderWithRouter(<NewPassword/>)
            const double_password = screen.getByTestId('input_double_password')
            await act(async () => {
                fireEvent.change(double_password, {
                    target: {value: 'lk'}
                })
            });
            expect(screen.queryByTestId("test_double_password")).toHaveTextContent(MESSAGE.PASSWORD_MISMATCH);
        })

        it('too long', async () => {
            renderWithRouter(<NewPassword/>)
            const double_password = screen.getByTestId('input_double_password')
            await act(async () => {
                fireEvent.change(double_password, {
                    target: {value: '1232133554756786788566345345345345456756878989008907890678'}
                })
            });
            expect(screen.queryByTestId("test_double_password")).toHaveTextContent(MESSAGE.PASSWORD_MISMATCH);
        })
    })

})