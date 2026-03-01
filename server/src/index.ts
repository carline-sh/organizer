import cors from 'cors'
import express from 'express'
import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';

type Product = { product_id: number, name: string, tags: string[] };

const loadShoppingList = () => {
    try {
        const data = readFileSync('shopping-list.json', 'utf-8');
        return JSON.parse(data) as Product[];
    } catch (error) {
        console.error('Failed to load shopping list', error);
        return [
            { product_id: 1, name: 'Milk', tags: ['supermarkt'] },
            { product_id: 2, name: 'Bread', tags: ['supermarkt'] },
            { product_id: 3, name: 'Eggs', tags: ['supermarkt'] },
        ];
    }
};

let shoppingList = loadShoppingList();

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
    item.product_id = Math.round(Math.random() * 1000000);

    shoppingList.push(item);

    await save();

    res.status(201).json(item);
})

app.delete('/shopping-list', async (req, res) => {
    const { product_id } = req.body;
    shoppingList = shoppingList.filter(item => item.product_id !== product_id);
    await save();
    res.status(200).json({ message: 'Item deleted' });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})