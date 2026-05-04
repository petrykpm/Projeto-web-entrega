import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'

export default function Login() {
  const [email, setEmail]                   = useState('')
  const [senha, setSenha]                   = useState('')
  const [mensagem, setMensagem]             = useState({ texto: '', tipo: '' })
  const [loading, setLoading]               = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !senha) {
      setMensagem({ texto: 'Preencha e-mail e senha.', tipo: 'error' })
      return
    }

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, senha)
      // Login bem-sucedido → navega para a página principal
      navigate('/principal')
    } catch (err) {
      const msgs = {
        'auth/user-not-found':   'Usuário não está cadastrado.',
        'auth/wrong-password':   'Usuário não está cadastrado.',
        'auth/invalid-email':    'E-mail inválido.',
        'auth/invalid-credential': 'Usuário não está cadastrado.',
      }
      setMensagem({
        texto: msgs[err.code] || 'Usuário não está cadastrado.',
        tipo: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <>
      <div className="bg-layer">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="card">
        <div className="badge">Área restrita</div>
        <h1 className="card-title">Bem-vindo</h1>
        <p className="card-sub">Faça login para continuar</p>

        <div className="field">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setMensagem({ texto: '', tipo: '' }) }}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="field">
          <label>Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => { setSenha(e.target.value); setMensagem({ texto: '', tipo: '' }) }}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          className="btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Acessar'}
        </button>

        {mensagem.texto && (
          <div className={`msg ${mensagem.tipo}`}>{mensagem.texto}</div>
        )}

        <div className="divider" />

        <p className="footer-txt">
          Não tem uma conta?{' '}
          <button className="link-btn" onClick={() => navigate('/cadastro')}>
            Cadastre-se
          </button>
        </p>
      </div>
    </>
  )
}
