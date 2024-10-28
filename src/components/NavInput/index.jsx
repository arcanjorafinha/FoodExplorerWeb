import { Container } from "./styles";
import React from "react";

export function NavInput({ icon: Icon, label, ...rest }) {
    return (
        <Container>
            {Icon && <Icon size={24} />}
            <input {...rest} />
        </Container>
    )
}