package com.spotly.backend.security;

import com.spotly.backend.domain.User;
import com.spotly.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
public class CustomOAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final String frontendRedirectUrl;


    public CustomOAuth2LoginSuccessHandler(UserRepository userRepository,
                                           JwtService jwtService,
                                           PasswordEncoder passwordEncoder,
                                           @Value("${frontend.redirect.url}") String frontendRedirectUrl) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.frontendRedirectUrl = frontendRedirectUrl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");

        Optional<User> userOptional = userRepository.findByEmail(email);

        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            User newUser = new User();
            newUser.setEmail(email);

            String dummyPassword = UUID.randomUUID().toString();
            newUser.setPassword(passwordEncoder.encode(dummyPassword));
            
            user = userRepository.save(newUser);
        }

        String ourJwtToken = jwtService.generateToken(user.getEmail());
        String targetUrl = UriComponentsBuilder.fromUriString(frontendRedirectUrl)
                .queryParam("token", ourJwtToken)
                .build().toUriString();

        response.sendRedirect(targetUrl);
    }
}