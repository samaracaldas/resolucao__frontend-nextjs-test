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
    // Verificação para permitir apenas o método GET. Se for recebido outro método, retorna um erro 405 
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Define a lista de usuários, cada um contendo um ID, nome e e-mail. Os dados são tipados de acordo com a interface IUser. 
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

  //  Retorna a lista de usuários com status 200 (OK) se a requisição for feita com o método GET.
  return res.status(200).json(users);
};
