const redis = require('redis')

const client = redis.createClient({
    host : 'localhost',
    port : 6379
})

//event listerner

client.on('error', (error) =>
console.log('Rdis client error is occured', error) );

async function testredisconnection () {
    try{
        await client.connect()
        console.log('connected to redis');

        await client.set("key", "hassan");
        const extractValue = await client.get("key")
        console.log(extractValue);

        const deleteCount = await client.del("key")
        console.log(deleteCount)

        const extractupdatedval = await client.get('name')
        console.log(extractupdatedval)

        await client.set ("key", 100)
        const incrementCount =  await client.incr("key")
        console.log(incrementCount); // simmilarly increment is done

    }catch{
        console.log(error);
    }finally{
        await client.quit()
    }
}

testredisconnection();