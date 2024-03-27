package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Comment;
import tn.esprit.devflow.courzelo.entity.Course;

import java.util.List;

public interface ICourseService {

    public List<Course> retrieveAllCourse();
    public Course addCourse(Course course);
    public Course updateCourse(Course course);
    public void deleteCourse(String idCourse);
    public Course retrieveCourse (String idCourse);
}
