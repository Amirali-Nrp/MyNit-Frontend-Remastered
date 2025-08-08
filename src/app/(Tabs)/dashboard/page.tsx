"use client";

import React from "react";

import GlassContainer from "@/components/Glass/GlassContainer";

const Dashboard = () => {
  return (
    <>
      <GlassContainer variant="light" className="p-6">
        <h3 style={{ color: "#fff" }}>Light Variant</h3>
        <p style={{ color: "#ddd" }}>
          Use this on dark images or dark-mode UIs.
        </p>
      </GlassContainer>

      {/* on light background → dark variant */}
      <GlassContainer variant="dark" className="p-6">
        <h3 style={{ color: "#000" }}>Dark Variant</h3>
        <p style={{ color: "#222" }}>
          Use this on bright images or light-mode UIs.
        </p>
      </GlassContainer>
    </>
  );
};

export default Dashboard;
