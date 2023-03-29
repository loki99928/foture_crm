import React from "react";
import {act, fireEvent, screen} from "@testing-library/react";

import Register from "./";
import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import {MESSAGE} from "../FomControls/FormType";

describe('RegisterForm', () => {

    describe('input email', () => {

        it('have', async () => {
            await act(async () => {
                renderWithRouter(<Register/>)
                expect(screen.queryByTestId('input_email')).toBeInTheDocument()
            })
        })

        it('required', async () => {
            renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.blur(email)
            });
            expect(screen.queryByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_REQUIRED);
        })

        it('validate', async () => {
            renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki99928@yandex.ru'}
                })
            });
            expect(screen.queryByTestId("test_email")).toBeNull();
        })

        it('not validate', async () => {
            renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki99928yandex'}
                })
            });
            expect(screen.queryByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_IS_NOT_VALID);
        })

        it('too long', async () => {
            renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki999282342234234234346ty546547456456546/jkdxjlmnkfvbcvb@yandex.ru'}
                })
            });
            expect(screen.queryByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_TO_LONG);
        })
    })

    describe('input password', () => {

        it('have', async () => {
            await act(async () => {
                renderWithRouter(<Register/>)
                expect(screen.getByTestId('input_password')).toBeInTheDocument()
            })
        })

        it('validate', async () => {
            renderWithRouter(<Register/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '123123aA@'}
                })
            });
            expect(screen.queryByTestId("test_password")).toBeNull();
        })

        it('too short', async () => {
            renderWithRouter(<Register/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: 'lk'}
                })
            });
            expect(screen.queryByTestId("test_password")).toHaveTextContent(MESSAGE.PASSWORD_MIN_LENGTH);
        })

        it('too long', async () => {
            renderWithRouter(<Register/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '1232133554756786788566345345345345456756878989008907890678'}
                })
            });
            expect(screen.queryByTestId("test_password")).toHaveTextContent(MESSAGE.PASSWORD_MAX_LENGTH);
        })
    })

    describe('btn Send', () => {
        it('have btn Send', async () => {
            await act(async () => {
                renderWithRouter(<Register/>)
                expect(screen.getByRole('button', {name: /Send/i})).toBeInTheDocument()
            })
        })
        it('btn disabled after loaded page', async () => {
            await act(async () => {
                renderWithRouter(<Register/>)
                const btn = screen.getByRole('button', {name: /Send/i})
                expect(btn).toBeDisabled()
            })
        })
        it('disabled after error field of email', async () => {
            renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.blur(email)
            });
            expect(btn).toBeDisabled()
        })
        it('not disabled after the error disappears', async () => {
            renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            const password = screen.getByTestId('input_password')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki99928@yandex.ru'}
                })
                fireEvent.change(password, {
                    target: {value: '123123aA@'}
                })
            });
            expect(btn).not.toBeDisabled()
        })
        it('disabled after error field of password', async () => {
            renderWithRouter(<Register/>)
            const password = screen.getByTestId('input_password')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.blur(password)
            });
            expect(btn).toBeDisabled()
        })
    })

    // todo-dv нужно разобраться как тестировать переход по ссылкам
    describe('link', () => {
        describe('registration', () => {
            it('to have', async () => {
                await act(async () => {
                    renderWithRouter(<Register/>)
                    expect(screen.getByRole('link', {name: /Authorize/i}).closest('a')).toHaveAttribute('href', '/auth/')
                })
            })
        })

        describe('forget', () => {
            it('to have', async () => {
                await act(async () => {
                    renderWithRouter(<Register/>)
                    expect(screen.getByRole('link', {name: /forget password/i}).closest('a')).toHaveAttribute('href', '/forget/')
                })
            })
        })
    })
})