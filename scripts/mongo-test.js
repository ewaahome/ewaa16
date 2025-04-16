// Basic MongoDB connection test using native driver
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function testMongoConnection() {
  console.log('Testing MongoDB connection directly...');
  
  const uri = process.env.DATABASE_URL;
  console.log(`Using connection string (partial): ${uri.substring(0, 40)}...`);
  
  const client = new MongoClient(uri, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000,
  });
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connection successful!');
    
    console.log('Listing databases...');
    const dbs = await client.db().admin().listDatabases();
    console.log('✅ Available databases:');
    dbs.databases.forEach(db => {
      console.log(`  - ${db.name}`);
    });
    
    return { success: true };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    // Network analysis
    if (error.message.includes('getaddrinfo') || error.message.includes('No such host')) {
      console.error('  - DNS lookup failed. The hostname could not be resolved.');
      console.error('  - This may be due to network connectivity issues or an incorrect hostname.');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('  - Connection refused. The server is not accepting connections on the specified port.');
    } else if (error.message.includes('timed out')) {
      console.error('  - Connection timed out. The server might be down or firewall is blocking the connection.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('  - Authentication failed. Check username and password.');
    }
    
    return { success: false, error: error.message };
  } finally {
    try {
      await client.close();
      console.log('MongoDB connection closed.');
    } catch (closeError) {
      console.error('Error closing connection:', closeError.message);
    }
  }
}

// Run the test
testMongoConnection()
  .then((result) => {
    console.log('\nTest completed');
    process.exit(result.success ? 0 : 1);
  })
  .catch((err) => {
    console.error('Unhandled error in test script:', err);
    process.exit(1);
  }); 