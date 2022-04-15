import React from "react";
import {act, fireEvent, screen} from "@testing-library/react";

import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import {NewPassword} from "./NewPassword";

describe('NewPassword', () => {

    it('Snapshot', function () {
        const { asFragment } = renderWithRouter(<NewPassword/>)
        expect(asFragment()).toMatchSnapshot()
    })

    describe('input password', () => {

        it('have',  () => {
            renderWithRouter(<NewPassword/>)
            expect(screen.getByTestId('input_password')).toBeInTheDocument()
        })

        it('validate',  async () => {
            renderWithRouter(<NewPassword/>)
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
            renderWithRouter(<NewPassword/>)
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
            renderWithRouter(<NewPassword/>)
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

    describe('input double password', () => {

        it('have',  () => {
            renderWithRouter(<NewPassword/>)
            expect(screen.getByTestId('input_double_password')).toBeInTheDocument()
        })

        it('validate',  async () => {
            renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            const double_password = screen.getByTestId('input_double_password')
            await act( async () => {
                fireEvent.change(password, {
                    target: { value: '123pass456345' }
                })
            });
            await act( async () => {
                fireEvent.change(double_password, {
                    target: { value: '123pass456345' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(double_password)
            });
            expect(screen.queryByTestId("formTextError")).toBeNull();
        })

        it('different passwords',  async () => {
            renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            const double_password = screen.getByTestId('input_double_password')
            await act( async () => {
                fireEvent.change(password, {
                    target: { value: '123pass45634' }
                })
            });
            await act( async () => {
                fireEvent.change(double_password, {
                    target: { value: '123pass456345' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(double_password)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
        })

        it('too short', async () => {
            renderWithRouter(<NewPassword/>)
            const double_password = screen.getByTestId('input_double_password')
            await act( async () => {
                fireEvent.change(double_password, {
                    target: { value: 'lk' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(double_password)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent('Password mismatch');
        })

        it('too long', async () => {
            renderWithRouter(<NewPassword/>)
            const double_password = screen.getByTestId('input_double_password')
            await act( async () => {
                fireEvent.change(double_password, {
                    target: { value: '1232133554756786788566345345345345456756878989008907890678' }
                })
            });
            await act( async () => {
                fireEvent.focusOut(double_password)
            });
            expect(screen.queryByTestId("formTextError")).not.toBeNull();
            expect(screen.queryByTestId("formTextError")).toHaveTextContent('Password mismatch');
        })
    })

    describe('btn Send', () => {
        it('have btn Send', () => {
            renderWithRouter(<NewPassword/>)
            expect(screen.getByRole('button', { name: /Send/i} )).toBeInTheDocument()
        })
        it('not disabled', async () => {
            const { getByTestId } = renderWithRouter(<NewPassword/>)
            const btn = screen.getByRole('button', { name: /Send/i} )
            expect(btn).not.toBeDisabled()
        })
        it('disabled after error field of password', async () => {
            const { getByTestId } = renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act( async () => {
                fireEvent.blur(password)
            });
            expect(btn).toBeDisabled()
        })
        it('disabled after error field of double password', async () => {
            const { getByTestId } = renderWithRouter(<NewPassword/>)
            const double_password = screen.getByTestId('input_double_password')
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act( async () => {
                fireEvent.blur(double_password)
            });
            expect(btn).toBeDisabled()
        })
        it('not disabled after the error disappears', async () => {
            const { getByTestId } = renderWithRouter(<NewPassword/>)
            const password = screen.getByTestId('input_password')
            const double_password = screen.getByTestId('input_double_password')
            const btn = screen.getByRole('button', { name: /Send/i} )
            await act( async () => {
                fireEvent.blur(password)
            });
            await act( async () => {
                fireEvent.change(password, {
                    target: { value: '1234f2' }
                })
            });
            await act( async () => {
                fireEvent.change(double_password, {
                    target: { value: '1234f2' }
                })
            });
            expect(btn).not.toBeDisabled()
        })
        it('clicking on a button with an empty form', async () => {
            renderWithRouter(<NewPassword/>)
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
                renderWithRouter(<NewPassword/>)
                expect(screen.getByRole('link', {name: /registration/i}).closest('a')).toHaveAttribute('href', '/registration/')
            })
        })

        describe('forget', () => {
            it('to have',  () => {
                renderWithRouter(<NewPassword/>)
                expect(screen.getByRole('link', {name: /Authorize/i}).closest('a')).toHaveAttribute('href', '/auth/')
            })
        })
    })
})