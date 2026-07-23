import { jsPDF } from 'jspdf'
import { GREAT_VIBES_BASE64 } from '../assets/greatVibesFont.js'
import { VOWS } from '../data/vows.js'
import { PETER_FULL_NAME, PETER_RUT, CAROLINA_FULL_NAME, CAROLINA_RUT } from '../data/couple.js'

const GOLD = [178, 140, 68]
const ROSE = [196, 84, 116]
const INK = [48, 36, 36]
const MUTED = [130, 118, 118]

export function generateLovePdf() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  doc.addFileToVFS('GreatVibes-Regular.ttf', GREAT_VIBES_BASE64)
  doc.addFont('GreatVibes-Regular.ttf', 'GreatVibes', 'normal')

  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 14
  const innerW = pageW - margin * 2

  doc.setFillColor(253, 248, 240)
  doc.rect(0, 0, pageW, pageH, 'F')

  doc.setDrawColor(...GOLD)
  doc.setLineWidth(0.9)
  doc.rect(margin, margin, innerW, pageH - margin * 2)
  doc.setLineWidth(0.25)
  doc.rect(margin + 3, margin + 3, innerW - 6, pageH - margin * 2 - 6)

  doc.setFont('GreatVibes', 'normal')
  doc.setTextColor(...ROSE)
  doc.setFontSize(38)
  doc.text('Acuerdo de Amor Infinito', pageW / 2, margin + 22, { align: 'center' })

  doc.setFont('Times', 'italic')
  doc.setTextColor(...INK)
  doc.setFontSize(12)
  doc.text(`Entre ${PETER_FULL_NAME} y ${CAROLINA_FULL_NAME}`, pageW / 2, margin + 30, {
    align: 'center',
  })

  doc.setFont('Times', 'normal')
  doc.setFontSize(11)
  const intro =
    'En pleno uso de nuestros corazones, y sin más testigo que todo el tiempo que hemos vivido juntos, firmamos este acuerdo de amor infinito, comprometiéndonos mutuamente a cumplir las siguientes promesas:'
  const introLines = doc.splitTextToSize(intro, innerW - 20)
  doc.text(introLines, pageW / 2, margin + 42, { align: 'center' })

  let y = margin + 42 + introLines.length * 5.2 + 10
  doc.setFontSize(11)
  VOWS.forEach((vow, i) => {
    const lines = doc.splitTextToSize(`${i + 1}. ${vow}.`, innerW - 24)
    doc.text(lines, margin + 15, y)
    y += lines.length * 5.6 + 3
  })

  y += 6
  doc.setFont('Times', 'italic')
  const validity =
    'Este acuerdo entra en vigencia hoy y compromete a ambas partes hasta el 24 de julio de 2027 — fecha en la que, frente al altar, se sellará con un "sí, quiero" para toda la vida.'
  const validityLines = doc.splitTextToSize(validity, innerW - 20)
  doc.text(validityLines, pageW / 2, y, { align: 'center' })
  y += validityLines.length * 5.6 + 22

  const sigY = Math.min(Math.max(y, pageH - 66), pageH - 46)
  const colW = (innerW - 30) / 2
  const leftX = margin + 12
  const rightX = leftX + colW + 30

  doc.setFont('GreatVibes', 'normal')
  doc.setFontSize(24)
  doc.setTextColor(...INK)
  doc.text('Peter Fulle', leftX + colW / 2, sigY - 3, { align: 'center' })

  doc.setDrawColor(...INK)
  doc.setLineWidth(0.3)
  doc.line(leftX, sigY + 4, leftX + colW, sigY + 4)
  doc.line(rightX, sigY + 4, rightX + colW, sigY + 4)

  doc.setFont('Times', 'normal')
  doc.setFontSize(10)
  doc.text(PETER_FULL_NAME, leftX + colW / 2, sigY + 10, { align: 'center' })
  doc.text(`RUT: ${PETER_RUT || '_______________'}`, leftX + colW / 2, sigY + 15, {
    align: 'center',
  })

  doc.text(CAROLINA_FULL_NAME, rightX + colW / 2, sigY + 10, { align: 'center' })
  doc.text(`RUT: ${CAROLINA_RUT || '_______________'}`, rightX + colW / 2, sigY + 15, {
    align: 'center',
  })

  doc.setFont('Times', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  const today = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  doc.text(`Firmado con amor — ${today}`, pageW / 2, pageH - margin - 6, { align: 'center' })

  doc.save('Acuerdo-de-Amor-Infinito.pdf')
}
