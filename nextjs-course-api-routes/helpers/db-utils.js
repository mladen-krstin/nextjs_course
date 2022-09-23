<<<<<<< HEAD
import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const url = "mongodb+srv://korisnik:kupDmeGAR8J2FrFv@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(url);

=======

export async function connectDatabase() {
  const url = 'mongodb+srv://korisnik:kupDmeGAR8J2FrFv@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  await client.connect();
  // console.log('Connected successfully to server');

>>>>>>> parent of a7ed48de (popravljen kod u newsletter.js)
  return client;
}

export async function insertDocument(client, collection, document) {
  const dbName = 'events';
  const db = client.db(dbName);
<<<<<<< HEAD
=======
  const result = await db.collection(collection).insertOne(document);
>>>>>>> parent of a7ed48de (popravljen kod u newsletter.js)

  return result;
}