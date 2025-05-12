import express, { Request, Response } from 'express';
import { gerarPdfRegistroPonto } from './gerarPdf'; // 🔧 Importa a função de gerar PDF

// src/servidor.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('🚀 Servidor rodando na porta 3000');
}
bootstrap();

const app = express();
const porta = 3000;

// Dados de exemplo para gerar o PDF
const registro = {
  data: '2025-05-09',
  metodo: 'QR Code',
  latitude: '-23.5505',
  longitude: '-46.6333'
};

app.get('/gerar-pdf', (req: Request, res: Response) => {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="registro-ponto.pdf"');
  
    doc.pipe(res);
  
    doc.fontSize(25).text('Registro de Ponto', 100, 100);
    doc.fontSize(12).text(`Data: ${registro.data}`);
    doc.text(`Método: ${registro.metodo}`);
    doc.text(`Latitude: ${registro.latitude}`);
    doc.text(`Longitude: ${registro.longitude}`);
  
    doc.end();
  });  

// Iniciar o servidor
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
