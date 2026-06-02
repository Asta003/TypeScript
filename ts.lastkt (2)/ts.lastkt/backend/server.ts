import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


interface User {
    id: number;
    name: string;
    surname?: string;
    pets: string[];
    colors: string[];
}


let users: User[] = [];
let nextId = 1;

app.post('/sign', (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        res.status(400).json({ error: 'Имя обязательно!' });
        return;
    }
    
    const existingUser = users.find(u => u.name.toLowerCase() === name.toLowerCase());
    if (existingUser) {
        res.status(400).json({ error: 'Такое имя уже есть!' });
        return;
    }
    
    const newUser: User = {
        id: nextId,
        name: name,
        pets: [],
        colors: []
    };
    users.push(newUser);
    nextId++;
    
    res.json({
        id: newUser.id,
        message: `Привет, ${name}! Твой номер - ${newUser.id}`
    });
});


app.post('/check', (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        res.status(400).json({ error: 'Имя обязательно!' });
        return;
    }
    
    const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
    
    if (user) {
        res.json({
            exists: true,
            id: user.id,
            message: `Пользователь ${name} найден! Номер: ${user.id}`
        });
    } else {
        res.json({
            exists: false,
            message: `Пользователь ${name} не найден :(`
        });
    }
});


app.post('/create', (req, res) => {
    const { name, surname } = req.body;
    
    if (!name || !surname) {
        res.status(400).json({ error: 'Имя и фамилия обязательны!' });
        return;
    }
    
    const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
    
    if (user) {
        user.surname = surname;
        res.json({
            id: user.id,
            name: user.name,
            surname: user.surname,
            message: `${user.name} теперь с фамилией ${surname}!`
        });
    } else {
        const newUser: User = {
            id: nextId,
            name: name,
            surname: surname,
            pets: [],
            colors: []
        };
        users.push(newUser);
        nextId++;
        
        res.json({
            id: newUser.id,
            name: newUser.name,
            surname: newUser.surname,
            message: `Создан новый пользователь ${name} ${surname} с номером ${newUser.id}!`
        });
    }
});


app.post('/pet', (req, res) => {
    const { id, pet } = req.body;
    

    if (id === undefined || !pet) {
        res.status(400).json({ error: 'Номер и питомец обязательны!' });
        return;
    }
    

    const user = users.find(u => u.id === id);
    

    if (!user) {
        res.status(400).json({ error: `Пользователь с номером ${id} не найден!` });
        return;
    }
    
  
    user.pets.push(pet);


    res.json({
        id: user.id,
        name: user.name,
        pets: user.pets,
        message: `${user.name} завёл питомца: ${pet}. Все питомцы: ${user.pets.join(', ')}`  // ← ВАЖНО: $ перед скобками!
    });
});


app.post('/colors', (req, res) => {
    const { id, colors } = req.body;
    

    if (id === undefined || !colors || !Array.isArray(colors)) {
        res.status(400).json({ error: 'Номер и массив цветов обязательны!' });
        return;
    }
    

    const user = users.find(u => u.id === id);
    
  
    if (!user) {
        res.status(400).json({ error: `Пользователь с номером ${id} не найден!` });
        return;
    }
    

    for (let color of colors) {
        user.colors.push(color);
    }
    

    res.json({
        id: user.id,
        name: user.name,
        colors: user.colors,
        message: `${user.name} добавил цвета: ${colors.join(', ')}. Любимые цвета: ${user.colors.join(', ')}`  // ← ВАЖНО: $ перед скобками!
    });
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Доступные эндпоинты:');
    console.log('  POST /sign    - регистрация');
    console.log('  POST /check   - проверка имени');
    console.log('  POST /create  - добавить фамилию');
    console.log('  POST /pet     - добавить питомца');
    console.log('  POST /colors  - добавить цвета');
});