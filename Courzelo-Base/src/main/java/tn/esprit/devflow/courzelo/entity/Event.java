package tn.esprit.devflow.courzelo.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Event {

    @Id
    String idevent;
    @Size(max = 55)
    String title;
    String photo;
    int maxcapacity;
    String duration;
   LocalDate debutdate;
   Boolean price;
    @Field("category")
    Category category;
    @DBRef
    List<EventRegistration> eventRegs;
    @DBRef
    @JsonIgnore
    Speaker speaker;



}
