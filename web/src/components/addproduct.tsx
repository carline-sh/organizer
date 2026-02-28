import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const AddProductForm = () => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: async (product: { name: string, price: number }) => {
            const result = await fetch('http://localhost:3000/shopping-list', {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return result.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['shopping-list'] })
        },
    })
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    return (
        <form className="border p-2 flex flex-col gap-2" onSubmit={(e) => {
            e.preventDefault()
            mutate({ name, price })
        }}>
            <input type="text" placeholder="Name" className="border p-2" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Price" className="border p-2" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
            <button type="submit" className="bg-blue-500 text-white p-2">Add</button>
        </form>
    )
}
