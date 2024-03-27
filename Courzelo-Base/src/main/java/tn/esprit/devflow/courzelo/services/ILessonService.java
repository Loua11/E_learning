package tn.esprit.devflow.courzelo.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Lesson;

import java.util.List;


public interface ILessonService{

    public List<Lesson> retrieveAllLesson();
    public Lesson addLesson(Lesson Lesson);
    public Lesson updateLesson(Lesson Lesson);
    public void deleteLesson(String idlesson);
    public Lesson retrieveLesson (String idlesson);





}
