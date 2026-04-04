export const SOCKET_TUTORIAL = {
  intro: {
    title: 'Socket.io คืออะไร?',
    description:
      'Socket.io เป็น library สำหรับ real-time, bidirectional communication ระหว่าง client กับ server ทำงานผ่าน WebSocket protocol (fallback เป็น HTTP long-polling) เหมาะกับ use case ที่ต้องการข้อมูลแบบ real-time เช่น chat, live notifications, stock ticker, multiplayer game',
  },
  concepts: [
    {
      title: 'Namespace',
      description: 'แยก connection เป็นกลุ่ม เช่น /chat, /stock, /quiz — แต่ละ namespace มี event space แยกกัน',
    },
    {
      title: 'Events',
      description: 'สื่อสารผ่าน event name เช่น emit("chat:send_message") → on("chat:message") — ทั้ง client และ server ใช้ pattern เดียวกัน',
    },
    {
      title: 'Rooms',
      description: 'Server จัดกลุ่ม socket เข้า room → broadcast ไปเฉพาะคนใน room เช่น chat room, quiz room',
    },
  ],
  codeSnippets: {
    useSocket: `import { useSocket } from '@/hooks/useSocket';
import { SOCKET_NAMESPACE } from '@/constants/socket.constant';

function MyComponent() {
  const { getSocket, isConnected } = useSocket(SOCKET_NAMESPACE.CHAT);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // Listen for events
    socket.on('chat:message', (data) => {
      console.log('New message:', data);
    });

    // Emit events
    socket.emit('chat:send_message', {
      roomId: 'test-room',
      content: 'Hello!',
    });

    return () => {
      socket.off('chat:message');
    };
  }, [getSocket, isConnected]);
}`,
    backendGateway: `// NestJS Gateway (thin layer — like Controller)
@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway {
  @SubscribeMessage('chat:send_message')
  handleSendMessage(
    @MessageBody() payload: SendMessagePayload,
    @ConnectedSocket() client: Socket,
  ) {
    // Delegate to service
    const message = this.chatService.createMessage(...);
    // Broadcast to room
    this.server.to(roomId).emit('chat:message', message);
  }
}`,
    architecture: `// Architecture Pattern
// ┌──────────────┐      WebSocket       ┌──────────────────┐
// │   Frontend   │ ◄──────────────────► │     Backend      │
// │              │                      │                  │
// │  useSocket() │  emit/on events      │  Gateway (thin)  │
// │  hook        │ ◄──────────────────► │    ↓             │
// │              │                      │  Service (logic) │
// └──────────────┘                      └──────────────────┘
//
// Frontend: useSocket hook → connect namespace → emit/listen events
// Backend:  Gateway (receive events) → Service (business logic) → emit back`,
  },
} as const;
