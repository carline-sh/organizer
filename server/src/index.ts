import cors from 'cors'
import express from 'express'

const shoppingList = [
    { id: 1, name: 'Milk', price: 1.99 },
    { id: 2, name: 'Bread', price: 2.99 },
    { id: 3, name: 'Eggs', price: 3.99 },
]

const app = express()

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/shopping-list', (req, res) => {
    res.json(shoppingList)
})

app.post('/shopping-list', (req, res) => {
    // add the thing to shoppinglist

    const item = req.body;

    shoppingList.push(item);

    res.status(201).json(item);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})