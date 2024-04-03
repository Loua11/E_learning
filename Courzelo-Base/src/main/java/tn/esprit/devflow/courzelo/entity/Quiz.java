package tn.esprit.devflow.courzelo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Duration;
import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)


public class Quiz {
    @Id
    String idquiz;
    @Size(max = 55)
    String description;
    int  duration;
    int maxScore ;
    @JsonManagedReference


    @DBRef
    List<Question> questions ;

}
