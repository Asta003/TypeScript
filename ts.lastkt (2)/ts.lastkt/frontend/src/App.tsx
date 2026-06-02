import React, { useState } from 'react';
import './App.css';
import * as api from './api';

interface SuccessResponse {
    message: string;
    id?: number;
    name?: string;
    surname?: string;
    pets?: string[];
    colors?: string[];
    exists?: boolean;
}

function App() {
    const [signName, setSignName] = useState('');
    const [checkName, setCheckName] = useState('');
    const [createName, setCreateName] = useState('');
    const [createSurname, setCreateSurname] = useState('');
    const [petId, setPetId] = useState('');
    const [petName, setPetName] = useState('');
    const [colorsId, setColorsId] = useState('');
    const [colorsList, setColorsList] = useState('');
    const [response, setResponse] = useState<SuccessResponse | null>(null);
    const [error, setError] = useState('');

    const clearResponse = () => {
        setResponse(null);
        setError('');
    };

    const handleSign = async () => {
        clearResponse();
        if (!signName.trim()) {
            setError('Если у вас нет имени, то кто вы вообще такой???');
            return;
        }
        const result = await api.sign(signName);
        if ('error' in result) {
            setError(result.error);
        } else {
            setResponse(result);
            setSignName('');
        }
    };

    const handleCheck = async () => {
        clearResponse();
        if (!checkName.trim()) {
            setError('Проверка обязательна, мы же не просим паспортные данные');
            return;
        }
        const result = await api.check(checkName);
        if ('error' in result) {
            setError(result.error);
        } else {
            setResponse(result);
            setCheckName('');
        }
    };

    const handleCreate = async () => {
        clearResponse();
        if (!createName.trim() || !createSurname.trim()) {
            setError('У вас может не быть отчества, но не фамилии и имени');
            return;
        }
        const result = await api.createUser(createName, createSurname);
        if ('error' in result) {
            setError(result.error);
        } else {
            setResponse(result);
            setCreateName('');
            setCreateSurname('');
        }
    };

    const handleAddPet = async () => {
        clearResponse();
        const id = parseInt(petId);
        if (isNaN(id)) {
            setError('Введите правельный номер пользователя');
            return;
        }
        if (!petName.trim()) {
            setError('Всмысле у вашего питомца нет клички.....');
            return;
        }
        const result = await api.addPet(id, petName);
        if ('error' in result) {
            setError(result.error);
        } else {
            setResponse(result);
            setPetId('');
            setPetName('');
        }
    };

    const handleAddColors = async () => {
        clearResponse();
        const id = parseInt(colorsId);
        if (isNaN(id)) {
            setError('Введите корректный номер пользователя');
            return;
        }
        if (!colorsList.trim()) {
            setError('Введите цвета через запятую');
            return;
        }
        const colorsArray = colorsList.split(',').map(c => c.trim()).filter(c => c);
        const result = await api.addColors(id, colorsArray);
        if ('error' in result) {
            setError(result.error);
        } else {
            setResponse(result);
            setColorsId('');
            setColorsList('');
        }
    };

    return (
        <div className="app">
            <h1> Отличного лета </h1>
            <div className="subtitle"> last кт чееек</div>

            <div className="container">
                <div className="card">
                    <h2> 1. Имя </h2>
                    <p>Создадим вам акк</p>
                    <input 
                        type="text" 
                        placeholder="Введите имя"
                        value={signName}
                        onChange={(e) => setSignName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSign()}
                    />
                    <button onClick={handleSign}> Создать </button>
                    <div className="example-block">
                        <p> Пример:</p>
                        <small>"Анастасия", "Илья", "Александр"</small>
                    </div>
                </div>

                <div className="card">
                    <h2> 2. Проверка</h2>
                    <p>Проверка на грамотность</p>
                    <input 
                        type="text" 
                        placeholder="Введите имя для проверки"
                        value={checkName}
                        onChange={(e) => setCheckName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                    />
                    <button onClick={handleCheck}> Проверить</button>
                    <div className="example-block">
                        <p>Результат:</p>
                        <small>ID и статус пользователя</small>
                    </div>
                </div>

                <div className="card">
                    <h2> 3. Профиль</h2>
                    <p>Добавьте свою фамилию</p>
                    <input 
                        type="text" 
                        placeholder="Имя"
                        value={createName}
                        onChange={(e) => setCreateName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Фамилия"
                        value={createSurname}
                        onChange={(e) => setCreateSurname(e.target.value)}
                    />
                    <button onClick={handleCreate}>Сохранить </button>
                    <div className="example-block">
                        <p> Пример:</p>
                        <small>"Ленин", "Лапшина"</small>
                    </div>
                </div>

                <div className="card">
                    <h2> 4. Питомцы</h2>
                    <p>Добавьте друзей наших меньших</p>
                    <input 
                        type="number" 
                        placeholder="Номер пользователя"
                        value={petId}
                        onChange={(e) => setPetId(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Кличка питомца"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                    />
                    <button onClick={handleAddPet}>Добавить </button>
                    <div className="example-block">
                        <p> Пример:</p>
                        <small>ID: 1 → "Бублик", "Шарик"</small>
                    </div>
                </div>

                <div className="card">
                    <h2> 5. Цвета</h2>
                    <p>Добавьте цвета в эту серую жизнь</p>
                    <input 
                        type="number" 
                        placeholder="Номер пользователя"
                        value={colorsId}
                        onChange={(e) => setColorsId(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Цвета"
                        value={colorsList}
                        onChange={(e) => setColorsList(e.target.value)}
                    />
                    <button onClick={handleAddColors}>Добавить </button>
                    <div className="example-block">
                        <p>Пример:</p>
                        <small>ID: 1 → "синий, красный, чёрный"</small>
                    </div>
                </div>
            </div>

            <div className="result-section">
                <h3>📬 Ответ сервера:</h3>
                {error && (
                    <div className="error">
                         {error}
                    </div>
                )}
                {response && (
                    <div className="success">
                         {response.message}
                        {response.id !== undefined && <div>🆔 ID: {response.id}</div>}
                        {response.name && <div> Имя: {response.name}</div>}
                        {response.surname && <div> Фамилия: {response.surname}</div>}
                        {response.pets && <div> Питомцы: {response.pets.length ? response.pets.join(', ') : 'нет'}</div>}
                        {response.colors && <div> Цвета: {response.colors.length ? response.colors.join(', ') : 'нет'}</div>}
                        {response.exists !== undefined && (
                            <div>{response.exists ? ' Пользователь найден' : ' Пользователь не найден'}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;