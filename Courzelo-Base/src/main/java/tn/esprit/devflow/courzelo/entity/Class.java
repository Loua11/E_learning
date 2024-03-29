package tn.esprit.devflow.courzelo.entity;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Class {
    @Id
     String idClass;
     int capacity;
    @Field("level")
     Level level;
    Integer progress;
    @DBRef
     User user;
    @DBRef
     Program program;
}
