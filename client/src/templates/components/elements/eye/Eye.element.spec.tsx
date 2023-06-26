import {act, fireEvent, screen} from "@testing-library/react";
import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Eye from "./Eye.element";

describe('Eye element', () => {

    const eventClick = jest.fn();
    let showPassword = false

    it('render', () => {
        renderWithRouter(<Eye eventClick={eventClick} showPassword={showPassword}/>)
    })

    it('to be classname eye_closed', () => {
        const {container} = renderWithRouter(<Eye eventClick={eventClick} showPassword={showPassword}/>)
        expect(container.getElementsByClassName("eye_closed").length).toBe(1);
        expect(container.getElementsByClassName("eye_open").length).toBe(0);
    })

    it('to be classname eye_open', () => {
        showPassword = true
        const {container} = renderWithRouter(<Eye eventClick={eventClick} showPassword={showPassword}/>)
        expect(container.getElementsByClassName("eye_open").length).toBe(1);
        expect(container.getElementsByClassName("eye_closed").length).toBe(0);
    })

    it('click on the btn', () => {

        const {container} = renderWithRouter(<Eye eventClick={eventClick} showPassword={showPassword}/>)
        const eye = screen.getByTestId('eye')
        act(() => {
            fireEvent.click(eye)
        })
        expect(eventClick).toHaveBeenCalledTimes(1)
    })
})