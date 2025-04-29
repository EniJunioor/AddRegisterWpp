const express = require('express');
const app = express();
const db = require('./db');
const fs = require('fs');
const path = require('path');

app.use(express.json());

// Rota para registrar ponto
app.post('/api/pontos/registrar', (req, res) => {
  const { funcionarioId, dataHora, localizacao, foto, tipoMarcacao } = req.body;

  if (!funcionarioId || !dataHora || !tipoMarcacao) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes: funcionarioId, dataHora e tipoMarcacao.' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO pontos (funcionarioId, dataHora, localizacao, foto, tipoMarcacao)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(funcionarioId, dataHora, localizacao, foto, tipoMarcacao);

    const registro = {
      id: result.lastInsertRowid,
      funcionarioId,
      dataHora,
      localizacao,
      foto,
      tipoMarcacao
    };

    res.status(201).json({ mensagem: 'Ponto registrado com sucesso!', registro });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar ponto.' });
  }
});

// Rota para listar registros
app.get('/api/pontos/listar', (req, res) => {
  try {
    const registros = db.prepare(`
      SELECT p.*, f.nome, f.pis
      FROM pontos p
      JOIN funcionarios f ON p.funcionarioId = f.id
      ORDER BY p.dataHora DESC
    `).all();
    res.json({ registros });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar registros.' });
  }
});

// Rota para gerar AFD completo conforme Portaria 1510
app.get('/api/afd/gerar', (req, res) => {
    try {
      const registros = db.prepare(`
        SELECT p.dataHora, p.tipoMarcacao, f.pis
        FROM pontos p
        JOIN funcionarios f ON p.funcionarioId = f.id
        ORDER BY p.dataHora
      `).all();
  
      if (registros.length === 0) {
        return res.status(404).json({ erro: 'Nenhum registro encontrado.' });
      }
  
      // Dados fictícios para tipos 1 e 2
      const numeroSerieREP = 'IDREP123456789'; // Tipo 1
      const tipoIdentificador = '1'; // 1 = CNPJ
      const cnpj = '12345678000199'.padStart(14, '0');
      const razaoSocial = 'EMPRESA LTDA'.padEnd(150, ' ');
      const endereco = 'RUA EXEMPLO, 123 - CENTRO - FRANCA SP'.padEnd(100, ' '); // Tipo 2
  
      const linhas = [];
  
      // Tipo 1 – Identificação do equipamento REP
      linhas.push(`1${numeroSerieREP.padEnd(17, ' ')}`);
  
      // Tipo 2 – Identificação do empregador
      linhas.push(`2${tipoIdentificador}${cnpj}${razaoSocial}${endereco}`);
  
      // Tipos 3 – Registros de marcações de ponto
      registros.forEach((reg) => {
        const data = new Date(reg.dataHora);
        const dataFormatada = data.toISOString().slice(0, 10).replace(/-/g, '');
        const horaFormatada = data.toTimeString().slice(0, 8).replace(/:/g, '');
        const pis = reg.pis.toString().padStart(12, '0');
        const tipoMarcacao = reg.tipoMarcacao;
  
        linhas.push(`3${dataFormatada}${horaFormatada}${pis}${tipoMarcacao}`);
      });
  
      // Tipo 9 – Registro de encerramento (conta todas as linhas, inclusive ele mesmo)
      const totalLinhas = linhas.length + 1; // +1 por ele mesmo
      linhas.push(`9${totalLinhas.toString().padStart(9, '0')}`);
  
      const conteudo = linhas.join('\n');
      const filePath = path.join(__dirname, 'AFD.txt');
  
      fs.writeFileSync(filePath, conteudo);
      res.download(filePath, 'AFD.txt');
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao gerar o AFD.' });
    }
  });  

// Rota para adicionar funcionário
app.post('/api/funcionarios/adicionar', (req, res) => {
  const { id, nome, pis } = req.body;

  if (!id || !nome || !pis) {
    return res.status(400).json({ erro: 'Campos obrigatórios: id, nome e pis.' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO funcionarios (id, nome, pis)
      VALUES (?, ?, ?)
    `);
    stmt.run(id, nome, pis);

    res.status(201).json({ mensagem: 'Funcionário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar funcionário. Talvez o PIS já exista.' });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
