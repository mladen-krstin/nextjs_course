import { useEffect, useState } from "react";
import useSWR from 'swr';

function LastSalesPage() {
  const [sales, setSales] = useState();

  const { data, error } = useSWR('https://nextjs-course-fd0ce-default-rtdb.firebaseio.com/sales.json');

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        });
      }
    }
  }, [data]);

  if (error) {
    return <p>Falied to load!</p>
  }

  if (!data || !sales) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  );
}

export default LastSalesPage;