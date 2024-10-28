import { Container } from "./styles";
import React from "react";

export function ButtonText({ title, isActive = false, ...rest }) {
    return (
        <Container
            type="button"
            $isactive={isActive.toString()}
            {...rest}
        >
            {title}
        </Container>
    )
};