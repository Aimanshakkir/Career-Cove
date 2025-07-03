const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = "mongodb+srv://admin:admin@cluster0.95uxqqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("careercove");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

async function createUser(name, email, password, role = 'user') {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date()
  };
  return await db.collection('users').insertOne(user);
}

async function findUser(email) {
  return await db.collection('users').findOne({ email });
}

async function validatePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function createApplication(applicationData) {
  // Check for existing application
  const existingApp = await db.collection('applications').findOne({
    jobId: applicationData.jobId,
    userId: applicationData.userId
  });
  
  if (existingApp) {
    throw new Error('Application already exists');
  }
  
  const application = {
    ...applicationData,
    appliedDate: new Date(),
    status: 'pending'
  };
  return await db.collection('applications').insertOne(application);
}

async function getApplications() {
  return await db.collection('applications').find({}).toArray();
}

async function updateApplicationStatus(applicationId, status) {
  const { ObjectId } = require('mongodb');
  return await db.collection('applications').updateOne(
    { _id: new ObjectId(applicationId) },
    { $set: { status } }
  );
}

module.exports = { connectDB, createUser, findUser, validatePassword, createApplication, getApplications, updateApplicationStatus };