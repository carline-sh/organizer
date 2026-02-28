import cors from 'cors'
import express from 'express'
import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';

type Product = { id: number, name: string, price: number };

const loadShoppingList = () => {
    try {
        const data = readFileSync('shopping-list.json', 'utf-8');
        return JSON.parse(data) as Product[];
    } catch (error) {
        console.error('Failed to load shopping list', error);
        return [
            { id: 1, name: 'Milk', price: 1.99 },
            { id: 2, name: 'Bread', price: 2.99 },
            { id: 3, name: 'Eggs', price: 3.99 },
        ];
    }
};

const shoppingList = loadShoppingList();

const save = async () => {
    await writeFile('shopping-list.json', JSON.stringify(shoppingList, null, 2));
};

const app = express()

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/shopping-list', (req, res) => {
    res.json(shoppingList)
})

app.post('/shopping-list', async (req, res) => {
    // add the thing to shoppinglist

    const item = req.body;

    shoppingList.push(item);

    await save();

    res.status(201).json(item);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})