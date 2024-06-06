/**
 * Context Api
 *
 * - Criar um contexto para exibir mensagens de sucesso e erro
 * - Criar um componente para exibir as mensagens
 * - Criar um hook para disparar e consumir as mensagens
 * - Disparar as mensagens a partir dos botões abaixo
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import styles from '@/styles/context-api.module.css';
import { IToastMessage } from '@/types/toast-message';
import { ToastMessage } from '@/components/ToastMessage';


// Definição do tipo para o contexto de Toast
type ToastContextType = {
  addToast: (message: IToastMessage) => void;
};

// criação do contexto com o tipo definido
const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export default function ContextApi() {
  // state para armazenar as mensagens de toast
  const [messages, setMessages] = useState<Array<IToastMessage>>([]);

  // Função para adicionar uma nova mensagem de toast
  const addToast = (message: IToastMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Remove a mensagem mais antiga após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prevMessages) => prevMessages.slice(1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [messages]);


  // Adiciona mensagens de toast ao estado do componente.
  function handleSuccessButtonClick() {
    addToast({
      id: String(new Date().getTime()),
      message: 'Mensagem de sucesso',
      type: 'success',
    });
  }

  function handleErrorButtonClick() {
    addToast({
      id: String(new Date().getTime()),
      message: 'Mensagem de erro',
      type: 'error',
    });
  }

  return (
    <>
      <ToastContext.Provider value={{ addToast }}>
        <div className={styles.container}>
          <button type="button" onClick={handleSuccessButtonClick}>
            Disparar mensagem de sucesso
          </button>
          <button type="button" onClick={handleErrorButtonClick}>
            Disparar mensagem de erro
          </button>
        </div>

        <div className={styles['toast-container']}>
          {messages.map((message) => (
            <ToastMessage key={message.id} content={message} />
          ))}
        </div>
      </ToastContext.Provider>
    </>
  );
}
