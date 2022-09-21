
export async function connectDatabase() {
  const url = 'mongodb+srv://korisnik:kupDmeGAR8J2FrFv@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  await client.connect();
  // console.log('Connected successfully to server');

  return client;
}

export async function insertDocument(client, collection, document) {
  const dbName = 'events';
  const db = client.db(dbName);
  const result = await db.collection(collection).insertOne(document);

  return result;
}