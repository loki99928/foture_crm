import React from "react";
import {act, fireEvent, screen} from "@testing-library/react";

import Forget from "./";
import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import {MESSAGE} from "../FomControls/FormType";

describe('ForgetForm', (): void => {

    describe('input email', (): void => {

        it('have', function (): void {
            renderWithRouter(<Forget/>)
            expect(screen.queryByTestId('input_email')).toBeInTheDocument()
        })

        it('required', async (): Promise<void> => {
            const {getByTestId} = renderWithRouter(<Forget/>)
            const email: HTMLElement = screen.getByTestId('input_email')
            await act(async (): Promise<void> => {
                fireEvent.blur(email)
            });
            expect(getByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_REQUIRED);
        })

        it('validate', async (): Promise<void> => {
            renderWithRouter(<Forget/>)
            const email: HTMLElement = screen.getByTestId('input_email')
            await act(async (): Promise<void> => {
                fireEvent.change(email, {
                    target: {value: 'loki99928@yandex.ru'}
                })
            });
            expect(screen.queryByTestId("test_email")).toBeNull();
        })

        it('not validate', async (): Promise<void> => {
            renderWithRouter(<Forget/>)
            const email: HTMLElement = screen.getByTestId('input_email')
            await act(async (): Promise<void> => {
                fireEvent.change(email, {
                    target: {value: 'loki99928yandex'}
                })
            });
            expect(screen.queryByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_IS_NOT_VALID);
        })

        it('too long', async (): Promise<void> => {
            renderWithRouter(<Forget/>)
            const email: HTMLElement = screen.getByTestId('input_email')
            await act(async (): Promise<void> => {
                fireEvent.change(email, {
                    target: {value: 'loki999282342234234234346ty546547456456546/jkdxjlmnkfvbcvb@yandex.ru'}
                })
            });
            expect(screen.queryByTestId("test_email")).toHaveTextContent(MESSAGE.EMAIL_TO_LONG);
        })
    })

    describe('btn Send', (): void => {
        it('have btn Send', (): void => {
            renderWithRouter(<Forget/>)
            expect(screen.getByRole('button', {name: /Send/i})).toBeInTheDocument()
        })
        it('btn disabled after loaded page', async (): Promise<void> => {
            renderWithRouter(<Forget/>)
            const btn: HTMLElement = screen.getByRole('button', {name: /Send/i})
            expect(btn).toBeDisabled()
        })
        it('disabled after error field of email', async (): Promise<void> => {
            renderWithRouter(<Forget/>)
            const email: HTMLElement = screen.getByTestId('input_email')
            const btn: HTMLElement = screen.getByRole('button', {name: /Send/i})
            await act(async (): Promise<void> => {
                fireEvent.blur(email)
            });
            expect(btn).toBeDisabled()
        })
        it('not disabled after the error disappears', async (): Promise<void> => {
            renderWithRouter(<Forget/>)
            const email: HTMLElement = screen.getByTestId('input_email')
            const btn: HTMLElement = screen.getByRole('button', {name: /Send/i})
            await act(async (): Promise<void> => {
                fireEvent.blur(email)
                fireEvent.change(email, {
                    target: {value: 'loki99928@yandex.ru'}
                })
            });
            expect(btn).not.toBeDisabled()
        })
    })

    // todo-dv нужно разобраться как тестировать переход по ссылкам
    describe('link', (): void => {
        describe('registration', (): void => {
            it('to have', (): void => {
                renderWithRouter(<Forget/>)
                expect(screen.getByRole('link', {name: /registration/i}).closest('a')).toHaveAttribute('href', '/registration/')
            })
        })

        describe('forget', (): void => {
            it('to have', (): void => {
                renderWithRouter(<Forget/>)
                expect(screen.getByRole('link', {name: /Authorize/i}).closest('a')).toHaveAttribute('href', '/auth/')
            })
        })
    })
})