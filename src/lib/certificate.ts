import jsPDF from 'jspdf';

export function generateCertificate(volunteerName: string, eventName: string, eventDate: string) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Border
  doc.setDrawColor(34, 139, 94);
  doc.setLineWidth(3);
  doc.rect(10, 10, w - 20, h - 20);
  doc.setLineWidth(1);
  doc.rect(14, 14, w - 28, h - 28);

  // Header decoration
  doc.setFillColor(34, 139, 94);
  doc.rect(14, 14, w - 28, 2, 'F');

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.text('VOLUNTEER CONNECT', w / 2, 40, { align: 'center' });

  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 139, 94);
  doc.text('Certificate of Appreciation', w / 2, 60, { align: 'center' });

  // Divider
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(1.5);
  doc.line(w / 2 - 60, 67, w / 2 + 60, 67);

  // Body
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('This is to certify that', w / 2, 85, { align: 'center' });

  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text(volunteerName, w / 2, 100, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('has successfully volunteered and contributed to', w / 2, 115, { align: 'center' });

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 139, 94);
  doc.text(`"${eventName}"`, w / 2, 130, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`held on ${formattedDate}`, w / 2, 142, { align: 'center' });

  doc.text('We appreciate your dedication and selfless service to the community.', w / 2, 158, { align: 'center' });

  // Signature line
  doc.setDrawColor(80, 80, 80);
  doc.line(w / 2 - 40, 178, w / 2 + 40, 178);
  doc.setFontSize(11);
  doc.text('Authorized Signature', w / 2, 184, { align: 'center' });

  // Date
  doc.setFontSize(10);
  doc.setTextColor(140, 140, 140);
  doc.text(`Issued on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, w / 2, h - 22, { align: 'center' });

  doc.save(`Certificate_${volunteerName.replace(/\s+/g, '_')}_${eventName.replace(/\s+/g, '_')}.pdf`);
}
