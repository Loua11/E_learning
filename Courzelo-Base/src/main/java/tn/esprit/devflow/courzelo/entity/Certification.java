package tn.esprit.devflow.courzelo.entity;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.Date;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Certification {
    @Id
    String idCertif;
    @Size(max = 55)
    String title;
    LocalDate issueDate;
    LocalDate expirationDate;
    @Size(max = 255)
    String description;







}
