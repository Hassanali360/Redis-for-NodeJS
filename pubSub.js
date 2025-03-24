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

//pipelining and trabsaction
//pipelining technique of sending batch of commands to redis server
//allowing multipple commands to bee executted in single unit of work

const multi = client.multi();
multi.set("key-transaction1", "value1")
multi.set("key-transaction2", "value2")
multi.get("key-transaction1")
multi.get("key-transaction2")

const results = await multi.exec()
console.log(results)

const pipline = client.multi()
multi.set("key-pipline1", "value1")
multi.set("key-pipline2", "value2")
multi.get("key-pipline1")
multi.get("key-pipline2")

const piplineresults = await multi.exec()
console.log(piplineresults)

//batchdataoperation

const piplineone = client.multi()
for(let i = 0 ; i<1000 ; i++){
    pipline.set(`user:${i}:action` , `Action ${i}`)
}

const piplineoneResult = await piplineone.exec()
console.log(piplineoneResult)

const dummyTransaction = client.multi()
multi.decrBy('account:1234:balance' , 100);
multi.incrBy('account:0000:balance', 100);

const finalresult = await multi.exec();
console.log(finalresult);


//performance test




    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Properly quit the main client
        await client.quit();
    }
}

// Run the function
testAdditionalFeatures();
