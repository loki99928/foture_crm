import React from "react";
import {act, fireEvent, screen} from "@testing-library/react";

import Forget from "./Forget";
import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";

describe('ForgetForm', () => {

    it('Snapshot', function () {
        const { asFragment } = renderWithRouter(<Forget/>)
        expect(asFragment()).toMatchSnapshot()
    })

    describe('input email', () => {

        it('have', function () {
            renderWithRouter(<Forget/>)
            expect(screen.queryByTestId('input_email')).toBeInTheDocument()
        })

        it('required', async () => {
            const { getByTestId } = renderWithRouter(<Forget/>)
            const email = screen.getByTestId('input_email')
            await act( async () => {
                fireEvent.blur(email)
            });
            expect(getByTestId("formTextError")).not.toBe(null);
            expect(getByTestId("formTextError")).toHaveTextContent("Required");
        })

        it('validate', async () => {
            renderWithRouter(<Forget/>)
            const email = screen.getByTestId('input_email')
            await act( async () => {
                fireEvent.change(email, {
                    target: { value: 'loki99928@yandex.ru' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(email)
            });
            expect(screen.queryByTestId("formTextError")).toBeNull();
        })

        it('not validate', async () => {
            renderWithRouter(<Forget/>)
            const email = screen.getByTestId('input_email')
            await act( async () => {
                fireEvent.change(email, {
                    target: { value: 'loki99928yandex' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(email)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent('Not a valid email');
        })

        it('too long', async () => {
            renderWithRouter(<Forget/>)
            const email = screen.getByTestId('input_email')
            await act( async () => {
                fireEvent.change(email, {
                    target: { value: 'loki999282342234234234346ty546547456456546/jkdxjlmnkfvbcvb@yandex.ru' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(email)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent('Too Long!');
        })
    })

    describe('btn Send', () => {
        it('have btn Send', () => {
            renderWithRouter(<Forget/>)
            expect(screen.getByRole('button', { name: /Send/i} )).toBeInTheDocument()
        })
        it('not disabled', async () => {
            const { getByTestId } = renderWithRouter(<Forget/>)
            const btn = screen.getByRole('button', { name: /Send/i} )
            expect(btn).not.toBeDisabled()
        })
        it('disabled after error field of email', async () => {
            const { getByTestId } = renderWithRouter(<Forget/>)
            const email = screen.getByTestId('input_email')
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act( async () => {
                fireEvent.blur(email)
            });
            expect(btn).toBeDisabled()
        })
        it('not disabled after the error disappears', async () => {
            const { getByTestId } = renderWithRouter(<Forget/>)
            const email = screen.getByTestId('input_email')
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act( async () => {
                fireEvent.blur(email)
            });
            await act( async () => {
                fireEvent.change(email, {
                    target: { value: 'loki99928@yandex.ru' }
                })
            });
            expect(btn).not.toBeDisabled()
        })
        it('clicking on a button with an empty form', async () => {
            renderWithRouter(<Forget/>)
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act(async () => {
                btn.click()
            })
            expect(screen.getAllByTestId('formTextError').length).toBe(1)
        })
    })

    // todo-dv нужно разобраться как тестировать переход по ссылкам
    describe('link', () => {
        describe('registration', () => {
            it('to have', () => {
                renderWithRouter(<Forget/>)
                expect(screen.getByRole('link', {name: /registration/i}).closest('a')).toHaveAttribute('href', '/registration/')
            })
        })

        describe('forget', () => {
            it('to have',  () => {
                renderWithRouter(<Forget/>)
                expect(screen.getByRole('link', {name: /Authorize/i}).closest('a')).toHaveAttribute('href', '/auth/')
            })
        })
    })
})