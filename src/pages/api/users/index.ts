/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser } from '@/types/user.d';

export default (req: NextApiRequest, res: NextApiResponse) => {
	 if (req.method !== 'GET') {
    // Se não for GET, retorna um erro 405 
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Define a lista de usuários como um array de objetos IUser
  const users: IUser[] = [
    {
      id: 1,
      name: 'Samara Caldas',
      email: 'samara.caldas@example.com'
    },
    {
      id: 2,
      name: 'Alaska Young',
      email: 'alaska.young@example.com'
    },
    {
      id: 3,
      name: 'Dorian Havilliard',
      email: 'dorian.havilliard@example.com'
    },
    {
      id: 4,
      name: 'Daisy Jones',
      email: 'daisy.jones@example.com'
    }
  ];

  // Retorna uma resposta com status 200 e a lista de usuários
  return res.status(200).json(users);
};
