# 🛒 Sistema CRUD em JavaScript Puro

Um sistema completo de Create, Read, Update e Delete (CRUD) implementado com JavaScript puro, HTML e CSS.

## ✨ Funcionalidades

- ✅ **Create**: Adicionar novos produtos
- ✅ **Read**: Listar todos os produtos
- ✅ **Update**: Editar produtos existentes
- ✅ **Delete**: Remover produtos
- ✅ **Persistência**: Dados salvos no LocalStorage
- ✅ **Interface**: Design responsivo e amigável
- ✅ **Validação**: Verificação de dados de entrada

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilização e design responsivo
- **JavaScript (ES6+)** - Lógica e funcionalidades
- **LocalStorage API** - Persistência de dados
- **Git** - Controle de versão

## 📁 Estrutura do Projeto
crud-project/
├── index.html # Página principal
├── style.css # Estilos da aplicação
├── script.js # Lógica JavaScript
├── README.md # Esta documentação
└── .gitignore # Arquivos ignorados pelo Git

text

## 🎯 Como Usar

### 1. Clone ou baixe o projeto
```bash
git clone https://github.com/seu-usuario/crud-project.git
cd crud-project
2. Abra no navegador
Simplesmente abra o arquivo index.html em qualquer navegador moderno.

3. Comece a usar
Preencha o formulário com nome e preço

Clique em "Adicionar Produto"

Visualize os produtos na tabela

Use os botões de ação para editar ou excluir

🛠️ Funcionalidades Detalhadas
📝 Adicionar Produto
javascript
// Exemplo de uso
adicionarProduto("Mouse Gamer", 89.90);
📋 Listar Produtos
Exibe todos os produtos em uma tabela

Mostra ID, nome, preço e ações

Atualiza automaticamente após modificações

✏️ Editar Produto
Clique no botão "Editar"

Modifique os dados no formulário

Confirme as alterações

🗑️ Excluir Produto
Clique no botão "Excluir"

Confirmação antes de remover

Atualização automática da lista

💾 Persistência de Dados
Os dados são automaticamente salvos no LocalStorage do navegador, permitindo que:

Os dados permaneçam após fechar o navegador

Não seja necessário banco de dados externo

Funcione completamente offline

🎨 Design e Interface
Design moderno com cores harmoniosas

Responsivo para mobile e desktop

Feedback visual para todas as ações

Animações suaves para melhor UX

🔧 Estrutura de Código
Funções Principais
javascript
// CRUD Operations
function adicionarProduto(nome, preco) { ... }
function listarProdutos() { ... }
function editarProduto(id) { ... }
function excluirProduto(id) { ... }

// Helper Functions
function salvarNoLocalStorage() { ... }
function carregarDoLocalStorage() { ... }
function validarDados(nome, preco) { ... }
Modelo de Dados
javascript
{
  id: Date.now(),          // ID único baseado em timestamp
  nome: "Produto Exemplo", // Nome do produto
  preco: 99.90,            // Preço em decimal
  dataCriacao: new Date()  // Data de criação
}
📱 Compatibilidade
✅ Chrome (versões recentes)

✅ Firefox (versões recentes)

✅ Safari (versões recentes)

✅ Edge (versões recentes)

✅ Opera (versões recentes)

🚧 Melhorias Futuras
Categorias de produtos - Organizar por tipo

Sistema de busca - Filtrar produtos por nome

Ordenação - Ordenar por nome, preço ou data

Exportação - Exportar dados para CSV/JSON

Paginação - Navegação por páginas em listas grandes

Upload de imagens - Adicionar fotos aos produtos

🤝 Contribuindo
Contribuições são bem-vindas! Siga estes passos:

Fork o projeto

Crie uma branch (git checkout -b feature/nova-funcionalidade)

Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade')

Push para a branch (git push origin feature/nova-funcionalidade)

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
Roberto Acordi @cruzacordi

🤖 Assistente de Desenvolvimento
Este projeto foi desenvolvido com a assistência do DeepSeek AI, que forneceu:

📝 Explicações detalhadas linha por linha do código

🐙 Suporte com Git e resolução de problemas

📚 Documentação completa e tutoriais

🔧 Otimizações e boas práticas de código

🎨 Sugestões de design e UX

Agradecimentos especiais ao DeepSeek por tornar o aprendizado de programação mais acessível e eficiente!

🙏 Agradecimentos
DeepSeek AI por assistência técnica e tutoria

Inspiração em projetos open source

Stack Overflow por soluções de problemas

🎯 Objetivo de Aprendizado
Este projeto foi desenvolvido para praticar:

Manipulação do DOM com JavaScript puro

Implementação do padrão CRUD

Uso do LocalStorage para persistência

Desenvolvimento front-end sem frameworks

Boas práticas de código JavaScript

Controle de versão com Git

Documentação de projetos

📚 Recursos Úteis
MDN Web Docs - JavaScript

W3Schools - JavaScript CRUD

LocalStorage API

DeepSeek AI - Assistente para desenvolvimento

⭐ Suporte
Se este projeto foi útil para você, deixe uma ⭐ no repositório!

<div align="center"> <p>Feito com ❤️, JavaScript e assistência da IA</p> <p>Última atualização: Janeiro 2026</p>
