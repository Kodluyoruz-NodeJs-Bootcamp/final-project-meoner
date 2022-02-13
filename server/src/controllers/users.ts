import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';

import * as dotenv from 'dotenv';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY;

export const register = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    console.log('reqXXX', req.body);
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({
        email
    });
    console.log("Geçti")
    if (existingUser) {
        res.status(400).send({
            message: 'Email already taken'
        });
    } else {
        const salt = await bcrypt.genSalt(SALT_ROUND);
        const hashPassword = await bcrypt.hash(password, salt);
        console.log("Geçti1")

        const user = await userRepository.create({
            fullName,
            email,
            password: hashPassword
        });

        await userRepository.save(user);

        res.status(200).send({ message: 'User created' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
        email
    });
    console.log(user)
    if (!user) {
        res.status(400).send({ message: 'Invalid email or password' });
    } else {
        const isSuccess = await bcrypt.compare(password, user.password)
        //const isSuccess = password === user.password

        if (isSuccess) {
            const payload = {
                id: user.id,
                fullName: user.fullName
            };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
            res.header('Authorization', 'Bearer '+ token);
            res.status(200).send({ token });
        } else {
            res.status(400).send({ message: 'Invalid email or password' });
        }
    }
};
