import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportPdfButton({ targetRef, filename = "summary" }) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    if (!targetRef?.current) return;
    setLoading(true);
    try {
      const el = targetRef.current;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#F0F2F5",
        scrollY: 0,
      });

      const imgW = 210; // A4 width mm
      const imgH = (canvas.height * imgW) / canvas.width;
      const pageH = imgH > 297 ? 297 : imgH; // cap at A4 height

      const pdf = new jsPDF({ orientation: imgH > imgW ? "portrait" : "landscape", unit: "mm", format: "a4" });
      const dataUrl = canvas.toDataURL("image/png");
      pdf.addImage(dataUrl, "PNG", 0, 0, imgW, pageH);
      pdf.save(`${filename}.pdf`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: loading ? "#E2E8F0" : "#1A1F36",
        color: loading ? "#94A3B8" : "white",
        border: "none", borderRadius: 8,
        padding: "8px 16px", fontSize: 12, fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        transition: "background 0.15s",
      }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#0ABF53"; }}
      onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#1A1F36"; }}
    >
      {loading ? (
        <>⏳ Generating…</>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export PDF
        </>
      )}
    </button>
  );
}
