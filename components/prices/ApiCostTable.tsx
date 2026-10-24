import React from 'react';
import styles from './ApiCostTable.module.css';

interface ApiCostItem {
  model: string;
  inputCost: string;
  outputCost: string;
}

interface ApiCostTableProps {
  items?: ApiCostItem[];
}

export const ApiCostTable: React.FC<ApiCostTableProps> = ({ items = [] }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Model</th>
            <th>Input Cost / 1M Tokens</th>
            <th>Output Cost / 1M Tokens</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.model}</td>
              <td>{item.inputCost}</td>
              <td>{item.outputCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiCostTable;
