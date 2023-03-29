import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль минимум 5 сим').isLength({ min: 5 }),
    body('fullName', 'Укажите имя мин 3 сим').isLength({ min: 3 }),
    body('avatarUrl', 'Неверный формат ссылки').optional().isURL(),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль минимум 5 сим').isLength({ min: 5 }),
]