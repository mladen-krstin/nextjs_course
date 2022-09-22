import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const url = "mongodb+srv://korisnik:kupDmeGAR8J2FrFv@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(url);

  return client;
}

export async function insertDocument(client, collection, document) {
  const dbName = 'events';
  const result = await db.collection(collection).insertOne(document);
  const db = client.db(dbName);

  return result;
}