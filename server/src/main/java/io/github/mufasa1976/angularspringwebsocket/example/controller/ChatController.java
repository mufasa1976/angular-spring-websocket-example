package io.github.mufasa1976.angularspringwebsocket.example.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {
  private final SimpMessagingTemplate messageTemplate;

  @MessageMapping("/broadcast")
  public void broadcast(String message) {
    log.info("Broadcast Message: {}", message);
    messageTemplate.convertAndSend("/websocket/topic/chat", message);
  }

  @Scheduled(cron = "*/5 * * * * ?")
  public void sendPeriodicMessage() {
    log.info("Sending periodic System Message");
    messageTemplate.convertAndSend("/websocket/topic/chat", "periodic message");
  }
}
