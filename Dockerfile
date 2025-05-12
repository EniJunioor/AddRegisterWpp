# Imagem base do Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências e o Nest CLI globalmente
RUN npm install && npm install -g @nestjs/cli

# Copia todo o restante do projeto
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando padrão para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "start:dev"]
