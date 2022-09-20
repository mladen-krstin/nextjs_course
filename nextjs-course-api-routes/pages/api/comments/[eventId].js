import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const url = 'mongodb+srv://korisnik:kupDmeGAR8J2FrFv@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
  const client = await new MongoClient(url);

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
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

    console.log("new comment", newComment);

    const dbName = 'events';

    async function main() {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const result = await db.collection('comments').insertOne({ newComment });

      console.log(result);
      newComment.id = result.insertedId;

      res.status(201).json({ message: 'Added comment.', comment: newComment });
    }
    main()
      .then(console.log('Test'))
      .catch(console.error)
      .finally(() => client.close());
  }

  if (req.method === 'GET') {
    const dbName = 'events';

    await client.connect();
    const db = client.db(dbName);

    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();


    res.status(200).json({ comments: documents });
  }
  client.close();
}


export default handler;