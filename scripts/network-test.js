// Basic network connectivity test
require('dotenv').config();
const dns = require('dns');
const { exec } = require('child_process');

function extractHostname(url) {
  // Extract hostname from MongoDB connection string
  if (url.includes('@') && url.includes('/')) {
    const hostPart = url.split('@')[1].split('/')[0];
    return hostPart;
  }
  return url;
}

function dnsLookup(hostname) {
  return new Promise((resolve, reject) => {
    console.log(`Performing DNS lookup for: ${hostname}`);
    dns.lookup(hostname, (err, address, family) => {
      if (err) {
        console.error(`❌ DNS lookup failed: ${err.message}`);
        reject(err);
      } else {
        console.log(`✅ DNS lookup successful! IP: ${address}, IPv${family}`);
        resolve({ address, family });
      }
    });
  });
}

function pingHost(hostname) {
  return new Promise((resolve, reject) => {
    console.log(`Pinging ${hostname}...`);
    
    // Use different ping commands based on platform
    const cmd = process.platform === 'win32' 
      ? `ping -n 3 ${hostname}` 
      : `ping -c 3 ${hostname}`;
    
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Ping failed: ${error.message}`);
        console.log(stderr);
        reject(error);
      } else {
        console.log(`✅ Ping results:`);
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
}

async function testNetworkConnectivity() {
  try {
    const uri = process.env.DATABASE_URL;
    console.log(`Using connection string (partial): ${uri.substring(0, 40)}...`);
    
    const hostname = extractHostname(uri);
    console.log(`Extracted hostname: ${hostname}`);
    
    // Test DNS resolution
    try {
      await dnsLookup(hostname);
    } catch (dnsError) {
      console.error('DNS resolution failed. This is likely a network or DNS issue.');
      console.error('Possible causes:');
      console.error('  - Check your internet connection');
      console.error('  - Your DNS server might be having issues');
      console.error('  - Network firewall might be blocking DNS lookups');
      console.error('  - The MongoDB Atlas cluster might not exist or has been deleted');
    }
    
    // Test ping (might fail due to firewall even if DNS works)
    try {
      await pingHost(hostname);
    } catch (pingError) {
      console.error('Ping failed. This could be due to:');
      console.error('  - Firewall blocking ICMP packets');
      console.error('  - Host is down or unreachable');
    }
    
    console.log('\nNetwork test completed');
  } catch (error) {
    console.error('Error during network test:', error.message);
  }
}

// Run the test
testNetworkConnectivity(); 