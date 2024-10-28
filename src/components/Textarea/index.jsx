import { Container } from "./styles";
import React from "react";

export function Textarea({ value, ...rest }) {
    return (
        <Container {...rest}>
            {value}
        </Container>
    );
}
