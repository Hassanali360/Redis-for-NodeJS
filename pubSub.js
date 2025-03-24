// Publisher sends a message to a channel and the subscriber consumes it
const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('error', (error) => 
    console.log('Redis client error occurred:', error)
);

async function testAdditionalFeatures() {
    try {
        await client.connect();

        const subscriber = client.duplicate(); // Create a new client sharing the same connection
        await subscriber.connect(); // Connect subscriber to Redis server

        // Subscribe to channel
        await subscriber.subscribe('dummy-channel', (message, channel) => {
            console.log(`Received message from ${channel}: ${message}`);
        });

        // Publish message to dummy channel
        await client.publish("dummy-channel", "some dummy data to publisher");
        
        // Wait for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Unsubscribe from the channel
        await subscriber.unsubscribe('dummy-channel');

        // Properly quit subscriber
        await subscriber.quit();
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Properly quit the main client
        await client.quit();
    }
}

// Run the function
testAdditionalFeatures();
