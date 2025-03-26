import { QueryResult } from '../index';

export function convertToCSV(results: QueryResult): string {
  if (!results || !results.data.length) return '';

  const headers = results.columns.join(',');
  const rows = results.data.map(row => 
    results.columns.map(col => 
      JSON.stringify(row[col])
    ).join(',')
  );

  return [headers, ...rows].join('\n');
}

export function exportToCSV(results: QueryResult, filename: string = 'query_results.csv') {
  const csvContent = convertToCSV(results);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
