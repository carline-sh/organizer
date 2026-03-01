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
        <form className="py-2 text-gray-700" onSubmit={(e) => {
            e.preventDefault()
            mutate({ name, price })
        }}>
            <div className="flex flex-col gap-2 rounded-md p-2">
                <input type="text" placeholder="Name" className="border border-gray-300 rounded-md p-2 flex-1" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Price" className="border border-gray-300 rounded-md p-2 flex-1" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                <button type="submit" className="bg-cyan-700 text-white p-2 rounded-md cursor-pointer hover:bg-cyan-800 active:translate-y-0.5">Add</button>
            </div>
        </form>
    )
}
