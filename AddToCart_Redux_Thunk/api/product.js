import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the db.json file
let db;
try {
  const dbPath = join(__dirname, '..', 'db.json');
  const dbData = readFileSync(dbPath, 'utf8');
  db = JSON.parse(dbData);
} catch (error) {
  console.error('Error loading db.json:', error);
  db = { product: [] };
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method === 'GET') {
    res.status(200).json(db.product);
    return;
  }

  // Method not allowed
  res.status(405).json({ error: 'Method not allowed' });
}

