package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Speaker;

import java.util.List;

public interface ISpeakerService {
    Speaker addSpeaker (Speaker s);
    public List<Speaker> retrieveAllSpeakers();
    public Speaker updateSpeaker(Speaker s,String idspeaker );
    public void deleteSpeaker(String idspeaker);
    public Speaker retrieveSpeaker (String idspeaker);
}
