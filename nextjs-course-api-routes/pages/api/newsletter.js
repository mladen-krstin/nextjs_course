import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const url = 'mongodb+srv://korisnik:kupDmeGAR8J2FrFv@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
  const client = await new MongoClient(url);

  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const dbName = 'events';

    async function main() {
      // Use connect method to connect to the server
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const collection = await db.collection('emails').insertOne({ email: userEmail });

      // the following code examples can be pasted here...

      return 'done.';
    }

    main()
      .then(console.log)
      .catch(console.error)
      .finally(() => client.close());
  }
  res.status(201).json({ message: 'Signed up!' });
};

export default handler;