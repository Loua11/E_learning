package tn.esprit.devflow.courzelo.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document
public class UserDTO {

    private String nom;
    private String prenom;
    private int CIN;
    private Date dateN;
    private String email;
    private String username;
    private String password;
    private TypeRole Role;

}