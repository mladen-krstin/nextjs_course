import { MongoClient, ServerApiVersion } from 'mongodb';

export async function connectDatabase() {
  const url = "mongodb+srv://korisnik:kupDmeGAR8J2FrFv@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority";
  // const client = new MongoClient(url);
  // await client.connect();
  // console.log('Connected successfully to server');

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  return client;
}

export async function insertDocument(client, collection, document) {
  const dbName = 'events';
  const result = await db.collection(collection).insertOne(document);
  const db = client.db(dbName);

  // client.connect(err => {
  //   const result = client.db(dbName).collection(collection);
  //   // perform actions on the collection object
  //   client.close();
  // });

  return result;
}