import { useState, useEffect } from "react";
import style from "./style.module.css";

const Info = () => {
  const [nome, setNome] = useState("");
  const [hp, setHp] = useState(10);
  const [esforco, setEsforco] = useState(2); // Tomar o Risco
  const [mutacao, setMutacao] = useState(1); // Deixar Explodir
  const [apoio, setApoio] = useState(0);     // Relações e Recompensas
  const [imagem, setImagem] = useState("");  // Data URL

  useEffect(() => {
    const infoSalva = localStorage.getItem("info");
    if (infoSalva) {
      const parsed = JSON.parse(infoSalva);
      setNome(parsed.nome || "");
      setHp(parsed.hp || 10);
      setEsforco(parsed.esforco ?? 2);
      setMutacao(parsed.mutacao ?? 1);
      setApoio(parsed.apoio ?? 0);
      setImagem(parsed.imagem || "");
    }
  }, []);

  const salvarInfo = () => {
    const info = { nome, hp, esforco, mutacao, apoio, imagem };
    localStorage.setItem("info", JSON.stringify(info));
    alert("Informações salvas!");
  };

  // Controles básicos
  const aumentar = (setter) => setter((prev) => prev + 1);
  const diminuir = (setter) => setter((prev) => (prev > 0 ? prev - 1 : 0));

  // Função para carregar imagem do PC
  const handleImagemUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagem(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={style.box}>
      <h2>Personagem!</h2>

      {/* Área da imagem */}
      <div className={style.imagemContainer}>
        {imagem ? (
          <img src={imagem} alt="Personagem" className={style.imagem} />
        ) : (
          <span className={style.imagemPlaceholder}>Sem imagem</span>
        )}
      </div>

      <h3>Escolher imagem</h3>
      <input type="file" accept="image/*" onChange={handleImagemUpload} />

      <h3>Nome</h3>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

      <h3>HP</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={() => diminuir(setHp)}>-</button>
        <span>{hp}</span>
        <button onClick={() => aumentar(setHp)}>+</button>
      </div>

      <h3>Tomar o Risco – Pontos de Esforço</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={() => diminuir(setEsforco)}>-</button>
        <span>{esforco}</span>
        <button onClick={() => aumentar(setEsforco)}>+</button>
      </div>

      <h3>Deixar Explodir – Pontos de Mutação</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={() => diminuir(setMutacao)}>-</button>
        <span>{mutacao}</span>
        <button onClick={() => aumentar(setMutacao)}>+</button>
      </div>

      <h3>Relações e Recompensas – Pontos de Apoio</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={() => diminuir(setApoio)}>-</button>
        <span>{apoio}</span>
        <button onClick={() => aumentar(setApoio)}>+</button>
      </div>

      <button onClick={salvarInfo} style={{ marginTop: "16px" }}>
        Salvar
      </button>
    </div>
  );
};

export { Info };
