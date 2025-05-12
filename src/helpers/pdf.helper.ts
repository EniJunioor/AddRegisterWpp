import PDFDocument from 'pdfkit';  // Usando import default
import { Response } from 'express';

export function gerarPdfFuncionario(funcionario: any, res: Response) {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=funcionario-${funcionario.id}.pdf`);

  doc.pipe(res);

  doc.fontSize(18).text(`Dados do Funcionário`, { underline: true });
  doc.moveDown();

  Object.entries(funcionario).forEach(([chave, valor]) => {
    if (chave !== 'registros') {
      doc.fontSize(12).text(`${chave}: ${valor}`);
    }
  });

  doc.moveDown();
  doc.fontSize(16).text('Registros de Ponto:', { underline: true });
  doc.moveDown();

    funcionario.registros?.forEach((r: { data: string; metodo: string }) => {
    doc.fontSize(12).text(`- ${r.data} via ${r.metodo}`);
  });

  doc.end();
}
