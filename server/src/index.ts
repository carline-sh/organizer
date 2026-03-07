import cors from 'cors'
import express from 'express'
import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';
import openGraphScraper from 'open-graph-scraper';

type Product = { product_id: number, name: string, tags: string[] };
type Recipe = { recipe_id: number, name: string, url: string, image: string, description: string };
type DatePlanning = { day: string, recipe_id: string | undefined, note: string | undefined }

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

const loadRecipes = () => {
    try {
        const data = readFileSync('recipes.json', 'utf-8');
        return JSON.parse(data) as Recipe[];
    } catch (error) {
        console.error('Failed to load recipes', error);
        return [];
    }
};

const loadDatePlanning = () => {
    try {
        const data = readFileSync('date-planning.json', 'utf-8');
        return JSON.parse(data) as DatePlanning[];
    } catch (error) {
        console.error('Failed to load date planning', error);
        return [];
    }
};

let shoppingList = loadShoppingList();
let recipes = loadRecipes();
let datePlanning = loadDatePlanning();

const saveShoppinglist = async () => {
    await writeFile('shopping-list.json', JSON.stringify(shoppingList, null, 2));
};

const saveRecipes = async () => {
    await writeFile('recipes.json', JSON.stringify(recipes, null, 2));
};

const saveDatePlanning = async () => {
    await writeFile('date-planning.json', JSON.stringify(datePlanning, null, 2));
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

    await saveShoppinglist();

    res.status(201).json(item);
})

app.delete('/shopping-list', async (req, res) => {
    const { product_id } = req.body;
    shoppingList = shoppingList.filter(item => item.product_id !== product_id);
    await saveShoppinglist();
    res.status(200).json({ message: 'Item deleted' });
})

app.get('/recipes', (req, res) => {
    res.json(recipes)
})

app.post('/recipes', async (req, res) => {
    // add the thing to shoppinglist

    const item = req.body;
    item.recipe_id = Math.round(Math.random() * 1000000);

    recipes.push(item);

    await saveRecipes();

    res.status(201).json(item);
})

app.delete('/recipes', async (req, res) => {
    const { recipe_id } = req.body;
    recipes = recipes.filter(item => item.recipe_id !== recipe_id);
    await saveRecipes();
    res.status(200).json({ message: 'Item deleted' });
})

app.get('/scrape', async (req, res) => {
    const { url } = req.query as { url: string };
    const result = await openGraphScraper({ url });
    res.json(result);
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
