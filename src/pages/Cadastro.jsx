import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'

export default function Cadastro() {
  const [form, setForm] = useState({
    email: '',
    senha: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
  })
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' })
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setMensagem({ texto: '', tipo: '' })
  }

  const handleCadastro = async () => {
    const { email, senha, nome, sobrenome, dataNascimento } = form

    if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
      setMensagem({ texto: 'Preencha todos os campos.', tipo: 'error' })
      return
    }

    setLoading(true)
    try {
      // 1. Cria usuário no Firebase Authentication
      const credencial = await createUserWithEmailAndPassword(auth, email, senha)
      const uid = credencial.user.uid

      // 2. Salva dados extras no Firestore (incluindo o UID)
      await setDoc(doc(db, 'usuarios', uid), {
        uid,
        nome,
        sobrenome,
        dataNascimento,
        email,
        criadoEm: new Date().toISOString(),
      })

      setMensagem({ texto: 'Cadastro realizado com sucesso! Redirecionando...', tipo: 'success' })
      setTimeout(() => navigate('/login'), 1800)
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
        'auth/weak-password':        'A senha deve ter pelo menos 6 caracteres.',
        'auth/invalid-email':        'E-mail inválido.',
      }
      setMensagem({ texto: msgs[err.code] || `Erro: ${err.message}`, tipo: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-layer">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="card">
        <div className="badge">Novo usuário</div>
        <h1 className="card-title">Cadastro</h1>
        <p className="card-sub">Crie sua conta para continuar</p>

        {/* Nome e Sobrenome lado a lado */}
        <div className="field-row">
          <div className="field">
            <label>Nome</label>
            <input
              name="nome"
              type="text"
              placeholder="João"
              value={form.nome}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Sobrenome</label>
            <input
              name="sobrenome"
              type="text"
              placeholder="Silva"
              value={form.sobrenome}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label>Data de Nascimento</label>
          <input
            name="dataNascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Senha</label>
          <input
            name="senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.senha}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn"
          onClick={handleCadastro}
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {mensagem.texto && (
          <div className={`msg ${mensagem.tipo}`}>{mensagem.texto}</div>
        )}

        <div className="divider" />

        <p className="footer-txt">
          Já tem uma conta?{' '}
          <button className="link-btn" onClick={() => navigate('/login')}>
            Fazer login
          </button>
        </p>
      </div>
    </>
  )
}
