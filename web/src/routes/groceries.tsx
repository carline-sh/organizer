import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AddProductForm } from '../components/addproduct';
import { FiRefreshCcw, FiTrash } from 'react-icons/fi';

export const Route = createFileRoute('/groceries')({
  component: RouteComponent,
})

type Product = { id: number, name: string, price: number };

function RouteComponent() {
  const { data, refetch } = useQuery({
    queryKey: ['shopping-list'],
    queryFn: async () => {
      const result = await fetch('http://localhost:3000/shopping-list')
      return result.json() as Promise<Product[]>
    },
  });

  return (
    <div className="border border-gray-300 rounded-md p-2">
      <AddProductForm />
      <hr className="my-2 border-cyan-400" />
      <button className="rounded-md p-2 border border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-100 active:translate-y-0.5" onClick={() => refetch()}>
        <FiRefreshCcw />
      </button>
      <ul className="">
        {
          data?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        }
      </ul>
    </div>);
}

const ProductItem = (props: { product: Product }) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async (product: { id: number }) => {
      const result = await fetch('http://localhost:3000/shopping-list', {
        method: 'DELETE',
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

  return (
    <li key={props.product.id} className='text-gray-700 flex justify-between py-2 px-2 mt-2 odd:bg-gray-100 items-center border border-gray-300 rounded-md'>
      {props.product.name} - {props.product.price}
      <button className="p-2 cursor-pointer rounded-md hover:bg-red-400 hover:text-white active:translate-y-0.5" onClick={() => mutate({ id: props.product.id })}><FiTrash className="text-gray-700" /></button>
    </li>
  )
}
