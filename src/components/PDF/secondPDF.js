import jsPDF from "jspdf";
import "jspdf-autotable";

export default function SecondPDF() {
  const doc = new jsPDF();

  doc.setFillColor(14, 30, 46);
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  );

  // Título centrado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleText = "RESULTADOS DE EVALUACIÓN COMPOSICIÓN CORPORAL";
  const textWidth = doc.getTextWidth(titleText);
  const xTitlePosition = (pageWidth - textWidth) / 2;
  doc.text(titleText, xTitlePosition, 20);

  // Guardar el PDF o abrir en una nueva pestaña
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl);
}
