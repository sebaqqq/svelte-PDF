import jsPDF from "jspdf";
import "jspdf-autotable";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

export default function GeneratePDFWithPieChart() {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;
  document.body.appendChild(canvas);

  const data = {
    labels: [
      "Masa Muscular",
      "Masa Adiposa",
      "Masa Ósea",
      "Masa Residual",
      "Masa de la Piel",
    ],
    datasets: [
      {
        label: "Composición Corporal",
        data: [50, 20, 12, 12, 6],
        backgroundColor: [
          "#A74158",
          "#9A9CED",
          "#C2E7E4",
          "#FFF6C3",
          "#6C005D",
        ],
        borderColor: "#fff",
      },
    ],
  };

  const chart = new Chart(canvas, {
    type: "pie",
    data: data,
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
          position: "right",
        },
      },
    },
    plugins: [ChartDataLabels],
  });

  setTimeout(() => {
    const chartImg = canvas.toDataURL("image/png");

    const doc = new jsPDF();

    doc.setFillColor(14, 30, 46);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight(),
      "F"
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleText = "RESULTADOS DE EVALUACIÓN COMPOSICIÓN CORPORAL";
    const textWidth = doc.getTextWidth(titleText);
    const xTitlePosition = (pageWidth - textWidth) / 2;
    doc.text(titleText, xTitlePosition, 20);

    // Sección de título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Nombre:", 20, 35);
    doc.text("Clemente Franulic", 40, 35);

    doc.text("Fecha:", 150, 35);
    doc.text("24-10-2024", 170, 35);

    doc.text("Posición:", 20, 45);
    doc.text("Volante", 50, 45);

    // Añadir el gráfico al PDF
    //                             (X, Y, Ancho, Alto)
    doc.addImage(chartImg, "PNG", 10, 40, 90, 90); // Ajustar la posición y tamaño del gráfico

    doc.autoTable({
      startY: 50,
      margin: { left: 10 },
      head: [["Peso (kg)", "62,5"], ["CLASIFICACIÓN"]],
      body: [
        ["Talla (cm)", "178,2", ""],
        ["IMC (kg/mt²)", "19,7", ""],
        ["Sumatoria 6 pliegues (mm)", "31", "Adecuado"],
        ["% Masa adiposa", "20,1%", "Aceptable"],
        ["Kg. Masa adiposa", "12,6", ""],
        ["% Masa muscular", "49,5%", "Aceptable"],
        ["Kg. Masa muscular", "30,9", ""],
        ["Índice muscular óseo (IMO)", "3,99", "Aceptable"],
        ["% Masa ósea", "12,4%", ""],
        ["Kg. Masa ósea", "7,7", ""],
      ],
      columnStyles: {
        0: { cellWidth: 50 }, // Ancho de la primera columna
        1: { cellWidth: 30 }, // Ancho de la segunda columna
        2: { cellWidth: 50, fillColor: [230, 230, 230] }, // Ancho de la tercera columna y fondo gris claro
      },
      headStyles: {
        fillColor: [0, 82, 136], // Color de fondo de la cabecera (azul oscuro)
        textColor: [255, 255, 255], // Color del texto de la cabecera (blanco)
        fontStyle: "bold", // Negrita para la cabecera
      },
      bodyStyles: {
        fontSize: 10, // Tamaño de letra de las celdas
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Fondo blanco para filas alternas
      },
      theme: "grid", // Tema grid para mostrar todas las líneas
    });

    doc.autoTable({
      startY: 145,
      theme: "grid",
      head: [["Clasificación", "% Masa Adiposa"]],
      body: [
        ["Excelente", "< 16,6"],
        ["Bueno", "16,6 - 20"],
        ["Aceptable", "20,1 - 26"],
        ["Elevado", "26,1 - 30,6"],
        ["Muy Elevado", "> 30,6"],
      ],
      margin: { left: 10 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 40 },
      },
    });

    doc.autoTable({
      startY: 145,
      margin: { left: 70 },
      theme: "grid",
      head: [["Clasificación", "% Masa Muscular", "IMO"]],
      body: [
        ["Excelente", "> 54,2", "> 4,6"],
        ["Bueno", "50,8 - 54,2", "4,2 - 4,6"],
        ["Aceptable", "44 - 50,7", "3,8 - 4,2"],
        ["Bajo", "40,6 - 43,9", "3,5 - 3,8"],
        ["Muy Bajo", "< 40,6", "< 3,0"],
      ],

      margin: { left: 105 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 40 },
      },
    });

    doc.autoTable({
      startY: 200,
      margin: { left: 20 },
      theme: "grid",
      head: [["SUMATORIA 6 PLIEGUES", ""]],
      body: [
        ["Jugadores de campo", "< 50 mm"],
        ["Arqueros", "< 60 mm"],
      ],

      margin: { left: 10 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 40 },
      },
    });

    doc.autoTable({
      startY: 200,
      margin: { left: 70 },
      theme: "grid",
      head: [["Metodo Evaluación"]],
      body: [["Pentacompartimental (D. Kerr)"]],

      margin: { left: 105 },
      columnStyles: {
        0: { cellWidth: 60 },
      },
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);

    document.body.removeChild(canvas);
  }, 1000);
}
