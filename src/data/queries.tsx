import { Query } from '../index';

export const initialQueries: Query[] = [
  {
    id: 'q1',
    name: 'Top 10 Customers',
    queryText: 'SELECT * FROM customers ORDER BY total_purchases DESC LIMIT 10',
    sampleData: [
      { id: 1, name: 'John Doe', total_purchases: 5000 },
      { id: 2, name: 'Jane Smith', total_purchases: 4500 },
    ]
  },
  {
    id: 'q2',
    name: 'Product Sales by Category',
    queryText: 'SELECT category, SUM(sales) as total_sales FROM products GROUP BY category',
    sampleData: [
      { category: 'Electronics', total_sales: 150000 },
      { category: 'Clothing', total_sales: 75000 },
    ]
  }
];