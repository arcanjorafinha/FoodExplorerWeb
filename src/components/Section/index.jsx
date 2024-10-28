import { Container } from './styles';
import React from "react";

export function Section({ title, children }) {
    return (
        <Container>
            <h2>{title}</h2>
            {children}
        </Container>
    )
}