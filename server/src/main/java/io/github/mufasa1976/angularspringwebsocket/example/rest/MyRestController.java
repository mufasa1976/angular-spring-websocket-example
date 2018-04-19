package io.github.mufasa1976.angularspringwebsocket.example.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import software.coolstuff.springframework.owncloud.service.api.OwncloudUserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MyRestController {
    private final OwncloudUserService userService;

    @GetMapping("/api/users")
    public List<String> doSomething() {
        return userService.findAll();
    }
}
