import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AddProductForm } from '../components/addproduct';
import { FiTrash } from 'react-icons/fi';

export const Route = createFileRoute('/')({
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
    <div>
      <AddProductForm />
      Hello "/"!
      <button onClick={() => refetch()}>Refetch</button>
      <ul className="border">
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
    <li key={props.product.id} className='flex justify-between py-2 px-2 odd:bg-gray-100'>
      {props.product.name} - {props.product.price}
      <button onClick={() => mutate({ id: props.product.id })}><FiTrash /></button>
    </li>
  )
}
