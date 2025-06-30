import { useEffect, useState } from "react";
import {
  ModalContainer,
  ModalContent,
  ModalScroll,
  ModalHeader,
  DeviderHorizontal,
} from "./style.js";

export function VerMateriais({ materiais, visible, setVisible }) {
  if (!visible) return <></>;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalScroll>
          <ModalHeader>
            <h2>Materiais movimentados</h2>
            <button onClick={() => setVisible(false)}>{/* ...SVG... */}</button>
          </ModalHeader>
          <DeviderHorizontal />
          <div
            style={{
              maxHeight: "350px",
              overflowY: "auto",
              background: "#fff",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "left",
                      padding: "8px",
                    }}
                  >
                    Descrição
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "left",
                      padding: "8px",
                    }}
                  >
                    Quantidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {materiais.map((material) => (
                  <tr key={material.id_material}>
                    <td
                      style={{ borderBottom: "1px solid #eee", padding: "8px" }}
                    >
                      {material.des_material_mte}
                    </td>
                    <td
                      style={{ borderBottom: "1px solid #eee", padding: "8px" }}
                    >
                      {material.qtd_material_mit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DeviderHorizontal />
        </ModalScroll>
      </ModalContent>
    </ModalContainer>
  );
}
