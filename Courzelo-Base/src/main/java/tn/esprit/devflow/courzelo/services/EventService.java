package tn.esprit.devflow.courzelo.services;

import io.swagger.v3.oas.annotations.servers.Server;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Category;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.repository.EventRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventService implements IEventService {
@Autowired
    EventRepository eventrepo;
    @Autowired
    private Environment env;
    @Override
    public Event addEvent(  Event e){



        return eventrepo.save(e);

        }



    @Override
    public List<Event> retrieveAllEvents() {
        return eventrepo.findAll();
    }

    @Override
    public Event updateEvent(Event e) {


     return eventrepo.save(e);

    }

    @Override
    public void deleteEvent(String idevent) {
        eventrepo.deleteById(idevent);
    }

    @Override
    public Event retrieveEvent( String idevent) {
        Event e =eventrepo.findById(idevent).get();
        return  e;

    }

    public Event uploadPhoto(MultipartFile file, String title) {
        try {
            // Normalize file name
            String photo = StringUtils.cleanPath(file.getOriginalFilename());
            Path fileStorageLocation = Paths.get(env.getProperty("file.upload-dir"))
                    .toAbsolutePath().normalize();
            Path targetLocation = fileStorageLocation.resolve(photo);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Créer une nouvelle leçon avec le contenu du fichier et le titre, puis sauvegarder dans la base de données
            Event e = new Event(photo);
            e.setTitle(title);  // Ajoutez cette ligne pour mettre à jour le titre
            return eventrepo.save(e);
        } catch (Exception ex) {
            System.out.println("Exception: " + ex.getMessage());
            ex.printStackTrace();
            return null;
        }
    }


}
