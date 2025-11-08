// Example: API with JSONBin.io for persistent storage
// Replace api/tasks.js with this code and add your JSONBin credentials

// Install: npm install axios
// import axios from 'axios';

// const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
// const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID;
// const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// export default async function handler(req, res) {
//   // Set CORS headers
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   const { method } = req;
//   const { id } = req.query;

//   try {
//     // Fetch current data from JSONBin
//     const getResponse = await axios.get(JSONBIN_URL + '/latest', {
//       headers: {
//         'X-Master-Key': JSONBIN_API_KEY,
//       },
//     });
//     let tasks = getResponse.data.record.tasks || [];

//     switch (method) {
//       case 'GET':
//         if (id) {
//           const task = tasks.find(t => t.id === id);
//           if (task) {
//             res.status(200).json(task);
//           } else {
//             res.status(404).json({ error: 'Task not found' });
//           }
//         } else {
//           res.status(200).json(tasks);
//         }
//         break;

//       case 'POST':
//         const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
//         if (!body.text) {
//           res.status(400).json({ error: 'Task text is required' });
//           return;
//         }
//         const newTask = {
//           id: Date.now().toString(),
//           text: body.text,
//         };
//         tasks.push(newTask);
        
//         // Save to JSONBin
//         await axios.put(JSONBIN_URL, { tasks }, {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Master-Key': JSONBIN_API_KEY,
//           },
//         });
        
//         res.status(201).json(newTask);
//         break;

//       case 'PUT':
//         if (!id) {
//           res.status(400).json({ error: 'Task ID is required' });
//           return;
//         }
//         const updateBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
//         const taskIndex = tasks.findIndex(t => t.id === id);
//         if (taskIndex !== -1) {
//           tasks[taskIndex] = { ...tasks[taskIndex], ...updateBody };
          
//           // Save to JSONBin
//           await axios.put(JSONBIN_URL, { tasks }, {
//             headers: {
//               'Content-Type': 'application/json',
//               'X-Master-Key': JSONBIN_API_KEY,
//             },
//           });
          
//           res.status(200).json(tasks[taskIndex]);
//         } else {
//           res.status(404).json({ error: 'Task not found' });
//         }
//         break;

//       case 'DELETE':
//         if (!id) {
//           res.status(400).json({ error: 'Task ID is required' });
//           return;
//         }
//         const deleteIndex = tasks.findIndex(t => t.id === id);
//         if (deleteIndex !== -1) {
//           tasks.splice(deleteIndex, 1);
          
//           // Save to JSONBin
//           await axios.put(JSONBIN_URL, { tasks }, {
//             headers: {
//               'Content-Type': 'application/json',
//               'X-Master-Key': JSONBIN_API_KEY,
//             },
//           });
          
//           res.status(200).json({ id: id, message: 'Task deleted' });
//         } else {
//           res.status(404).json({ error: 'Task not found' });
//         }
//         break;

//       default:
//         res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
//   } catch (error) {
//     console.error('API Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

