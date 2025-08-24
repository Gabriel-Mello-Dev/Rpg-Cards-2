import { useState, useEffect } from "react";
import style from "./style.module.css";

const Cards = ({ tipo, index }) => {
  const [carta, setCarta] = useState({
    nome: "",
    tipoPromessa: "",
    oqfazer: "",
    vantagem1: "",
    vantagem2: "",
    vantagem3: "",
    desvantagem: "",
  });

  // Carregar carta salva no localStorage ao montar
  useEffect(() => {
    const cartasSalvas = JSON.parse(localStorage.getItem("cartas")) || [];
    const cartaEncontrada = cartasSalvas.find((c) => c.numero === index);

    if (cartaEncontrada) {
      setCarta(cartaEncontrada);
    }
  }, [index]);

  // Função de salvar carta
  const salvarCarta = () => {
    const novaCarta = {
      numero: index, // ✅ agora não tem mais "-1"
      tipo,
      ...carta,
    };

    let cartasSalvas = JSON.parse(localStorage.getItem("cartas")) || [];

    const existe = cartasSalvas.find((c) => c.numero === index);
    if (existe) {
      cartasSalvas = cartasSalvas.map((c) =>
        c.numero === index ? novaCarta : c
      );
    } else {
      cartasSalvas.push(novaCarta);
    }

    localStorage.setItem("cartas", JSON.stringify(cartasSalvas));

    alert(
      `Carta número ${index} salva!\nNome: ${carta.nome}\nTipo Promessa: ${carta.tipoPromessa}\nO que devo fazer: ${carta.oqfazer}\nVantagens: ${carta.vantagem1}, ${carta.vantagem2}, ${carta.vantagem3}\nDesvantagem: ${carta.desvantagem}`
    );
  };

  // Handler para mudar os inputs dinamicamente
  const handleChange = (field, value) => {
    setCarta((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={style.box}>
      <h1>Carta</h1>

      <h3>Nome</h3>
      <input
        type="text"
        value={carta.nome}
        onChange={(e) => handleChange("nome", e.target.value)}
      />

      <h3>Tipo Carta</h3>
      <input
        type="text"
        value={carta.tipoPromessa}
        onChange={(e) => handleChange("tipoPromessa", e.target.value)}
      />


      <h3>Cena vantagem 1</h3>
      <input
        type="text"
        value={carta.vantagem1}
        onChange={(e) => handleChange("vantagem1", e.target.value)}
      />

      <h3>Cena vantagem 2</h3>
      <input
        type="text"
        value={carta.vantagem2}
        onChange={(e) => handleChange("vantagem2", e.target.value)}
      />

      <h3>Cena vantagem 3</h3>
      <input
        type="text"
        value={carta.vantagem3}
        onChange={(e) => handleChange("vantagem3", e.target.value)}
      />

      <h4 className={style.separador}>
        -------------------------------------------------
      </h4>

      <h3>Cena desvantagem</h3>
      <input
        type="text"
        value={carta.desvantagem}
        onChange={(e) => handleChange("desvantagem", e.target.value)}
      />

      <button onClick={salvarCarta}>Salvar Carta</button>
    </div>
  );
};

export { Cards };
