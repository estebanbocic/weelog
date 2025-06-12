/**
 * Node.js Server Example with WeeLog
 * Shows how to integrate WeeLog in a real Node.js application
 */

import express from 'express';
import { Logger } from 'weelog';

const app = express();
const port = 3000;

// Configure logger for production server
const logger = new Logger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  enableMemoryTracking: true,
  logMemoryInline: process.env.NODE_ENV !== 'production',
  enablePerformanceTracking: true,
  enableLogAnalytics: true,
  maxLogHistory: 1000,
  useTimestamp: true
});

// Middleware for request logging
app.use((req, res, next) => {
  const startTime = Date.now();
  
  logger.withContext('HTTP').info('Request received', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLevel = res.statusCode >= 400 ? 'error' : 'info';
    
    logger.withContext('HTTP')[logLevel]('Request completed', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
});

// Simulated database operations
async function simulateDatabase(operation, delay = 50) {
  logger.startPerformanceTimer(`db-${operation}`);
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  if (Math.random() > 0.9) {
    logger.withContext('Database').error(`${operation} failed`, {
      operation,
      error: 'Connection timeout'
    });
    throw new Error('Database operation failed');
  }

  logger.endPerformanceTimer(`db-${operation}`, `Database ${operation} completed`);
  return { success: true, operation };
}

// Routes
app.get('/', (req, res) => {
  logger.withContext('Route').info('Home page accessed');
  res.json({ message: 'WeeLog Server Example', timestamp: new Date().toISOString() });
});

app.get('/users', async (req, res) => {
  try {
    logger.withContext('Route').info('Users endpoint accessed');
    const result = await simulateDatabase('select-users', 100);
    
    res.json({
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
    });
  } catch (error) {
    logger.withContext('Route').error('Users endpoint failed', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/users', async (req, res) => {
  try {
    logger.withContext('Route').info('Creating new user');
    const result = await simulateDatabase('insert-user', 75);
    
    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: 3, name: 'New User', email: 'new@example.com' }
    });
  } catch (error) {
    logger.withContext('Route').error('User creation failed', { error: error.message });
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const analytics = logger.getAnalytics();
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    logging: {
      totalLogs: analytics.totalLogs,
      errorRate: analytics.errorRate,
      logsByLevel: analytics.logsByLevel
    }
  };

  logger.withContext('Health').info('Health check performed', { errorRate: analytics.errorRate });
  res.json(health);
});

// Admin endpoint to view logs
app.get('/admin/logs', (req, res) => {
  const { level, context, limit = 50 } = req.query;
  
  let logs = logger.getLogHistory();
  
  if (level) {
    logs = logger.searchLogs({ level });
  }
  
  if (context) {
    logs = logger.searchLogs({ context });
  }
  
  const recentLogs = logs.slice(-limit).map(log => ({
    timestamp: log.timestamp,
    level: log.level,
    message: log.message,
    context: log.context,
    data: log.data
  }));

  logger.withContext('Admin').info('Logs accessed', { 
    requestedLevel: level,
    requestedContext: context,
    returned: recentLogs.length 
  });

  res.json({
    logs: recentLogs,
    analytics: logger.getAnalytics()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.withContext('Error').error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  logger.withContext('Server').info('Server started', { 
    port,
    environment: process.env.NODE_ENV || 'development',
    pid: process.pid
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.withContext('Server').info('Received SIGTERM, shutting down gracefully');
  
  // Export final logs before shutdown
  const finalLogs = logger.exportLogs();
  console.log('Final session data exported');
  
  process.exit(0);
});

// Log periodic analytics
setInterval(() => {
  const analytics = logger.getAnalytics();
  logger.withContext('Analytics').info('Periodic analytics', {
    totalLogs: analytics.totalLogs,
    errorRate: analytics.errorRate,
    memoryUsage: process.memoryUsage()
  });
}, 60000); // Every minute