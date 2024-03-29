package tn.esprit.devflow.courzelo.entity;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Lesson {
    @Id
    String idlesson;
    @Size(max = 55)
    String title;
    String content;

   
    // Vous pouvez également conserver le constructeur avec le paramètre content si nécessaire
    public Lesson(String content) {
        this.content = content;
    }


    @DBRef
    Course course;
}
