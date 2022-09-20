import { MongoClient } from 'mongodb';

async function connectDatabase() {
  const url = 'mongodb+srv://korisnik:kupDmeGAR8J2FrFv@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected successfully to server');

  return client;
}

async function insertDocument(client, document) {
  const dbName = 'events';
  const db = client.db(dbName);
  await db.collection('newsletter').insertOne(document);
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connection to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting base failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });

  };
}

export default handler;