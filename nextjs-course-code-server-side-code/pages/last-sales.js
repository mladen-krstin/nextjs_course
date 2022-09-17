import link from "next/link";
import { useEffect, useState } from "react";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://nextjs-course-fd0ce-default-rtdb.firebaseio.com/sales.json').then(response => response.json()).then(data => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        });
      }

      setSales(transformedSales);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!sales) {
    return <p>No data yet</p>;
  }

  return (
    <ul>
      {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://nextjs-course-fd0ce-default-rtdb.firebaseio.com/sales.json');

  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume
    });
  }
  return {
    props: { sales: transformedSales }, revalidate: 10
  };
}

export default LastSalesPage;