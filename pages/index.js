import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log('Generating page...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath)

  const data = JSON.parse(jsonData);



  return {
    props: {
      products: data.products
    },
    revalidate: 1,
    // notFound: true
  };
}

export default HomePage;
