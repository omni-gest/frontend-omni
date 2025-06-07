import { useEffect, useState } from "react";
import { ModalContainer, ModalContent, ModalScroll, ModalHeader, DeviderHorizontal } from './style.js'

export function VerMateriais( { materiais, visible, setVisible }) {

  if (!visible)
    return <></>
  
  return (
    <ModalContainer>
      <ModalContent>
        <ModalScroll>
        <ModalHeader>
          <h2>Materiais movimentados</h2>
          <button onClick={() => setVisible(false)}>
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729" />
            </svg>
          </button>
        </ModalHeader>
        <DeviderHorizontal />
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Descrição</th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {materiais.map((material) => (
              <tr key={material.id_material}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{material.des_material_mte}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{material.qtd_material_mit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <DeviderHorizontal />
        </ModalScroll>
      </ModalContent>
    </ModalContainer>
  )
}