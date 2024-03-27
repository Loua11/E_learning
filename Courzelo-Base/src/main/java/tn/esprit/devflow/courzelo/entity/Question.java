package tn.esprit.devflow.courzelo.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)
public class Question {
    @Id
    String idquestion;
    String questionText;
    String correctanswer;
    List<String> options;
@DBRef
    Quiz quiz;

}
