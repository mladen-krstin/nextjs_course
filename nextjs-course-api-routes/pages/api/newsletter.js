import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const url = 'mongodb+srv://projectUser:4K7X3VPlE9adSGVz@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(url);

    const dbName = 'events';

    async function main() {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      await db.collection('newsletter').insertOne({ email: userEmail });

      return res.status(201).json({ message: 'Signed up!' });
    }

    main()
      .then(console.log(userEmail))
      .catch(console.error)
      .finally(() => client.close());
  };
}

export default handler;