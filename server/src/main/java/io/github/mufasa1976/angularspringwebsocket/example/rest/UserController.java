package io.github.mufasa1976.angularspringwebsocket.example.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import software.coolstuff.springframework.owncloud.model.OwncloudUserDetails;
import software.coolstuff.springframework.owncloud.service.api.OwncloudUserService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {
  private final OwncloudUserService userService;

  @GetMapping("/api/login")
  public ResponseEntity<OwncloudUserDetails> login() {
    return Optional.of(SecurityContextHolder.getContext())
                   .map(SecurityContext::getAuthentication)
                   .map(Authentication::getName)
                   .flatMap(userService::findOne)
                   .map(ResponseEntity::ok)
                   .orElseGet(ResponseEntity.notFound()::build);
  }

  @RequestMapping(path = "/api/logout", method = RequestMethod.HEAD)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void logout(HttpServletRequest request) throws ServletException {
    request.logout();
  }
}
