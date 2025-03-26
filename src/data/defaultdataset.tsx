export const defaultCustomers = [
    {
      customer_id: 'c1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-1234',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'NY',
        country: 'USA',
        zip: '10001'
      },
      total_purchases: 5000,
      registration_date: '2022-01-15',
      is_active: true
    },
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
      is_active: true
    },
    {
      customer_id: 'c3',
      first_name: 'Bob',
      last_name: 'Johnson',
      email: 'bob.johnson@example.com',
      phone: '555-8765',
      address: {
        street: '789 Pine Rd',
        city: 'Sometown',
        state: 'TX',
        country: 'USA',
        zip: '75001'
      },
      total_purchases: 3200,
      registration_date: '2020-05-30',
      is_active: false
    }
  ];
  
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
    },
    {
      product_id: 'p2',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 200,
      stock: 100,
      description: 'Noise-cancelling over-ear headphones.',
      manufacturer: 'SoundMagic',
      sku: 'WH200',
      rating: 4.2
    },
    {
      product_id: 'p3',
      name: 'Coffee Maker',
      category: 'Home Appliances',
      price: 150,
      stock: 50,
      description: 'Brews the perfect cup of coffee.',
      manufacturer: 'KitchenPro',
      sku: 'CM300',
      rating: 4.0
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
    },
    {
      sale_id: 's2',
      product_id: 'p2',
      product_name: 'Wireless Headphones',
      customer_id: 'c2',
      customer_name: 'Jane Smith',
      quantity: 2,
      total_price: 400,
      sale_date: '2023-03-05',
      payment_method: 'PayPal',
      discount: 0.1
    },
    {
      sale_id: 's3',
      product_id: 'p3',
      product_name: 'Coffee Maker',
      customer_id: 'c3',
      customer_name: 'Bob Johnson',
      quantity: 1,
      total_price: 150,
      sale_date: '2023-02-25',
      payment_method: 'Cash',
      discount: 0
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
    },
    {
      employee_id: 'e2',
      first_name: 'David',
      last_name: 'Wilson',
      email: 'david.wilson@example.com',
      department: 'Marketing',
      hire_date: '2018-04-15',
      salary: 65000,
      performance_rating: 4.0
    },
    {
      employee_id: 'e3',
      first_name: 'Emma',
      last_name: 'Taylor',
      email: 'emma.taylor@example.com',
      department: 'IT',
      hire_date: '2020-11-01',
      salary: 75000,
      performance_rating: 4.5
    }
  ];
  