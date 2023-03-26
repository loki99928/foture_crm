import React from "react";
import {act, fireEvent, screen} from "@testing-library/react";

import Auth from "./Auth";
import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import {MESSAGE} from "../FomControls/FormType";

describe('AuthForm', () => {

    describe('input email', () => {

        it('have', function () {
            renderWithRouter(<Auth/>)
            expect(screen.queryByTestId('input_email')).toBeInTheDocument()
        })

        it('required', async () => {
            await act(async () => {
                const {getByTestId} = renderWithRouter(<Auth/>)
                const email = screen.getByTestId('input_email')
                fireEvent.blur(email)
                console.log(screen)
                debugger
                expect(getByTestId("formTextError")).not.toBe(null);
                expect(getByTestId("formTextError")).toHaveTextContent(MESSAGE.EMAIL_REQUIRED);
            });
        })

        it('validate', async () => {
            renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki99928@yandex.ru'}
                })
            });
            await act(async () => {
                fireEvent.focusOut(email)
            });
            expect(screen.queryByTestId("formTextError")).toBeNull();
        })

        it('not validate', async () => {
            renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki99928yandex'}
                })
            });
            await act(async () => {
                fireEvent.focusOut(email)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent(MESSAGE.EMAIL_TO_LONG);
        })

        it('too long', async () => {
            renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki999282342234234234346ty546547456456546/jkdxjlmnkfvbcvb@yandex.ru'}
                })
            });
            await act(async () => {
                fireEvent.focusOut(email)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent(MESSAGE.EMAIL_TO_SHORT);
        })
    })

    describe('input password', () => {

        it('have', () => {
            renderWithRouter(<Auth/>)
            expect(screen.getByTestId('input_password')).toBeInTheDocument()
        })

        it('validate', async () => {
            renderWithRouter(<Auth/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '123123aA@'}
                })
            });
            await act(async () => {
                fireEvent.focusOut(password)
            });
            expect(screen.queryByTestId("formTextError")).toBeNull();
        })

        it('too short', async () => {
            renderWithRouter(<Auth/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: 'lk'}
                })
            });
            await act(async () => {
                fireEvent.focusOut(password)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent(MESSAGE.PASSWORD_MIN_LENGTH);
        })

        it('too long', async () => {
            renderWithRouter(<Auth/>)
            const password = screen.getByTestId('input_password')
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '1232133554756786788566345345345345456756878989008907890678'}
                })
            });
            await act(async () => {
                fireEvent.focusOut(password)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent(MESSAGE.PASSWORD_MAX_LENGTH);
        })
    })

    describe('checkbox remember', () => {
        it('have', () => {
            renderWithRouter(<Auth/>)
            expect(screen.getByRole('checkbox', {name: /remember me/i})).toBeInTheDocument()
        })

        it('click', async () => {
            renderWithRouter(<Auth/>)
            const checkbox = screen.getByRole('checkbox', {name: /remember me/i})
            await act(async () => {
                checkbox.click()
            })
            expect(checkbox).toBeChecked()
        })
    })

    describe('btn Send', () => {
        it('have btn Send', () => {
            renderWithRouter(<Auth/>)
            expect(screen.getByRole('button', {name: /Send/i})).toBeInTheDocument()
        })
        it('not disabled', async () => {
            const {getByTestId} = renderWithRouter(<Auth/>)
            const btn = screen.getByRole('button', {name: /Send/i})
            expect(btn).not.toBeDisabled()
        })
        it('disabled after error field of email', async () => {
            const {getByTestId} = renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.blur(email)
            });
            expect(btn).toBeDisabled()
        })
        it('not disabled after the error disappears', async () => {
            const {getByTestId} = renderWithRouter(<Auth/>)
            const email = screen.getByTestId('input_email')
            const password = screen.getByTestId('input_password')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.blur(email)
            });
            await act(async () => {
                fireEvent.change(email, {
                    target: {value: 'loki99928@yandex.ru'}
                })
            });
            await act(async () => {
                fireEvent.change(password, {
                    target: {value: '123123aA@'}
                })
            });
            expect(btn).not.toBeDisabled()
        })
        it('disabled after error field of password', async () => {
            const {getByTestId} = renderWithRouter(<Auth/>)
            const password = screen.getByTestId('input_password')
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                fireEvent.blur(password)
            });
            expect(btn).toBeDisabled()
        })
        it('clicking on a button with an empty form', async () => {
            renderWithRouter(<Auth/>)
            const btn = screen.getByRole('button', {name: /Send/i})
            await act(async () => {
                btn.click()
            })
            expect(screen.getAllByTestId('formTextError').length).toBe(2)
        })
    })

    // todo-dv нужно разобраться как тестировать переход по ссылкам
    describe('link', () => {
        describe('registration', () => {
            it('to have', () => {
                renderWithRouter(<Auth/>)
                expect(screen.getByRole('link', {name: /registration/i}).closest('a')).toHaveAttribute('href', '/registration/')
            })
        })

        describe('forget', () => {
            it('to have', () => {
                renderWithRouter(<Auth/>)
                expect(screen.getByRole('link', {name: /forget password/i}).closest('a')).toHaveAttribute('href', '/forget/')
            })
        })
    })
})