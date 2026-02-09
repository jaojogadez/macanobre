# 📁 Estrutura do Projeto - Maça Nobre

## Organização Semântica com `src/`

A estrutura do projeto foi reorganizada de forma semântica e inteligente para melhor manutenção e escalabilidade:

```
macanobre/
├── src/                   # Código-fonte principal
│   ├── index.html        # HTML principal do site
│   ├── styles/           # Arquivos CSS
│   │   └── style.css     # Estilos globais
│   └── scripts/          # Arquivos JavaScript
│       └── script.js     # Interatividade do site
│
├── public/               # Arquivos estáticos (imagens, ícones, etc)
│   ├── logo.png         # Logo da marca
│   └── embalagem.jpg    # Imagem da embalagem
│
├── dist/                # Build final (para deploy)
│
├── package.json         # Dependências do projeto
├── README.md           # Documentação principal
├── ESTRUTURA.md        # Este arquivo
├── .gitignore          # Arquivos ignorados pelo Git
└── index.html          # Arquivo raiz (redirecionador)
```

## 📋 Descrição das Pastas

### `src/` - Source Code
Contém todo o código-fonte do projeto:
- **index.html**: Arquivo HTML principal com referências corretas para CSS e JS
- **styles/style.css**: Toda a estilização da aplicação
- **scripts/script.js**: JavaScript para interatividade (menus, timelines, buscas)

### `public/` - Arquivos Estáticos
Imagens e assets que não mudam:
- Logo da marca
- Imagens de produtos
- Ícones personalizados

### `dist/` - Build Output
Pasta para o build final da aplicação (gerado durante deploy/build)

## 🔗 Caminhos Atualizados

Os caminhos dos arquivos foram atualizados no HTML:

```html
<!-- Estilos -->
<link rel="stylesheet" href="styles/style.css">

<!-- Imagens -->
<img src="../public/logo.png" alt="Logo">
<img src="../public/embalagem.jpg" alt="Embalagem">

<!-- Scripts -->
<script src="scripts/script.js"></script>
```

## 🚀 Como Executar

### Terminal direto
```bash
cd src
python -m http.server 8000
# Acessar: http://localhost:8000
```

### Com package.json configurado
```bash
npm run dev
# ou
npm start
```

## ✅ Benefícios da Nova Organização

1. **Separação de Responsabilidades**: Código, estilos e assets em pastas específicas
2. **Escalabilidade**: Fácil adicionar novas páginas, componentes ou funcionalidades
3. **Manutenção**: Estrutura clara facilita encontrar e editar arquivos
4. **Deploy**: Separação clara do que deve ir para produção (`src/` + `public/`)
5. **Organização Semântica**: Pasta `src/` segue padrões da indústria

## 📦 Próximos Passos (Sugestões)

- [ ] Adicionar build tool (webpack, Vite)
- [ ] Separar JavaScript em módulos
- [ ] Criar pasta `components/` para componentes reutilizáveis
- [ ] Adicionar pasta `utils/` para funções utilitárias
- [ ] Implementar CI/CD com GitHub Actions
