"use client";
import { FunctionComponent } from "react";
import Navbar from "@/components/layout/Navbar";

interface EditorPageLayoutProps {
  children: React.ReactNode;
}

const EditorPageLayout: FunctionComponent<EditorPageLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default EditorPageLayout;
