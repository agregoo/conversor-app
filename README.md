 Converter App (React Native)

Uma aplicação mobile moderna de conversão de moedas, desenvolvida com React Native, TypeScript e integração com API de câmbio em tempo real.
O projeto evoluiu de uma interface simples até uma aplicação com histórico, favoritos e persistência local.

🚀 Demonstração

📱 App permite:

Conversão entre +160 moedas
Suporte a AOA (Kwanza Angolano)
Interface moderna estilo fintech
Histórico de conversões


🧠 Tecnologias utilizadas
📱 Frontend Mobile
React Native
TypeScript
TailwindCSS (NativeWind)


🌐 Comunicação com API
Axios
ExchangeRate API (v6)


🎨 UI/UX
ImageBackground
Modal customizado
Glassmorphism design
FlatList otimizada


🌍 API utilizada
ExchangeRate API

ExchangeRate API

✔ Funcionalidades:
Conversão entre 160+ moedas
Suporte a AOA (Kwanza)
Dados em tempo real
Base por moeda selecionada

🔑 Exemplo de uso:
https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD


📦 Instalação do projeto
1. Clonar o repositório
git clone https://github.com/seu-usuario/currency-app.git
2. Entrar no projeto
cd currency-app
3. Instalar dependências
npm install
ou
yarn install
4. Instalar dependências adicionais
npm install axios
npm install @react-native-async-storage/async-storage
5. Instalar NativeWind (Tailwind no React Native)
npm install nativewind
npm install tailwindcss
6. Iniciar o projeto
Expo:
npx expo start
React Native CLI:
npx react-native run-android


📱 Funcionalidades do App
Conversão de moedas
Seleção de moeda de origem e destino
Conversão em tempo real via API
Suporte a múltiplas moedas incluindo AOA


🧱 Estrutura do projeto
src/
 ├── app/
 │    └── App.tsx
 │    └── index.ts
 ├── styles/
 │    └── global.css
🎨 Design

O projeto usa um design moderno inspirado em apps financeiros:

Glassmorphism (efeito vidro)
Gradientes suaves
Tipografia bold e limpa
UI responsiva e minimalista
Modal estilizado para seleção de moedas

⚙️ Como funciona
O utilizador insere o valor
Seleciona moeda de origem e destino
O app consulta a API de câmbio
Calcula a conversão em tempo real
Exibe o resultado formatado


👨‍💻 Autor

Desenvolvido por Adilson Grego

Projeto criado para aprendizagem de:

React Native
Integração com APIs
UI/UX mobile
Arquitetura de apps