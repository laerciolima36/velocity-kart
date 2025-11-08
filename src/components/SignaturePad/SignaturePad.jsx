// SignaturePad.js
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "react-bootstrap";
import './SignaturePad.css'

const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef();

  const limparAssinatura = () => {
    sigCanvas.current.clear();
  };

  const salvarAssinatura = () => {
    if (!sigCanvas.current.isEmpty()) {
      const assinatura = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      onSave(assinatura); // Retorna a imagem em base64 para o componente pai
    } else {
      alert("Por favor, faça a assinatura antes de salvar.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        backgroundColor="#fff"
        canvasProps={{
          className: "signature-canvas w-100 border rounded shadow-sm"
        }}
      />
      <div className="mt-3 d-flex justify-content-center gap-2">
        <Button variant="secondary" onClick={limparAssinatura}>Limpar</Button>
        <Button variant="primary" onClick={salvarAssinatura}>Salvar</Button>
      </div>
    </div>
  );
};

export default SignaturePad;
