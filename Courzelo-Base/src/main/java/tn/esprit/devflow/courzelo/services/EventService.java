package tn.esprit.devflow.courzelo.services;

import io.swagger.v3.oas.annotations.servers.Server;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Category;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Speaker;
import tn.esprit.devflow.courzelo.repository.EventRepository;
import tn.esprit.devflow.courzelo.repository.SpeakerRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.*;

@Service
public class EventService implements IEventService {
@Autowired
    EventRepository eventrepo;
    @Autowired
    SpeakerRepository speakerrepo;
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


@Override
public Event addEventWithSpeaker(Event event, String name) {

        Speaker speaker = speakerrepo.findSpeakerByName(name);

        // Associer l'Event au Speaker
        event.setSpeaker(speaker);


        // Ajouter l'événement à la liste des événements du speaker et sauvegarder
        if (speaker.getEvents() == null) {
            speaker.setEvents(new ArrayList<>());
        }
        speaker.getEvents().add(event);
        return eventrepo.save(event);


    }




    }


