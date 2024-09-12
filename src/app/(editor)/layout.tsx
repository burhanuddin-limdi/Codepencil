"use client";
import Navbar from "@/components/layout/Navbar";
import { FunctionComponent } from "react";

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
