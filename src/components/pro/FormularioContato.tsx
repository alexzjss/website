import { useState } from 'react'
import { profile } from '../../content/profile'

/**
 * Formulário sem backend, via Web3Forms (plano gratuito).
 *
 * Como ligar:
 *   1. pegue uma access key em https://web3forms.com (só precisa do seu e-mail);
 *   2. crie um arquivo .env na raiz com:  VITE_WEB3FORMS_KEY=sua-chave
 *   3. reinicie o `npm run dev`.
 *
 * Sem a chave configurada, o formulário continua funcionando: ele monta um
 * e-mail pré-preenchido e abre o cliente de e-mail do visitante.
 */
const CHAVE = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Estado = 'parado' | 'enviando' | 'ok' | 'erro'

export default function FormularioContato() {
  const [estado, setEstado] = useState<Estado>('parado')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim() || !email.trim() || !mensagem.trim()) return

    if (!CHAVE) {
      const corpo = encodeURIComponent(`${mensagem}\n\n— ${nome} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Contato pelo site — ${nome}`,
      )}&body=${corpo}`
      setEstado('ok')
      return
    }

    setEstado('enviando')
    try {
      const resposta = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: CHAVE,
          subject: `Contato pelo site — ${nome}`,
          from_name: nome,
          email,
          message: mensagem,
        }),
      })
      if (!resposta.ok) throw new Error('falhou')
      setEstado('ok')
      setNome('')
      setEmail('')
      setMensagem('')
    } catch {
      setEstado('erro')
    }
  }

  if (estado === 'ok')
    return (
      <div className="form-ok" role="status">
        <p>Mensagem enviada. Respondo assim que possível.</p>
        <button type="button" className="botao botao-fantasma" onClick={() => setEstado('parado')}>
          Enviar outra
        </button>
      </div>
    )

  return (
    <form className="form-contato" onSubmit={enviar}>
      <div className="form-linha">
        <label>
          <span>Nome</span>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            autoComplete="name"
            placeholder="Como devo te chamar"
          />
        </label>
        <label>
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="para onde eu respondo"
          />
        </label>
      </div>
      <label>
        <span>Mensagem</span>
        <textarea
          rows={5}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
          placeholder="Vaga, projeto, dúvida sobre a pesquisa — o que for."
        />
      </label>

      <div className="form-rodape">
        <button type="submit" className="botao botao-primario" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Enviando…' : 'Enviar mensagem'}
        </button>
        <span className="form-alternativa">
          ou escreva direto para <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </span>
      </div>

      {estado === 'erro' ? (
        <p className="form-erro" role="alert">
          O envio não completou. Tente de novo ou escreva para {profile.email}.
        </p>
      ) : null}
    </form>
  )
}
