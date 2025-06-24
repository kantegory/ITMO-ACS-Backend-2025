import bcrypt from 'bcrypt';
import { HttpError } from 'routing-controllers';
import { In, ObjectLiteral, Repository } from 'typeorm';
import dataSource from '../config/data-source';

export class ServicesValidator
{

    checkPassword(userPassword: string, password: string)
    {
        if (!bcrypt.compareSync(password, userPassword))
        {
            throw new HttpError(401, "Password or email is incorrect")
        }
    }

}