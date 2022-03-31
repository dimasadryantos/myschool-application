package dzcorp.myschool.student;

import dzcorp.myschool.student.exception.BadRequestException;
import dzcorp.myschool.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {

    private final StudentRepository repository;


    public List<Student> getAllStudent() {
        return repository.findAll();
    }


    public void saveStudent(Student student) {
        boolean existEmail = repository.selectExistsEmail(student.getEmail());
        if (existEmail) {
            throw new BadRequestException("Email " + student.getEmail() + " taken");
        }
        repository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if (!repository.existsById(studentId)) {
            throw new StudentNotFoundException("Student does not exist");
        }
        repository.deleteById(studentId);
    }


}
