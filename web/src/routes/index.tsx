import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { AddProductForm } from '../components/addproduct';

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
            <li key={product.id} className='flex justify-between py-2 px-2 odd:bg-gray-100'>
              {product.name} - {product.price}
            </li>
          ))
        }
      </ul>
    </div>);
}
