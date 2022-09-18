import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const url = 'mongodb+srv://projectUser:4K7X3VPlE9adSGVz@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
  const client = await new MongoClient(url);

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId
    };

    const dbName = 'events';

    async function main() {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const result = await db.collection('comments').insertOne({ newComment });

      console.log(result);

      res.status(201).json({ message: 'Added comment.', comment: newComment });
    }
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Max', text: 'A first comment!' },
      { id: 'c2', name: 'Manuel', text: 'A second comment!' },
    ];

    res.status(200).json({ comments: dummyList });
  }

  // main()
  //   .then(console.log(userEmail))
  //   .catch(console.error)
  //   .finally(() => client.close());
}


export default handler;