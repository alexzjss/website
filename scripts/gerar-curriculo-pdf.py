"""Gera public/curriculo.pdf a partir do texto do currículo."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

INK = colors.HexColor("#1D1D1F")
MUTED = colors.HexColor("#6E6E73")
ACCENT = colors.HexColor("#1A4BD6")

nome = ParagraphStyle("nome", fontName="Helvetica-Bold", fontSize=18, leading=21, textColor=INK, spaceAfter=3)
linha = ParagraphStyle("linha", fontName="Helvetica", fontSize=8.6, leading=12, textColor=MUTED)
sec = ParagraphStyle("sec", fontName="Helvetica-Bold", fontSize=9.6, leading=12, textColor=ACCENT, spaceBefore=9, spaceAfter=3)
cargo = ParagraphStyle("cargo", fontName="Helvetica-Bold", fontSize=9.4, leading=12, textColor=INK)
meta = ParagraphStyle("meta", fontName="Helvetica-Oblique", fontSize=8.4, leading=11, textColor=MUTED, spaceAfter=1)
corpo = ParagraphStyle("corpo", fontName="Helvetica", fontSize=8.8, leading=11.8, textColor=INK, spaceAfter=4)

doc = SimpleDocTemplate(
    "public/curriculo.pdf", pagesize=A4,
    leftMargin=16 * mm, rightMargin=16 * mm, topMargin=14 * mm, bottomMargin=12 * mm,
    title="Alex de Jesus Santana — Currículo", author="Alex de Jesus Santana",
)

S = []
S.append(Paragraph("ALEX DE JESUS SANTANA", nome))
S.append(Paragraph("Sistemas de Informação — USP &nbsp;|&nbsp; Dados e Inteligência Artificial &nbsp;|&nbsp; Engenharia de Software", linha))
S.append(Paragraph(
    "São Paulo, SP — Brasil &nbsp;|&nbsp; +55 (11) 92220-9858 &nbsp;|&nbsp; alexzjss@gmail.com &nbsp;|&nbsp; "
    '<a href="https://linkedin.com/in/alex-jsz" color="#1A4BD6">linkedin.com/in/alex-jsz</a> &nbsp;|&nbsp; '
    '<a href="https://github.com/alexzjss" color="#1A4BD6">github.com/alexzjss</a>', linha))
S.append(Spacer(1, 5))
S.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#D2D2D7")))


def secao(titulo):
    S.append(Paragraph(titulo, sec))


def item(titulo, periodo, texto):
    S.append(Paragraph(titulo, cargo))
    S.append(Paragraph(periodo, meta))
    S.append(Paragraph(texto, corpo))


secao("RESUMO PROFISSIONAL")
S.append(Paragraph(
    "Estudante de Sistemas de Informação (USP) atuando em Ciência de Dados, Inteligência Artificial e Engenharia "
    "de Software com Python, Java, JavaScript e SQL. Histórico consistente de liderança e trabalho em equipe na "
     "coordenação de projetos multidisciplinares em sete organizações estudantis, com resultados reconhecidos e "
    "projetos entregues em produção. Em busca de estágio em Tecnologia da Informação com foco em Dados e IA e "
    "desenvolvimento de software.", corpo))

secao("FORMAÇÃO ACADÊMICA")
item("Universidade de São Paulo (USP) — Bacharelado em Sistemas de Informação",
     "Fev 2026 – Dez 2029 | São Paulo, SP", "")

secao("EXPERIÊNCIA")
item("Membro Bolsista — PET-SI, EACH-USP", "Ago 2026 – Atual | São Paulo, SP",
     "Membro do Programa de Educação Tutorial de Sistemas de Informação. Participo de programas de educação, "
     "pesquisa e extensão e desenvolvo oficinas.")
item("Bolsista de Iniciação Científica (PUB) — Grupo SAEG, EACH-USP", "Jul 2026 – Fev 2027 | São Paulo, SP",
     "Pesquiso teste e depuração de software (Java, Apache Maven) em benchmarks com dados reais e open-source, "
     "voltados à melhoria das ferramentas de teste e depuração, sob orientação do Prof. Dr. Marcos Lordello Chaim, "
     "com foco em inovação metodológica, de cobertura e de tecnologias.")
item("Coordenador de Projetos de TI — DASI USP", "Mar 2026 – Atual | São Paulo, SP",
     "Lidero equipe técnica multidisciplinar na infraestrutura tecnológica da entidade, otimizando o fluxo de "
     "informações para mais de 700 estudantes.")
item("Pesquisador de Dados e Inteligência Artificial — Hype USP", "Jun 2026 – Atual | São Paulo, SP",
     "Conduzo pesquisas aplicadas em equipe em Ciência de Dados, IA e Machine Learning, disseminando conhecimento "
     "técnico no ecossistema universitário.")
item("Desenvolvedor Full-Stack — USP Code Lab Leste", "Jun 2026 – Atual | São Paulo, SP",
     "Desenvolvo, em equipe, soluções Full-Stack e Mobile com impacto social real, da concepção à produção.")
item("Design, Criação e Comunicação — Conway USP", "Abr 2026 – Atual | São Paulo, SP",
     "Atuo no setor responsável por marketing, divulgação, estratégias, postagens e identidade visual da Conway USP, "
     "voltado ao mundo dos jogos e ao público jovem.")
item("Gestão Comercial e Financeira — COSSI USP (Semana de Sistemas de Informação)",
     "Mar 2026 – Atual | São Paulo, SP",
     "Negocio parcerias estratégicas com empresas em equipe, viabilizando as atividades comerciais e financeiras "
     "do evento.")

secao("PROJETOS")
item("DaSIboard — github.com/alexzjss/dasiboard-omg", "Mar 2026 – Atual",
     "Arquitetei dashboard acadêmico completo (autenticação, módulo social, PostgreSQL, Docker) com API REST em "
     "Python e frontend em TypeScript, usado por mais de 700 alunos de Sistemas de Informação.")
item("ModaLoop — github.com/alexzjss/modaloop", "Mai 2026 – Jul 2026",
     "Idealizei e desenvolvi, em equipe, aplicação web de sustentabilidade têxtil em React/TypeScript, com "
     "geolocalização em tempo real (Geolocation API + fórmula de Haversine); deploy via GitHub Pages.")

secao("COMPETÊNCIAS TÉCNICAS")
S.append(Paragraph("<b>Linguagens:</b> Python, JavaScript, Java, C, SQL", corpo))
S.append(Paragraph("<b>Dados e IA:</b> Ciência de Dados, Machine Learning, Análise e Modelagem de Dados, "
                   "IA Generativa, PostgreSQL, MySQL", corpo))
S.append(Paragraph("<b>Backend e Infraestrutura:</b> Docker, Git/GitHub, Linux, CI/CD, Model Context Protocol (MCP)", corpo))
S.append(Paragraph("<b>Competências interpessoais:</b> Liderança de equipes, trabalho em equipe, inovação, "
                   "comunicação, pensamento analítico, gestão de projetos, negociação, adaptabilidade", corpo))

secao("CERTIFICAÇÕES")
S.append(Paragraph("Claude Code 101 e Claude 101 (Anthropic) · Introduction to Model Context Protocol — MCP "
                   "(Anthropic) · AWS Educate: Introduction to Generative AI (AWS) · Introdução ao Machine "
                   "Learning (Hype USP) — 2026", corpo))

secao("PRÊMIOS E RECONHECIMENTOS")
S.append(Paragraph("Campeão — Capture The Flag (CTF) EACH in the Shell X SSI, EACH-USP (2026)", corpo))
S.append(Paragraph("Campeão — HackFools Codelab, IME-USP (2026)", corpo))
S.append(Paragraph("Campeão — Hackathon de Construção de Agentes de IA, Hype USP (2026)", corpo))
S.append(Paragraph("Medalha de Bronze — Olimpíada Brasileira de Matemática das Escolas Públicas (OBMEP) (2025)", corpo))

doc.build(S)
print("ok")
