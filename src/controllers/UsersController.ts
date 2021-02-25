import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersController {
    async create(request: Request, response: Response) {
        //Recebe os dados da API
        const { name, email } = request.body;

        //Criação do repositório com funções de acesso ao banco de dados
        const usersRepository = getCustomRepository(UsersRepository);

        
        
        //SELECT * FOM users WHERE email = email
        const userAlredyExists = await usersRepository.findOne({
            email
        })

        //Para não permitir cadastro de usuários com o mesmo e-mail
        if(userAlredyExists) {
            return response.status(400).json({
                error: "User already exists",
            });
        }


        //Criação da entidade
        const user = usersRepository.create({
            name, email
        });

        //Armazena no banco de dados a entidade criada acima
        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UsersController };
