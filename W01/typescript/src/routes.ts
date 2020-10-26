import { Request, Response } from "express";
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: 'paulo@paulo.com',
        password: '123456',
        techs: [{title: 'Javascrit', experience: 100}]    
    });

    return response.json({message: 'Hello World'})
}