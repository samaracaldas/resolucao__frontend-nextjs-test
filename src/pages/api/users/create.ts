/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser, IUserCreate } from '@/types/user.d';

const users: IUser[] = [];

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Método não permitido' });
	  }
	
	// Obtém os dados do usuário do body da requisição
	const userData: IUserCreate = req.body;

	// Cria um novo objeto de usuário com um ID único
	const newUser: IUser = {
	  id: users.length + 1,
	  name: userData.name,
	  email: userData.email
	};
  
	// Adiciona o novo usuário à lista 
	users.push(newUser);
  
	// Retorna uma resposta com status 201 (Created) e o novo usuário
	return res.status(201).json(newUser);
};
