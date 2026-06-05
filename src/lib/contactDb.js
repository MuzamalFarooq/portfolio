import clientPromise, {
  DB_NAME,
  CONTACT_COLLECTION,
} from "@/lib/mongodb";

export async function saveContactMessage({ name, email, message }) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(CONTACT_COLLECTION);

  const document = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    createdAt: new Date(),
    read: false,
  };

  const result = await collection.insertOne(document);
  return { id: result.insertedId, ...document };
}
