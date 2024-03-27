package tn.esprit.devflow.courzelo.entity;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;


import java.util.Date;
import java.util.List;
import java.util.Set;
@Getter
@Setter
@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class User {
    @Id
    String iduser;



    private String nom;


    private String prenom;

    private int CIN;


    private Date dateN;


    private String email;

    private String username;

    private String password;

    @Field("role")
    TypeRole role;

    @DBRef
    List<EventRegistration> eventregs;

    @DocumentReference(lazy = true, lookup = "{ 'user' : ?#{#self._id} }")
    @ReadOnlyProperty
    private Set<Claim> rec;


}
