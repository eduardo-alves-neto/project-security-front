import jsPDF from "jspdf";
import { ICustomer } from "../../services/types";

export const generateContractPdf = (customer: ICustomer) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const formatDate = (date?: string | Date) => {
    return date ? new Date(date).toLocaleDateString("pt-BR") : "-";
  };

  // Título
  doc.setFontSize(14);
  doc.text(customer.Contract.title, 20, 20);

  // Descrição com quebra automática e cálculo de altura
  doc.setFontSize(10);
  const descriptionLines = doc.splitTextToSize(customer.Contract.description ?? "", 170);
  doc.text(descriptionLines, 20, 25);
  const descriptionHeight = descriptionLines.length * 5;
  let currentY = 25 + descriptionHeight + 5; // margem inferior pós-descrição

  // Introdução
  doc.setFontSize(12);
  doc.text("Pelo presente instrumento particular de contrato, de um lado:", 20, currentY);
  currentY += 8;

  const client = customer;

  doc.setFontSize(11);
  doc.text(`Contratante: ${client?.name || "NOME DO CLIENTE"}`, 20, currentY);
  currentY += 6;
  doc.text(`CPF: ${client?.cpf || "XXX.XXX.XXX-XX"}`, 20, currentY);
  currentY += 6;
  doc.text(
    `Endereço: ${client?.address?.street || "Rua"}, nº ${client?.address?.number || "___"},`,
    20,
    currentY
  );
  currentY += 6;
  doc.text(
    `${client?.address?.neighborhood || "Bairro"} - ${client?.address?.city || "Cidade"}/${client?.address?.state || "UF"} - CEP: ${client?.address?.zipCode || "_____"}`,
    20,
    currentY
  );
  currentY += 10;

  // Parte da empresa
  doc.text("E do outro lado, como Contratada: EMPRESA DE SEGURANÇA XYZ LTDA,", 20, currentY);
  currentY += 6;
  doc.text("CNPJ: 12.345.678/0001-99, com sede na Av. Exemplo, 1000 - Centro, Cidade/UF,", 20, currentY);
  currentY += 6;
  doc.text("resolvem firmar o presente contrato, conforme cláusulas abaixo:", 20, currentY);
  currentY += 10;

  // Cláusulas
  doc.setFontSize(12);
  doc.text("CLÁUSULA 1ª - DO OBJETO", 20, currentY);
  currentY += 6;
  doc.setFontSize(11);
  doc.text(
    "O presente contrato tem por objeto a prestação de serviços de segurança patrimonial no endereço do contratante.",
    20,
    currentY,
    { maxWidth: 170 }
  );
  currentY += 14;

  doc.setFontSize(12);
  doc.text("CLÁUSULA 2ª - DO PRAZO", 20, currentY);
  currentY += 6;
  doc.setFontSize(11);
  doc.text(
    `O presente contrato terá início em ${formatDate(customer.Contract.startDate)} e término em ${formatDate(customer.Contract.endDate)}.`,
    20,
    currentY
  );
  currentY += 14;

  doc.setFontSize(12);
  doc.text("CLÁUSULA 3ª - DO VALOR", 20, currentY);
  currentY += 6;
  doc.setFontSize(11);
  doc.text(
    `O contratante pagará à contratada o valor de R$ ${Number(customer.Contract.value).toFixed(2).replace(".", ",")} mensais pelos serviços prestados.`,
    20,
    currentY
  );
  currentY += 14;

  doc.setFontSize(12);
  doc.text("CLÁUSULA 4ª - DAS OBRIGAÇÕES", 20, currentY);
  currentY += 6;
  doc.setFontSize(11);
  doc.text(
    "A contratada se compromete a disponibilizar agentes devidamente treinados, uniformizados e equipados, conforme a legislação vigente.",
    20,
    currentY,
    { maxWidth: 170 }
  );
  currentY += 14;

  doc.setFontSize(12);
  doc.text("CLÁUSULA 5ª - DA RESCISÃO", 20, currentY);
  currentY += 6;
  doc.setFontSize(11);
  doc.text(
    "O presente contrato poderá ser rescindido por qualquer das partes, mediante aviso prévio de 30 dias.",
    20,
    currentY
  );
  currentY += 14;

  doc.setFontSize(12);
  doc.text("CLÁUSULA 6ª - DAS DISPOSIÇÕES GERAIS", 20, currentY);
  currentY += 6;
  doc.setFontSize(11);
  doc.text(
    "Este contrato é firmado em 2 vias de igual teor, sendo eleito o foro da comarca do contratante para dirimir quaisquer dúvidas.",
    20,
    currentY,
    { maxWidth: 170 }
  );
  currentY += 14;

  // Campo Status
  doc.setFontSize(12);
  doc.text("CLÁUSULA 7ª - DO STATUS", 20, currentY);
  currentY += 6;
  doc.setFontSize(11);
  doc.text(
    `O status atual do contrato é: ${customer.Contract.status.toUpperCase()}.`,
    20,
    currentY
  );
  currentY += 14;

  // Local/data e assinatura
  doc.text(`${client?.address?.city || "Cidade"}, ${formatDate(new Date())}`, 20, currentY);
  currentY += 20;

  doc.line(20, currentY, 90, currentY);
  doc.text("Assinatura do Contratante", 25, currentY + 5);

  doc.line(120, currentY, 190, currentY);
  doc.text("Assinatura da Contratada", 125, currentY + 5);

  doc.save(`Contrato_${client?.name || "cliente"}.pdf`);
};
