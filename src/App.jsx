import './App.css'
import { Cards, Info } from './components'
import { useState, useEffect } from 'react'

function App() {
  // Inventário
  const [inventario, setInventario] = useState(() => {
    const saved = localStorage.getItem('inventario')
    return saved ? JSON.parse(saved) : []
  })
  const [novoItem, setNovoItem] = useState('')

const [skills, setSkills] = useState(() => {
  const saved = localStorage.getItem('skills')
  return saved ? JSON.parse(saved) : []
})
const [novaSkill, setNovaSkill] = useState('')

  // Salvar inventário no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('inventario', JSON.stringify(inventario))
  }, [inventario])

useEffect(() => {
  localStorage.setItem('skills', JSON.stringify(skills))
}, [skills])
  // Funções
  const adicionarItem = () => {
    if (novoItem.trim() === '') return
    setInventario([...inventario, novoItem.trim()])
    setNovoItem('')
  }

  const removerItem = (index) => {
    setInventario(inventario.filter((_, i) => i !== index))
  }

  const adicionarSkill = () => {
    if (novaSkill.trim() === '') return
    setSkills([...skills, novaSkill.trim()])
    setNovaSkill('')
  }

  const removerSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  return (
    <>
      <center>
        <Info/>
      </center>

      <div className='container'> 
        <Cards tipo="" index={1}/>
        <Cards tipo="" index={2}/>
        <Cards tipo="" index={3}/>
        <Cards tipo="" index={4}/>
      </div>

      {/* INVENTÁRIO */}
      <div className='inventario'>
        <h2>Inventário</h2>
        <ul>
          {inventario.length === 0 && <li>Vazio</li>}
          {inventario.map((item, i) => (
            <li key={i}>
              {item} 
              <button className="remover" onClick={() => removerItem(i)}>X</button>
            </li>
          ))}
        </ul>
        <div className='input-group'>
          <input
            type="text"
            placeholder="Adicionar item"
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && adicionarItem()}
          />
          <button onClick={adicionarItem}>Adicionar</button>
        </div>
      </div>

      {/* SKILLS EXTRAS */}
      <div className='skills'>
        <h2>Skills Extras</h2>
        <ul>
          {skills.length === 0 && <li>Vazio</li>}
          {skills.map((skill, i) => (
            <li key={i}>
              {skill} 
              <button className="remover" onClick={() => removerSkill(i)}>X</button>
            </li>
          ))}
        </ul>
        <div className='input-group'>
          <input
            type="text"
            placeholder="Adicionar skill"
            value={novaSkill}
            onChange={(e) => setNovaSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && adicionarSkill()}
          />
          <button onClick={adicionarSkill}>Adicionar</button>
        </div>
      </div>
    </>
  )
}

export default App
