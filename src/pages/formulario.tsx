/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';
import { useForm } from 'react-hook-form';

type FormValues = {
	name: string;
	email: string;
  };

  export default function Form() {
	// Usando react-hook-form para gerenciar o estado do formulário e as validações
	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  
	// Função para enviar os dados do formulário para a API
	const onSubmit = async (data: FormValues) => {
	  try {
		const response = await fetch('/api/users/create', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(data),
		});
  
		if (!response.ok) {
		  throw new Error('Falha ao enviar formulário.');
		}
  
		// Exibe uma mensagem de sucesso se o envio for bem-sucedido
		const result = await response.json();
		console.log('Formulário enviado com sucesso!', result);
	  } catch (error) {
		// Exibe um erro se o envio falhar
		console.error('Erro ao enviar formulário.', error);
	  }
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Name"
						{...register('name', { required: 'O nome é obrigatório' })}
					/>
					{errors.name && <span>{errors.name.message}</span>}
					<input
						type="email"
						placeholder="E-mail"
						{...register('email', { required: 'O e-mail é obrigatório' })}
					/>
					{errors.email && <span>{errors.email.message}</span>}
					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
