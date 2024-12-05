import styled from "styled-components";

export const BaseButton = styled.button`
font-weight: 600;
    cursor: pointer;
    border-radius: 50rem !important;
    text-transform: uppercase !important;
    padding-top: .5rem !important;
    padding-bottom: .5rem !important;
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
    display: inline-block;
    line-height: 1.5;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    font-size: 1rem;
    transition: all ease 0.4s;


`
export const PrimereyBtn = styled(BaseButton)`
background-color: ${props => props.disabled ? 'gray' : 'white'}
color: black;
border: 1px solid gold;

&:hover {
    color: black;
    background: ${props => props.disabled ? 'gray' : 'green'}
}
`

export const SecondaryBtn = styled(BaseButton)`
    background-color: ${props => props.disabled ? 'gray' : 'orange'};
    color: black;
    border: 1px solid black;

    &:hover {
        color: ${props => props.disabled ? 'gray' : 'green'}
    
    }`
