package io.ssafy.gatee.config.restdocs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.util.StandardCharset;
import io.micrometer.core.instrument.util.IOUtils;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.file.application.FileService;
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
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.management.Attribute;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.util.List;

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
    protected FileService fileService;

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

    protected MockHttpServletRequestBuilder createMultiPartRequest(
            MockMultipartHttpServletRequestBuilder multipartRequest,
            FamilySaveReq familySaveReq,
            MockMultipartFile multipartFile
    ){
        //Request에 MockFile 먼저 추가
        multipartRequest.file(multipartFile);

        //Request에 DTO의 모든 속성,값 정보 추가
        final PropertyDescriptor[] getterDescriptors = ReflectUtils.getBeanGetters(FamilySaveReq.class);

        for(PropertyDescriptor pd : getterDescriptors){
            try{
                if (!pd.getName().equals("file")) {
                    //파라미터로 전달한 인스턴스에 대해 getter함수를 호출한 값 얻어옴
                    String value = String.valueOf(pd.getReadMethod().invoke(familySaveReq));

                    if(!value.equals("null")){
                        multipartRequest.param(pd.getName(), value);
                    }
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return multipartRequest;
    }
}
