package com.example.chatbot.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ChatController {

    String apiKey = System.getenv("OPENAI_API_KEY");

        OpenAIClient client = OpenAIOkHttpClient.builder()
                .apiKey(apiKey)
                .build();
    @GetMapping("/chat")
    public String chat(@RequestParam String message) {

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

        RestTemplate restTemplate = new RestTemplate();

        // ✅ Proper JSON structure
        Map<String, Object> text = new HashMap<>();
        text.put("text", message);

        Map<String, Object> part = new HashMap<>();
        part.put("parts", List.of(text));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(part));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            Map body = response.getBody();

            List<Map> candidates = (List<Map>) body.get("candidates");
            Map content = (Map) candidates.get(0).get("content");
            List<Map> parts = (List<Map>) content.get("parts");

            return parts.get(0).get("text").toString();

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}