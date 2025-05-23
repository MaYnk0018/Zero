import { Query } from '../index';
import { 
  defaultCustomers, 
  defaultProducts, 
  defaultSales, 
  defaultEmployees 
} from '../data/defaultdataset';

export class QuerySimulator {
  private static generateRepeatedData(originalData: any[], count: number = 50): any[] {
    return Array.from({ length: count }, () => [...originalData]).flat().map((item, index) => {
      const newItem = { ...item };
      
      if (newItem.customer_id) {
        newItem.customer_id = `c${index + 1}`;
      }
      if (newItem.product_id) {
        newItem.product_id = `p${index + 1}`;
      }
      if (newItem.sale_id) {
        newItem.sale_id = `s${index + 1}`;
      }
      if (newItem.employee_id) {
        newItem.employee_id = `e${index + 1}`;
      }
      
      return newItem;
    });
  }

  private static datasets: { [key: string]: any[] } = {
    customers: this.generateRepeatedData(defaultCustomers, 50),
    products: this.generateRepeatedData(defaultProducts, 50),
    sales: this.generateRepeatedData(defaultSales, 50),
    employees: this.generateRepeatedData(defaultEmployees, 50)
  };

  static executeQuery(xc: Query): { columns: string[], data: any[] } {
    const { queryText } = xc;
    // console.log('Executing query:', queryText);

    try {
      const normalizedQuery = queryText.toLowerCase().trim();

      let targetDataset: any[] = [];
      for (const [tableName, dataset] of Object.entries(this.datasets)) {
        if (normalizedQuery.includes(tableName)) {
          targetDataset = dataset;
          break;
        }
      }

      if (targetDataset.length === 0) {
        return {
          columns: [],
          data: []
        };
      }

      let resultData = targetDataset;

      if (normalizedQuery.includes('order by')) {
        const orderColumn = normalizedQuery.split('order by')[1].split(' ')[1];
        resultData = [...resultData].sort((a, b) =>
          a[orderColumn] > b[orderColumn] ? 1 : -1
        );
      }

      if (normalizedQuery.includes('limit')) {
        const limitCount = parseInt(
          normalizedQuery.split('limit')[1].trim().split(' ')[0]
        );
        resultData = resultData.slice(0, limitCount);
      }

      // console.log('Result data:', resultData);
      return {
        columns: Object.keys(resultData[0] || {}),
        data: resultData
      };
    } catch (error) {
      console.error('Query simulation error:', error);
      return {
        columns: [],
        data: []
      };
    }
  }
}

export function explainQuery(queryText?: string): string {
  if (!queryText) {
    return 'No query provided for explanation.';
  }

  const normalizedQuery = queryText.toLowerCase().trim();

  const explanations: { [key: string]: string } = {
    'select * from customers': 'Retrieves all customer information from the database.',
    'select * from products': 'Fetches details of all products in the inventory.',
    'select * from sales': 'Shows all sales transactions recorded.',
    'select * from employees': 'Displays comprehensive employee information.',
  };

  if (normalizedQuery.includes('count(*)')) {
    return 'Counts the total number of records in the specified table.';
  }

  if (normalizedQuery.includes('group by')) {
    return 'Groups data based on specified column(s).';
  }

  if (normalizedQuery.includes('order by')) {
    return 'Sorts the result set in ascending/descending order.';
  }

  return explanations[normalizedQuery] || 'Complex query analysis not available.';
}