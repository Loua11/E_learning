package tn.esprit.devflow.courzelo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import groovy.transform.AutoClone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Category;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Speaker;
import tn.esprit.devflow.courzelo.repository.EventRepository;
import tn.esprit.devflow.courzelo.services.IEventService;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {
    @Autowired
    IEventService eventserv;
    @Autowired
    EventRepository eventrepo;

    @PostMapping("/addEvent")
    public Event addEvent(@RequestBody Event e) {


        return eventserv.addEvent(e);
    }


    @GetMapping("/retrieveallevents")
    @ResponseBody
    public List<Event> getEvents() {

        List<Event> listevents = eventserv.retrieveAllEvents();

        return listevents;

    }

    @PutMapping("/updateEvent/{idevent}")
    @ResponseBody
    public Event modifyEvent(@RequestBody Event e) {

        return eventserv.updateEvent(e);

    }

    @DeleteMapping("/deleteEvent/{idevent}")
    @ResponseBody
    public void deleteEvent(@PathVariable String idevent) {
        eventserv.deleteEvent(idevent);

    }

    @GetMapping("/retrieveEvent/{idevent}")
    @ResponseBody

    public Event retrieveEvent(@PathVariable String idevent) {
        return eventserv.retrieveEvent(idevent);

    }
    @PostMapping("/addEventwithSpeaker/{name}")
    public Event addEventwithSpeaker(@RequestBody Event e, @PathVariable String name) {



        return eventserv.addEventWithSpeaker(e,name);
    }




}



