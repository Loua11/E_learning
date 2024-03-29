package tn.esprit.devflow.courzelo.services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Category;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Event;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface IEventService {
    public Event addEvent( Event e);

    public List<Event> retrieveAllEvents();
    public Event updateEvent(Event e );
    public void deleteEvent(String idevent);
    public Event retrieveEvent (String idevent);
    public Event uploadPhoto(MultipartFile file, String title) ;

    }
