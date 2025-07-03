const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { connectDB, createUser, findUser, validatePassword, createApplication, getApplications, updateApplicationStatus } = require('./mongo');

const app = express();
const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(express.json());

connectDB();

app.post('/signup', async (req, res) => {
  try {
    console.log('Signup request:', req.body);
    const { name, email, password, role } = req.body;
    const existingUser = await findUser(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    await createUser(name, email, password, role);
    console.log('User created successfully');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);
    console.log('Found user:', user);
    if (!user || !(await validatePassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
    const response = { token, role: user.role, name: user.name, userId: user._id };
    console.log('Login response:', response);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Welcome to ${req.user.role} dashboard`, user: req.user });
});

app.post('/apply', authMiddleware, async (req, res) => {
  try {
    const { jobId, jobTitle, userName, userEmail } = req.body;
    const applicationData = {
      jobId,
      userId: req.user.userId,
      jobTitle,
      userName,
      userEmail
    };
    await createApplication(applicationData);
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    if (error.message === 'Application already exists') {
      res.status(400).json({ error: 'You have already applied for this job' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

app.get('/applications', authMiddleware, async (req, res) => {
  try {
    const applications = await getApplications();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/applications/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateApplicationStatus(id, status);
    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});