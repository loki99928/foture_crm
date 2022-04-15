import React from "react";
import {act, fireEvent, screen} from "@testing-library/react";

import Register from "./Register";
import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";

describe('RegisterForm', () => {

    it('Snapshot', function () {
        const { asFragment } = renderWithRouter(<Register/>)
        expect(asFragment()).toMatchSnapshot()
    })

    describe('input email', () => {

        it('have', function () {
            renderWithRouter(<Register/>)
            expect(screen.queryByTestId('input_email')).toBeInTheDocument()
        })

        it('required', async () => {
            const { getByTestId } = renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            await act( async () => {
                fireEvent.blur(email)
            });
            expect(getByTestId("formTextError")).not.toBe(null);
            expect(getByTestId("formTextError")).toHaveTextContent("Required");
        })

        it('validate', async () => {
            renderWithRouter(<Register/>)
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
            renderWithRouter(<Register/>)
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
            renderWithRouter(<Register/>)
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

    describe('input password', () => {

        it('have',  () => {
            renderWithRouter(<Register/>)
            expect(screen.getByTestId('input_password')).toBeInTheDocument()
        })

        it('validate',  async () => {
            renderWithRouter(<Register/>)
            const password = screen.getByTestId('input_password')
            await act( async () => {
                fireEvent.change(password, {
                    target: { value: '123pass456345' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(password)
            });
            expect(screen.queryByTestId("formTextError")).toBeNull();
        })

        it('too short', async () => {
            renderWithRouter(<Register/>)
            const password = screen.getByTestId('input_password')
            await act( async () => {
                fireEvent.change(password, {
                    target: { value: 'lk' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(password)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent('Too Short. Min length 5 symbol');
        })

        it('too long', async () => {
            renderWithRouter(<Register/>)
            const password = screen.getByTestId('input_password')
            await act( async () => {
                fireEvent.change(password, {
                    target: { value: '1232133554756786788566345345345345456756878989008907890678' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(password)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent('Too Long. Max length 50 symbol');
        })
    })

    describe('btn Send', () => {
        it('have btn Send', () => {
            renderWithRouter(<Register/>)
            expect(screen.getByRole('button', { name: /Send/i} )).toBeInTheDocument()
        })
        it('not disabled', async () => {
            const { getByTestId } = renderWithRouter(<Register/>)
            const btn = screen.getByRole('button', { name: /Send/i} )
            expect(btn).not.toBeDisabled()
        })
        it('disabled after error field of email', async () => {
            const { getByTestId } = renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act( async () => {
                fireEvent.blur(email)
            });
            expect(btn).toBeDisabled()
        })
        it('not disabled after the error disappears', async () => {
            const { getByTestId } = renderWithRouter(<Register/>)
            const email = screen.getByTestId('input_email')
            const password = screen.getByTestId('input_password')
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act( async () => {
                fireEvent.blur(email)
            });
            await act( async () => {
                fireEvent.change(email, {
                    target: { value: 'loki99928@yandex.ru' }
                })
            });
            await act( async () => {
                fireEvent.change(password, {
                    target: { value: '12356' }
                })
            });
            expect(btn).not.toBeDisabled()
        })
        it('disabled after error field of password', async () => {
            const { getByTestId } = renderWithRouter(<Register/>)
            const password = screen.getByTestId('input_password')
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act( async () => {
                fireEvent.blur(password)
            });
            expect(btn).toBeDisabled()
        })
        it('clicking on a button with an empty form', async () => {
            renderWithRouter(<Register/>)
            const btn = screen.getByRole('button', { name: /Send/i} )
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
                renderWithRouter(<Register/>)
                expect(screen.getByRole('link', {name: /Authorize/i}).closest('a')).toHaveAttribute('href', '/auth/')
            })
        })

        describe('forget', () => {
            it('to have',  () => {
                renderWithRouter(<Register/>)
                expect(screen.getByRole('link', {name: /forget password/i}).closest('a')).toHaveAttribute('href', '/forget/')
            })
        })
    })
})