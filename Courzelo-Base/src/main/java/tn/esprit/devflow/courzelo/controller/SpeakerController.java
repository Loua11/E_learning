package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Speaker;
import tn.esprit.devflow.courzelo.services.ISpeakerService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SpeakerController {
@Autowired
ISpeakerService speakerser;
    @PostMapping("/addSpeaker")
    public Speaker addSpeaker(@RequestBody Speaker s) {
        return speakerser.addSpeaker(s);
    }

    @GetMapping("/retrieveallspeakers")
    @ResponseBody
    public List<Speaker> getSpeakers() {
return speakerser.retrieveAllSpeakers();


    }



    @DeleteMapping("/deleteSpeaker/{idspeaker}")
    @ResponseBody
    public void deleteSpeaker(@PathVariable String idspeaker) {
        speakerser.deleteSpeaker(idspeaker);
    }

    @PutMapping("/updateSpeaker/{idspeaker}")
    @ResponseBody
    public Speaker modifySpeaker(@RequestBody Speaker s, @PathVariable String idspeaker) {
        return speakerser.updateSpeaker(s, idspeaker);
    }
    @GetMapping("/retrieveSpeaker/{idspeaker}")
    @ResponseBody

    public Speaker retrieveEvent (@PathVariable String idspeaker) {
        return speakerser.retrieveSpeaker(idspeaker);

    }
}
