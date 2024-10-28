import { Container } from "./styles";
import React from "react";

export function Tag({ title, ...rest }) {
    return (
        <Container {...rest}>
            {title}
        </Container>
    )
}