package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Comment;
import tn.esprit.devflow.courzelo.entity.Course;
import tn.esprit.devflow.courzelo.services.ICourseService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {
    @Autowired
    ICourseService courseService;

    @PostMapping("/addCourse")
    public Course addCourse(@RequestBody Course c) {
        return courseService.addCourse(c);
    }

    @GetMapping("/retrieveallCourse")
    @ResponseBody
    public List<Course> getCourse() {

        List<Course> listCourse = courseService.retrieveAllCourse();

        return listCourse ;

    }
    @PutMapping("/updateCourse/{idCourse}")

    @ResponseBody
    public Course modifyCourse(@RequestBody Course c) {

        return courseService.updateCourse(c);

    }
    @DeleteMapping("/DeleteCourse/{idCourse}")

    @ResponseBody

    public void deleteCourse(@PathVariable String idCourse) {

        courseService.deleteCourse(idCourse);

    }

    @GetMapping("/retrieveCourse/{courseid}")
    @ResponseBody

    public Course retrieveCourse (@PathVariable ("courseid")String idCourse) {
        return courseService.retrieveCourse(idCourse);
    }

}
