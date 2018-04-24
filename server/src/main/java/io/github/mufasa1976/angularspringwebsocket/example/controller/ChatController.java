package io.github.mufasa1976.angularspringwebsocket.example.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final SimpMessagingTemplate messageTemplate;

    @MessageMapping("/broadcast")
    public void broadcast(String message) {
        String formattedMessage =
                Optional.of(SecurityContextHolder.getContext())
                        .map(SecurityContext::getAuthentication)
                        .map(Authentication::getName)
                        .map(name -> String.format("Message from %s: %s", name, message))
                        .orElse(message);
        log.info("Broadcast Message: {}", formattedMessage);
        messageTemplate.convertAndSend("/websocket/topic/chat", formattedMessage);
    }

    @Scheduled(cron = "*/10 * * * * ?")
    public void sendPeriodicMessage() {
        // log.info("Sending periodic System Message");
        messageTemplate.convertAndSend("/websocket/topic/chat", "periodic message at " + LocalDateTime.now());
    }
}
