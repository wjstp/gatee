package io.ssafy.gatee.config.restdocs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.util.StandardCharset;
import io.micrometer.core.instrument.util.IOUtils;
import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.security.application.AuthService;
import io.ssafy.gatee.global.security.config.SecurityConfig;
import io.ssafy.gatee.global.security.handler.CustomAccessDeniedHandler;
import io.ssafy.gatee.global.security.handler.CustomAuthenticationEntryPointHandler;
import io.ssafy.gatee.global.security.handler.CustomOAuth2FailureHandler;
import io.ssafy.gatee.global.security.handler.CustomOAuth2SuccessHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ResourceLoader;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.management.Attribute;
import java.io.IOException;

//@SpringBootTest
@AutoConfigureMockMvc
@WebMvcTest({SecurityConfig.class})
@Import({RestDocsConfiguration.class, SecurityConfig.class})
@ExtendWith(RestDocumentationExtension.class)
public class RestDocsTestSupport {

    @Autowired
    protected RestDocumentationResultHandler restDocs;

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected JwtService jwtService;

    @MockBean
    protected AuthService authService;

    @MockBean
    protected CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    @MockBean
    protected CustomOAuth2FailureHandler customOAuth2FailureHandler;

    @MockBean
    protected CustomAccessDeniedHandler customAccessDeniedHandler;

    @MockBean
    protected CustomAuthenticationEntryPointHandler customAuthenticationEntryPointHandler;

    protected static Attribute constraints( // contraints Attribute 간단하게 추가
                                            final String value) {
        return new Attribute("constraints", value);
    }

    @Autowired
    private ResourceLoader resourceLoader;

    @BeforeEach
    void setUp(
            final WebApplicationContext context,
            final RestDocumentationContextProvider provider
    ) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(MockMvcRestDocumentation.documentationConfiguration(provider))
                .alwaysDo(MockMvcResultHandlers.print())
                .alwaysDo(restDocs)
                .build();
    }

    protected String readJson(final String path) throws IOException {
        return IOUtils.toString(resourceLoader.getResource("classpath:"+path).getInputStream(), StandardCharset.UTF_8);
    }
}
