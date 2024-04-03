package tn.esprit.devflow.courzelo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
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
    @Transient
     String givenAnswer;
    List<String> options;
    @JsonBackReference
@DBRef

    Quiz quiz;


}
