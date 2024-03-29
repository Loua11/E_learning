package tn.esprit.devflow.courzelo.entity;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Data
@FieldDefaults(level= AccessLevel.PRIVATE)
@Document
public class Claim {
    @Id

    String idclaim;
    @Size(max = 55)
    String title;
    LocalDate dateclaim;
    @Field("typeclaim")
    TypeClaim typeclaim;
    @Field("status")
    Status status;
    @DocumentReference(lazy = true)
    User user;
}
