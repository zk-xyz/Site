import { AgentManager } from '@elizaos/agent';
import { Agent } from '@elizaos/core';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const { message } = await request.json();

  // Load the character file
  const characterFile = path.join(process.cwd(), 'characters', 'eliza.json');
  const characterData = JSON.parse(fs.readFileSync(characterFile, 'utf-8'));

  const manager = new AgentManager();
  const agent = new Agent(manager, characterData);

  const response = await agent.sendMessage(message);

  return new Response(JSON.stringify({ content: response }), { status: 200 });
}