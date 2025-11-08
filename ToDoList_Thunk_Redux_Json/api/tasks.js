// Vercel Serverless Function for Todo API
// Note: In-memory storage resets between deployments
// For persistent storage, integrate with a database (MongoDB, Supabase, etc.)

// Shared in-memory store (resets when function cold starts)
let tasksStore = [];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;
  const { id } = req.query;
  
  // Parse request body for POST and PUT requests
  let body = {};
  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else {
        body = req.body || {};
      }
    } catch (error) {
      res.status(400).json({ error: 'Invalid JSON in request body' });
      return;
    }
  }

  switch (method) {
    case 'GET':
      // GET /api/tasks - Get all tasks
      // GET /api/tasks?id=123 - Get specific task
      if (id) {
        const task = tasksStore.find(t => t.id === id);
        if (task) {
          res.status(200).json(task);
        } else {
          res.status(404).json({ error: 'Task not found' });
        }
      } else {
        res.status(200).json(tasksStore);
      }
      break;

    case 'POST':
      // POST /api/tasks - Create new task
      if (!body.text) {
        res.status(400).json({ error: 'Task text is required' });
        return;
      }
      const newTask = {
        id: Date.now().toString(),
        text: body.text,
      };
      tasksStore.push(newTask);
      res.status(201).json(newTask);
      break;

    case 'PUT':
      // PUT /api/tasks?id=123 - Update task
      if (!id) {
        res.status(400).json({ error: 'Task ID is required' });
        return;
      }
      const taskIndex = tasksStore.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        tasksStore[taskIndex] = { ...tasksStore[taskIndex], ...body };
        res.status(200).json(tasksStore[taskIndex]);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
      break;

    case 'DELETE':
      // DELETE /api/tasks?id=123 - Delete task
      if (!id) {
        res.status(400).json({ error: 'Task ID is required' });
        return;
      }
      const deleteIndex = tasksStore.findIndex(t => t.id === id);
      if (deleteIndex !== -1) {
        tasksStore.splice(deleteIndex, 1);
        res.status(200).json({ id: id, message: 'Task deleted' });
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
