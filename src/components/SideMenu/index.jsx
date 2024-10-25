import { useState } from "react";
import { Container, MenuContent, Overlay, CloseButton } from "./styles";
import { NavInput } from "../../components/NavInput";
import { FiSearch } from 'react-icons/fi';
import SignOut from "../../assets/icons/SignOut.svg";
import CloseOut from "../../assets/icons/Close.svg";
import { Footer } from "../../components/Footer"
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { USER_ROLE } from "../../utils/roles";

export function SideMenu({ isOpen, onClose, onSearch }) {
    const { signOut } = useAuth();
    const navigation = useNavigate();
    const { user } = useAuth();

    function handleSignOut() {
        signOut();
        onClose();
    }

    function handleNewPlate() {
        navigation("/New")
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <>
            <Overlay onClick={onClose} />
            <Container>
                <CloseButton>
                    <img src={CloseOut} onClick={onClose} alt="" />
                    Menu
                </CloseButton>
                <MenuContent>
                    <NavInput
                        icon={FiSearch}
                        type="text"
                        placeholder="Busque por pratos ou ingredientes"
                        onChange={e => onSearch(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    {user.role === USER_ROLE.ADMIN ? (
                        <div className="sideOptions">
                            <button onClick={handleNewPlate}>
                                <p>Novo Prato</p>
                            </button>
                            <button onClick={handleSignOut}>
                                <p>Sair</p>
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleSignOut}>
                            <img src={SignOut} alt="Sair" />
                            <p>Sair</p>
                        </button>
                    )}
                </MenuContent>
                <Footer />
            </Container>
        </>
    );
}
