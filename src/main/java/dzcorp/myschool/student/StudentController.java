package dzcorp.myschool.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudent() {
        return new ArrayList<>(
                Arrays.asList(new Student(1L, "dimas", "dimas@gmail.com", Gender.MALE),
                        new Student(2L, "diko", "diko@gmail.com", Gender.MALE)));
    }
}
