// Criação do component para o modal de confirmação
import React from 'react'
import styles from './style.module.css';

// Propriedades que o componente `ConfirmationModal` receberá
type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    content: React.ReactNode;
  };

  export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({isOpen, onClose, content, ...props }) => {

    // Função para lidar com o clique no botão de confirmação
    function handleConfirmClick(e: React.MouseEvent) {
      props.onConfirm?.();
    }
    
    // Retorna `null` se o modal não estiver aberto
    if (!isOpen) return null; 
  
    return (
        <div data-modal-wrapper className={styles.wrapper}>
        <div data-modal-container>
            <header data-modal-header>
                <h2>Confirmação</h2>
                <button data-modal-close onClick={onClose}>
                    X
                </button>
            </header>
            <div data-modal-content>
                {content}

            </div>
          <div data-modal-footer>
            <button type="button" onClick={onClose}>Fechar</button>
            <button type="button" data-type="confirm" onClick={handleConfirmClick}>Confirmar</button>
          </div>
        </div>
      </div>
    );
  };