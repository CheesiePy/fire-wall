'use client'
import {useState, useEffect} from 'react';
import './FirewallRules.css'; // Import the new CSS file

interface RuleItem {
  id: number;
  value: string;
}

interface RuleCategory {
  blacklist: RuleItem[];
  whitelist: RuleItem[];
}

interface RuleSet {
  ips: RuleCategory;
  urls: RuleCategory;
  ports: RuleCategory;
}

export default function FirewallRulesPage() {
  const [rules, setRules] = useState<RuleSet | null>(null);

  useEffect(() => {
    const fetchRules = async () => {
      const origin = process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:5000';
      try {
        const response = await fetch(`${origin}/api/firewall/rules`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          setRules(data.data[0].rule_set);
        }
      } catch (error) {
        console.error("Failed to fetch rules:", error);
      }
    };
    fetchRules();
  }, []);

  const renderRuleRows = (items: RuleItem[], type: 'Blacklist' | 'Whitelist') => {
    if (items.length === 0) {
      return (
        <tr>
          <td colSpan={3} className="noRulesMessage">No {type.toLowerCase()} items.</td>
        </tr>
      );
    }
    return items.map((item) => (
      <tr key={`${type}-${item.id}`}>
        <td>{item.id}</td>
        <td>{item.value}</td>
        <td>
          <span className={`listTypeCell ${type.toLowerCase()}`}>{type}</span>
        </td>
      </tr>
    ));
  };
  
  if (!rules) {
    return <div>Loading rules...</div>;
  }

  return (
    <div className="rulesContainer">
      <h1>Firewall Rules</h1>
      
      <h2 className="categoryTitle">IP Addresses</h2>
      <table className="rulesTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {renderRuleRows(rules.ips.blacklist, 'Blacklist')}
          {renderRuleRows(rules.ips.whitelist, 'Whitelist')}
        </tbody>
      </table>

      <h2 className="categoryTitle">URLs</h2>
      <table className="rulesTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {renderRuleRows(rules.urls.blacklist, 'Blacklist')}
          {renderRuleRows(rules.urls.whitelist, 'Whitelist')}
        </tbody>
      </table>

      <h2 className="categoryTitle">Ports</h2>
      <table className="rulesTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Port</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {renderRuleRows(rules.ports.blacklist, 'Blacklist')}
          {renderRuleRows(rules.ports.whitelist, 'Whitelist')}
        </tbody>
      </table>
    </div>
  );
}