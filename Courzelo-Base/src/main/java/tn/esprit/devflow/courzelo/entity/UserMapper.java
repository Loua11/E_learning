package tn.esprit.devflow.courzelo.entity;

import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDTO toDTO(@NotNull User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setNom(user.getNom());
        userDTO.setPrenom(user.getPrenom());
        userDTO.setDateN(user.getDateN());
        userDTO.setCIN(user.getCIN());
        userDTO.setRole(user.getRole());
        userDTO.setEmail(user.getEmail());
        userDTO.setUsername(user.getUsername());
        return userDTO;
    }

    public User toEntity(@NotNull UserDTO userDTO) {
        User user = new User();
        user.setNom(userDTO.getNom());
        user.setPrenom(userDTO.getPrenom());
        user.setDateN(userDTO.getDateN());
        user.setCIN(userDTO.getCIN());
        user.setRole(userDTO.getRole());
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getUsername());
        return user;
    }
}
