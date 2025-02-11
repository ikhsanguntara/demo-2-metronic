import React from "react";
import PdfViewer from "./PdfViewer";
import { useSubheader } from "../../_metronic/layout";

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("My Custom title");
  return <PdfViewer fileUrl="/media/bg/sample2.pdf" />;
};
