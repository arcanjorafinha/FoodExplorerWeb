import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { Container, Main } from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Order } from "../../components/Order";
import { PaymentBox } from "../../components/PaymentBox";
import { useCart } from "../../hooks/cart";
import React from "react";

export function Orders() {
    const [data, setData] = useState(null);
    const [total, setTotal] = useState(0);
    const { updateCartCount } = useCart();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        async function fetchOrder() {
            const response = await api.get('/orders');
            const orderData = response.data;

            setData(orderData);

            const orderTotal = orderData.items.reduce((acc, item) => {
                const price = parseFloat(item.price.replace(',', '.'));
                return acc + price * item.quantity;
            }, 0);

            setTotal(orderTotal);
        }

        fetchOrder();
    }, []);

    function handleRemoveItem(itemId) {
        api.delete(`/orders/items/${itemId}`)
            .then(() => {
                setData((prevData) => ({
                    ...prevData,
                    items: prevData.items.filter(item => item.id !== itemId)
                }));

                setTotal((prevTotal) => {
                    const removedItem = data.items.find(item => item.id === itemId);
                    const removedItemPrice = parseFloat(removedItem.price.replace(',', '.'));
                    return prevTotal - removedItemPrice * removedItem.quantity;
                });

                updateCartCount(data.items.length - 1);
            })
            .catch(error => {
                console.error("Erro ao remover item:", error);
            });
    }

    return (
        <Container>
            <Header />
            {!data ? (
                <p>Carregando...</p>
            ) : (
                <Main key={data.id}>
                    <div className="orders">
                        <h2>Meu Pedido</h2>
                        <div>
                            {data.items.map((item) => (
                                <Order
                                    key={item.id}
                                    order={item}
                                    onRemove={handleRemoveItem}
                                />
                            ))}
                        </div>
                        <h3>Total: R$ {total.toFixed(2)}</h3>
                    </div>
                    <div className="payment">
                        <h2>Pagamento</h2>
                        <PaymentBox />
                    </div>
                </Main>
            )}
            <Footer />
        </Container>
    );
}
