import React, { useEffect, useRef, useState } from "react";
import pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";
import "./App.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js`;


const PdfViewer = ({ fileUrl }) => {
  const viewerRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isScrollMode, setIsScrollMode] = useState(false);
  const canvasRefs = useRef([]);

  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem("lastReadPage")) || 1;
  });

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(fileUrl); // ✅ Fix: Ganti `pdfjs` dengan `pdfjsLib`
        const pdfDocument = await loadingTask.promise;
        setPdf(pdfDocument);
        setNumPages(pdfDocument.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [fileUrl]);

  const renderPage = async (pageNumber, canvas) => {
    if (!canvas || !pdf) return;
    const page = await pdf.getPage(pageNumber);

    let viewport = page.getViewport({ scale });

    if (isFullScreen) {
      const screenWidth = window.innerWidth * 0.9;
      const screenHeight = window.innerHeight * 0.9;
      const scaleFactor = Math.min(
        screenWidth / viewport.width,
        screenHeight / viewport.height
      );
      viewport = page.getViewport({ scale: scaleFactor });
    }

    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = { canvasContext: context, viewport };
    await page.render(renderContext).promise;
  };

  useEffect(() => {
    if (pdf && !isScrollMode) {
      renderPage(currentPage, canvasRefs.current[0]);
    }
  }, [pdf, currentPage, scale, isScrollMode, isFullScreen]);

  useEffect(() => {
    if (pdf && isScrollMode) {
      const renderPages = async () => {
        for (let i = 0; i < numPages; i++) {
          await renderPage(i + 1, canvasRefs.current[i]);
        }
      };
      renderPages();
    }
  }, [pdf, numPages, scale, isScrollMode]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isFullScreen) {
        renderPage(currentPage, canvasRefs.current[0]);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullScreen, currentPage, pdf]);

  useEffect(() => {
    localStorage.setItem("lastReadPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isScrollMode) {
        if (event.key === "ArrowRight") {
          setCurrentPage((prev) => Math.min(prev + 1, numPages));
        } else if (event.key === "ArrowLeft") {
          setCurrentPage((prev) => Math.max(prev - 1, 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [numPages, isScrollMode]);

  return (
    <div
      ref={viewerRef}
      className={`pdf-container ${isFullScreen ? "fullscreen" : ""}`}
    >
      <div className="pdf-toolbar">
        <button onClick={() => setScale((prev) => Math.min(prev + 0.2, 3))}>
          ➕ Zoom In
        </button>
        <button onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}>
          ➖ Zoom Out
        </button>
        <button onClick={() => setScale(1)}>🔄 Reset</button>
        <button onClick={toggleFullScreen}>
          {isFullScreen ? "⏏ Exit Full Page" : "📖 Full Page"}
        </button>
        <button onClick={() => setIsScrollMode((prev) => !prev)}>
          {isScrollMode ? "🔄 Mode Per Halaman" : "📜 Mode Scroll"}
        </button>
      </div>

      {isScrollMode ? (
        <div className="pdf-wrapper">
          {Array.from({ length: numPages }, (_, i) => (
            <div key={i} className="pdf-page-container">
              <div className="page-label">Halaman {i + 1}</div>
              <canvas
                ref={(el) => (canvasRefs.current[i] = el)}
                className="pdf-canvas"
              ></canvas>
            </div>
          ))}
        </div>
      ) : (
        <div className="pdf-single">
          <canvas
            ref={(el) => (canvasRefs.current[0] = el)}
            className="pdf-canvas"
          ></canvas>
          <div className="pdf-pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>
            <span>
              Halaman {currentPage} / {numPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, numPages))
              }
              disabled={currentPage === numPages}
            >
              Next ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
