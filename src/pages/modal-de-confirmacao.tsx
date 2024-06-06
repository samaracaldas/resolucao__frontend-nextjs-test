/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react';
import Head from 'next/head';

import styles from '@/styles/modal.module.css';
import { ConfirmationModal } from '@/components/ConfirmationModal'; // Importação do componente ConfirmationModal

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	// Responsável por fechar o modal de confirmação e exibir um alerta confirmando a ação.
	function handleModalConfirm() {
		setModalIsOpen(false);
		alert('confirmado');
	}

	return (
		<>
			<Head>
				<title>Modal de Confirmação</title>
			</Head>
			<main className={styles.container}>
				<button type="button" onClick={() => setModalIsOpen(true)}>
					Abrir modal de confirmação
				</button>
			</main>
			{/* Renderização do componente  de confirmação */}
			<ConfirmationModal
				isOpen={modalIsOpen}
				onClose={() => setModalIsOpen(false)}
				onConfirm={handleModalConfirm}
				content={<p>Você tem certeza que deseja continuar?</p>}
			/>
		</>
	);
}
