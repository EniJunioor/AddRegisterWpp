import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export function gerarPdfRegistroPonto(registro: any) {
  const doc = new PDFDocument();
  const pasta = './pdfs';

  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta);
  }

  const caminho = path.join(pasta, 'registro-ponto.pdf');
  doc.pipe(fs.createWriteStream(caminho));

  doc.fontSize(25).text('Registro de Ponto', 100, 100);
  doc.fontSize(12).text(`Data: ${registro.data}`);
  doc.text(`Método: ${registro.metodo}`);
  doc.text(`Latitude: ${registro.latitude}`);
  doc.text(`Longitude: ${registro.longitude}`);

  doc.end();
}

