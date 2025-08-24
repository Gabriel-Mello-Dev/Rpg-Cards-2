// src/context/CartasContext.jsx
import React, { createContext, useContext, useState } from "react";

// Criando o contexto
const CartasContext = createContext();

export const CartasProvider = ({ children }) => {
  const [cartas, setCartas] = useState([]);

  const adicionarCarta = (novaCarta) => {
    setCartas((prev) => [...prev, novaCarta]);
  };

  // Remover carta pelo nome
  const removerCarta = (nome) => {
    setCartas((prev) => prev.filter((carta) => carta.nome !== nome));
  };

  const atualizarCarta = (nome, dadosAtualizados) => {
    setCartas((prev) =>
      prev.map((carta) =>
        carta.nome === nome ? { ...carta, ...dadosAtualizados } : carta
      )
    );
  };

  return (
    <CartasContext.Provider
      value={{ cartas, adicionarCarta, removerCarta, atualizarCarta }}
    >
      {children}
    </CartasContext.Provider>
  );
};

// Hook para usar o contexto
export const useCartas = () => useContext(CartasContext);
