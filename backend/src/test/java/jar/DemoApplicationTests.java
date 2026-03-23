package jar;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.hrms.DemoApplication;

@SpringBootTest(classes = DemoApplication.class)
@Disabled("Requires database configuration in application.properties")
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

}
