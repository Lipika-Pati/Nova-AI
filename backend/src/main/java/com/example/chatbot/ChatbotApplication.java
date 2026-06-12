package com.example.chatbot;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChatbotApplication {

    public static void main(String[] args) {

        String apiKey = System.getenv("OPENAI_API_KEY");

        OpenAIClient client = OpenAIOkHttpClient.builder()
                .apiKey(apiKey)
                .build();

        ResponseCreateParams params = ResponseCreateParams.builder()
                .input("Say this is a test")
                .model("gpt-5.4")
                .build();

        Response response = client.responses().create(params);
        System.out.println(response.output());

        SpringApplication.run(ChatbotApplication.class, args);
    }
}