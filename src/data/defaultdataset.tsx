export const defaultCustomers = [
  {
    customer_id: 'c2',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-5678',
    address: {
      street: '456 Oak Ave',
      city: 'Othertown',
      state: 'CA',
      country: 'USA',
      zip: '90001'
    },
    total_purchases: 7500,
    registration_date: '2021-10-20',

  }]
export const defaultProducts = [
  {
    product_id: 'p1',
    name: 'Laptop Pro',
    category: 'Electronics',
    price: 1200,
    stock: 30,
    description: 'A high performance laptop for professionals.',
    manufacturer: 'TechCorp',
    sku: 'LP1000',
    rating: 4.5
  }
];

export const defaultSales = [
  {
    sale_id: 's1',
    product_id: 'p1',
    product_name: 'Laptop Pro',
    customer_id: 'c1',
    customer_name: 'John Doe',
    quantity: 1,
    total_price: 1200,
    sale_date: '2023-03-01',
    payment_method: 'Credit Card',
    discount: 0.05
  }
];

export const defaultEmployees = [
  {
    employee_id: 'e1',
    first_name: 'Alice',
    last_name: 'Brown',
    email: 'alice.brown@example.com',
    department: 'Sales',
    hire_date: '2019-07-10',
    salary: 60000,
    performance_rating: 4.3
  }
];
