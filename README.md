# Web App · PUCPR — Tecnologias para Desenvolvimento Web

React + Vite · React Router Dom · Firebase Auth + Firestore

---

## Estrutura do projeto

```
src/
├── firebase/
│   └── firebase.js          ← configuração Firebase (Auth + Firestore)
├── routes/
│   └── AppRoutes.jsx        ← arquivo de rotas separado (React Router Dom)
├── pages/
│   ├── Cadastro.jsx         ← Página 1: cadastro com Firebase Auth + Firestore
│   ├── Login.jsx            ← Página 2: login com Firebase Auth
│   └── Principal.jsx        ← Página 3: dados do usuário logado
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

---

## 1. Configurar o Firebase

### 1.1 Criar projeto
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Crie um novo projeto
3. Em **Authentication** → Get started → habilite o provedor **E-mail/senha**
4. Em **Firestore Database** → Create database → comece em **modo de teste**

### 1.2 Pegar as credenciais
Project Settings → Your apps → Web app → SDK setup → **Config**

### 1.3 Criar o arquivo `.env`
Copie o arquivo `.env.example` e renomeie para `.env`, preenchendo com suas credenciais:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=meu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=meu-projeto
VITE_FIREBASE_STORAGE_BUCKET=meu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 2. Instalar e rodar

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

---

## 3. Build

```bash
npm run build
```

Gera a pasta `dist/` pronta para deploy.

---

## 4. Deploy no Vercel

### Opção A — Interface web (mais fácil)
1. Faça push do projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Em **Environment Variables**, adicione todas as variáveis do `.env`
4. Clique em **Deploy**

### Opção B — Vercel CLI
```bash
npm install -g vercel
vercel
# Siga as instruções. Para produção:
vercel --prod
```

> ⚠️ **Importante**: Nunca suba o arquivo `.env` para o GitHub.  
> O `.gitignore` já o exclui por padrão no Vite.

---

## Regras do Firestore (modo produção)

Quando for para produção, substitua as regras de teste por:

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
