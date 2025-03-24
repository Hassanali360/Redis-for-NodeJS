const redis = require('redis');

const client = redis.createClient({
    socket: { host: 'localhost', port: 6379 }
});

// Event listener
client.on('error', (error) => console.log('Redis client error occurred:', error));

async function redisDataStruct() {
    try {
        await client.connect();

        // String operations
        await client.set("user:name", "Hassan Ali");
        const name = await client.get("user:name");
        //console.log("User Name:", name);

        // Multi-set & Multi-get
        await client.mSet({
            "user:email": "hassan@hamil.com",
            "user:age": "60",
            "user:country": "Pakistan"
        });

        const values = await client.mGet(["user:email", "user:age", "user:country"]);
       // console.log("User Email:", values[0], "Age:", values[1], "Country:", values[2]);

        // List operations
        //await client.lPush("notes", [ "notes0", "note1", "note2", "note3"]);
        //const allNotes = await client.lRange("notes", 0, -1);
        //console.log("Notes:", allNotes);
         
        //const firstnote = await client.lPop('notes')
        //console.log(firstnote)

        //const remainingnotes = await client.lRange("notes", 0,-1)
        //console.log(remainingnotes)

        //sets -> SADD, SMEMBERS, SISMEMEBER, SREM

    //await client.sAdd('user:nickname' , [ 'jhon' , 'jhony' , 'xyz']);
    //const extractusername = await client.sMembers('user:nickname')
    //console.log(extractusername);

    //const isjhonavail = await client.sIsMember("user:nickname", "hassan")
    //console.log(isjhonavail);

    //await client.sRem('user:nickname', "xyz");
    //const getupdatednickanmes = await client.sMembers("user:nickname");
    //console.log(getupdatednickanmes)


    //sorted sets -> whatever elements are they have score associated with it 
    //ZADD -> add element with score
    //ZRANGE -> retrive range of element
    //ZRANK -> position of element
    //ZREM -> remove element

 //await client.zAdd('cart', [
   // {
    //    score: 100, value: 'cart 1'
    //},
    //{
      //  score: 150, value: 'cart 2'
    //},
    //{
     //   score: 10, value: 'cart 3'
    //},

// ])

 //const gettopcartitems = await client.zRange("cart", 0,-1);
 //console.log(gettopcartitems);

 //const extractallcartitemswithscore = await client.zRangeWithScores("cart", 0,-1);
 //console.log(extractallcartitemswithscore)

 //hashes -> HSET, HGET, HGETALL, HDEL


 await client.hSet('product:1',{
    name:  "Productname",
    description : "P1 description",
    Ratting : "5"
 })
const getallproductRating = await client.hGet('product:1', "Ratting")
console.log(getallproductRating);






        
    } catch (e) {
        console.error("Error:", e);
    }
    finally{
        client.quit();
    }
}

redisDataStruct();
