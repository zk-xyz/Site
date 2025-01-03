import ElizaChat from '@/components/ElizaChat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">ELIZA Therapeutic Chat</h1>
        <ElizaChat />
      </div>
    </main>
  )
}