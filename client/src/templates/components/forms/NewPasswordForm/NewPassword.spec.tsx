import React from "react";
import {act, fireEvent, screen} from "@testing-library/react";

import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import {NewPassword} from "./NewPassword";
import {MESSAGE} from "../FomControls/FormType";
import Forget from "../ForgetForm/Forget";

describe('NewPassword', () => {

    describe('input password', () => {

        it('have', () => {
            renderWithRouter(<NewPassword/>)
            expect(screen.getByTestId('input_password')).toBeInTheDocument()
        })

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
            expect(screen.queryByTestId("test_password")).not.toBeNull();
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
            expect(screen.queryByTestId("test_password")).not.toBeNull();
            expect(screen.queryByTestId("test_password")).toHaveTextContent(MESSAGE.PASSWORD_MAX_LENGTH);
        })
    })

    describe('input double password', () => {

        it('have', () => {
            renderWithRouter(<NewPassword/>)
            expect(screen.getByTestId('input_double_password')).toBeInTheDocument()
        })

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
            expect(screen.queryByTestId("test_double_password")).not.toBeNull();
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
            expect(screen.queryByTestId("test_double_password")).not.toBeNull();
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
            expect(screen.queryByTestId("test_double_password")).not.toBeNull();
            expect(screen.queryByTestId("test_double_password")).toHaveTextContent(MESSAGE.PASSWORD_MISMATCH);
        })
    })

    describe('btn Send', () => {
        it('have btn Send', () => {
            renderWithRouter(<NewPassword/>)
            expect(screen.getByRole('button', {name: /Send/i})).toBeInTheDocument()
        })
        it('btn disabled after loaded page', async () => {
            const {getByTestId} = renderWithRouter(<Forget/>)
            const btn = screen.getByRole('button', {name: /Send/i})
            expect(btn).toBeDisabled()
        })
        it('disabled after error field of password', async () => {
            const {getByTestId} = renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.blur(password)
            });
            expect(btn).toBeDisabled()
        })
        it('disabled after error field of double password', async () => {
            const {getByTestId} = renderWithRouter(<NewPassword/>)
            const double_password = screen.getByTestId('input_double_password')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.blur(double_password)
            });
            expect(btn).toBeDisabled()
        })
        it('not disabled after the error disappears', async () => {
            const {getByTestId} = renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            const double_password = screen.getByTestId('input_double_password')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.blur(password)
            });
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
            expect(btn).not.toBeDisabled()
        })
    })

    // todo-dv нужно разобраться как тестировать переход по ссылкам
    describe('link', () => {
        describe('registration', () => {
            it('to have', () => {
                renderWithRouter(<NewPassword/>)
                expect(screen.getByRole('link', {name: /registration/i}).closest('a')).toHaveAttribute('href', '/registration/')
            })
        })

        describe('forget', () => {
            it('to have', () => {
                renderWithRouter(<NewPassword/>)
                expect(screen.getByRole('link', {name: /Authorize/i}).closest('a')).toHaveAttribute('href', '/auth/')
            })
        })
    })
})