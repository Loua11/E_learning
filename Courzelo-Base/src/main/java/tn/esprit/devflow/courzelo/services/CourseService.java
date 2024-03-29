package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Comment;
import tn.esprit.devflow.courzelo.entity.Course;
import tn.esprit.devflow.courzelo.repository.CourseRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService  implements ICourseService{
    @Autowired
    CourseRepository courseRepository;
    @Override
    public List<Course> retrieveAllCourse() {
        return courseRepository.findAll();
    }

    @Override
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(String idCourse) {
courseRepository.deleteById(idCourse);
    }

    @Override
    public Course retrieveCourse(String idCourse) {
        Optional<Course> courseOptional = courseRepository.findById(idCourse);
        return courseOptional.get();
    }
}
