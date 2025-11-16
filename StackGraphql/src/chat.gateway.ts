import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
@WebSocketGateway()
export class ChatGateWay {
  @WebSocketServer()
  server;

  @SubscribeMessage("message")
  handleMessage(@MessageBody() message: string): void {
    this.server.emit("message", message);
  }
}
