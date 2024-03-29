package tn.esprit.devflow.courzelo.entity;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Course {
    @Id
    String idCourse;
    @Size(max = 55)
     String title;
    String content;
    LocalDate datecourse;
    @DBRef
    List<Lesson> lessons;
    @DBRef
    List<Quiz> quizzes;

}
