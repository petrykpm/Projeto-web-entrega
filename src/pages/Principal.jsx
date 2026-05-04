import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'

export default function Principal() {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Observa o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Não logado → redireciona para login
        navigate('/login')
        return
      }

      // Busca os dados do usuário no Firestore pelo UID
      const snap = await getDoc(doc(db, 'usuarios', user.uid))
      if (snap.exists()) {
        setUsuario(snap.data())
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  // Formata data de nascimento para pt-BR
  const formatarData = (data) => {
    if (!data) return '—'
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  // Inicial para o avatar
  const inicial = usuario?.nome?.[0]?.toUpperCase() ?? '?'

  if (loading) {
    return (
      <>
        <div className="bg-layer">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="card" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
          Carregando...
        </div>
      </>
    )
  }

  return (
    <>
      <div className="bg-layer">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="card">
        {/* Avatar com inicial do nome */}
        <div className="profile-avatar">{inicial}</div>

        <div className="badge" style={{ display: 'block', textAlign: 'center' }}>
          Página principal
        </div>

        <h1 className="card-title" style={{ textAlign: 'center', marginTop: '12px' }}>
          Olá, {usuario?.nome}!
        </h1>
        <p className="card-sub" style={{ textAlign: 'center', marginBottom: '24px' }}>
          Seus dados cadastrados
        </p>

        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">Nome</div>
            <div className="info-value">{usuario?.nome ?? '—'}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Sobrenome</div>
            <div className="info-value">{usuario?.sobrenome ?? '—'}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Data de Nascimento</div>
            <div className="info-value">{formatarData(usuario?.dataNascimento)}</div>
          </div>
          <div className="info-item">
            <div className="info-label">E-mail</div>
            <div className="info-value">{usuario?.email ?? '—'}</div>
          </div>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          Sair da conta
        </button>
      </div>
    </>
  )
}
