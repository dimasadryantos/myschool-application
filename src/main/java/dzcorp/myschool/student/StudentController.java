package dzcorp.myschool.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
@AllArgsConstructor
public class StudentController {


    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudent() {
        return studentService.getAllStudent();
    }


    @PostMapping
    public void addStudent(@Valid @RequestBody Student student) {
        studentService.saveStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId) {
        studentService.deleteStudent(studentId);
    }

}
