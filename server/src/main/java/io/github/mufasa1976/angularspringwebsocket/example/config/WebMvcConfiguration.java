package io.github.mufasa1976.angularspringwebsocket.example.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.filter.ForwardedHeaderFilter;
import org.springframework.web.servlet.config.annotation.*;

import javax.servlet.Filter;
import java.util.Collection;
import java.util.List;

@Configuration
@EnableWebMvc
@Slf4j
public class WebMvcConfiguration implements WebMvcConfigurer {
  private final static String WEBJARS = "classpath:/META-INF/resources/webjars/";
  private final static String ASSETS_SUB_FOLDER = "assets/";

  private final String prefix;
  private final Collection<HttpMessageConverter<?>> messageConverters;

  public WebMvcConfiguration(@Value("${spring.thymeleaf.prefix}") String prefix,
                             Collection<HttpMessageConverter<?>> messageConverters) {
    this.prefix = prefix;
    this.messageConverters = messageConverters;
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.setOrder(1);
    registry.addResourceHandler("/*.bundle.js", "/*.bundle.css", "/*.chunk.js")
            .addResourceLocations(prefix);
    registry.addResourceHandler("/*.bundle.js.map", "/*.bundle.css.map", "/*.chunk.js.map")
            .addResourceLocations(prefix);
    registry.addResourceHandler("/*.eot", "/*.svg", "/*.woff2", "/*.woff", "/*.ttf", "/*.ico")
            .addResourceLocations(prefix);
    registry.addResourceHandler("/assets/**")
            .addResourceLocations(prefix + ASSETS_SUB_FOLDER);
    registry.addResourceHandler("/webjars/**")
            .addResourceLocations(WEBJARS);
    registry.addResourceHandler("/swagger-ui.html")
            .addResourceLocations("swagger-ui.html");
  }

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.setOrder(2);
    registry.addViewController("/**").setViewName("index");
  }

  @Override
  public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
    configurer.defaultContentType(MediaType.APPLICATION_JSON_UTF8);
  }

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    converters.addAll(messageConverters);
  }

  @Bean
  public Filter forwardedHeaderFilter() {
    return new ForwardedHeaderFilter();
  }
}
