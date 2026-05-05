export async function GET() {
  return new Response(
    "google.com, pub-2640922117245579, DIRECT, f08c47fec0942fa0",
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}