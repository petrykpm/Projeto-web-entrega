<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Firebase-10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white" />

<br /><br />

# 🔐 Web App — Autenticação com Firebase

Aplicação React com autenticação completa via **Firebase Authentication** e persistência de dados no **Firestore**. Desenvolvida como atividade avaliativa da disciplina **Tecnologias para Desenvolvimento Web** — PUCPR.

<br />

🔗 **[Acessar aplicação](https://projeto-web-entrega.vercel.app)**

</div>

---

## 📋 Sobre o projeto

A aplicação possui **3 páginas** com fluxo completo de autenticação:

| Página | Rota | Descrição |
|--------|------|-----------|
| 📝 Cadastro | `/cadastro` | Cria conta no Firebase Auth e salva dados no Firestore |
| 🔑 Login | `/login` | Autentica o usuário via e-mail e senha |
| 🏠 Principal | `/principal` | Exibe os dados do usuário logado (rota protegida) |

---

## 🚀 Tecnologias

- **React 18** + **Vite** — interface e build
- **React Router Dom v6** — navegação entre páginas
- **Firebase Authentication** — autenticação via e-mail/senha
- **Cloud Firestore** — banco de dados para dados do usuário
- **Vercel** — deploy e hospedagem

---

## 🗂️ Estrutura do projeto

```
src/
├── firebase/
│   └── firebase.js          ← configuração Firebase (Auth + Firestore)
├── routes/
│   └── AppRoutes.jsx        ← arquivo de rotas (React Router Dom)
├── pages/
│   ├── Cadastro.jsx         ← Página 1: cadastro
│   ├── Login.jsx            ← Página 2: login
│   └── Principal.jsx        ← Página 3: dados do usuário
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

---

## ⚙️ Como rodar localmente

**1. Clone o repositório**
```bash
git clone https://github.com/petrykpm/Projeto-web-entrega.git
cd Projeto-web-entrega
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Copie o arquivo de exemplo e preencha com suas credenciais do Firebase:
```bash
cp env.example .env
```

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

**4. Rode o projeto**
```bash
npm run dev
```
Acesse: [http://localhost:5173](http://localhost:5173)

---

## ☁️ Deploy

O projeto está hospedado na **Vercel** com redeploy automático a cada push na branch `main`.

🔗 [https://projeto-web-entrega.vercel.app](https://projeto-web-entrega.vercel.app)

---

## 🔒 Regras do Firestore (produção)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

<div align="center">

Feito por **Petryk Machozeki** · PUCPR · 2026

</div>
