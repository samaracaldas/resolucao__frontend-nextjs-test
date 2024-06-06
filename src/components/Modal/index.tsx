import styles from './style.module.css';

type ModalProps = {
	children: React.ReactNode;
	title: string;
	isOpen: boolean;
	onClose?: (type: 'click' | 'esc', target: EventTarget) => void;
	onConfirm?: () => void;
	footer?: {
		hidden?: boolean;
		confirmText?: string;
		cancelText?: string;
	};
};

/* 
	Modal

	- Ao clicar no wrapper do modal, o modal deve ser fechado, porém esta ação deve ser ignorada caso o usuário clique em qualquer elemento dentro do modal

	O evento de clique no wrapper está configurado para fechar o modal quando um clique ocorre dentro do wrapper.
	Isso inclui cliques nos elementos dentro do modal. Portanto, o modal é fechado sempre que o usuário clica em qualquer lugar dentro do modal.

	A solução que eu encontrei foi adicionar uma função que impedirá que o evento de clique dentro do contêiner do modal se propague para o wrapper.
	Assim o modal não será fechado ao clicar dentro dele.
*/

export const Modal: React.FC<ModalProps> = ({ children, title, isOpen, ...props }) => {
	function handleCloseClick(e: React.MouseEvent) {
		props.onClose?.('click', e.target);
	}

	function handleConfirmClick(e: React.MouseEvent) {
		props.onConfirm?.();
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Escape') props.onClose?.('esc', e.target);
	}

	// Adição de função para parar a propagação do event click dentro do modal
	function stopPropagation(e: React.MouseEvent) {
		e.stopPropagation();
	}

	if (!isOpen) return null;

	return (
		<div data-modal-wrapper className={styles.wrapper} onClick={handleCloseClick} onKeyDown={handleKeyDown}>
			{/* Aplicando a função stopPropagation ao contêiner do modal */}
			<div data-modal-container onClick={stopPropagation}> 
				<header data-modal-header>
					<h2>{title}</h2>

					<button data-modal-close onClick={handleCloseClick}>
						X
					</button>
				</header>

				{children}

				{!props.footer?.hidden && (
					<div data-modal-footer>
						<button data-modal-cancel onClick={handleCloseClick}>
							{props.footer?.cancelText ?? 'Cancelar'}
						</button>

						<button data-modal-confirm onClick={handleConfirmClick} data-type="confirm">
							{props.footer?.confirmText ?? 'Confirmar'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
