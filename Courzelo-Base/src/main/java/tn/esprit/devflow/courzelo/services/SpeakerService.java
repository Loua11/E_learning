package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Speaker;
import tn.esprit.devflow.courzelo.repository.SpeakerRepository;

import java.util.List;

@Service
public class SpeakerService implements ISpeakerService{

@Autowired
    SpeakerRepository speakerrepo;
    @Override
    public Speaker addSpeaker(Speaker s) {
        return speakerrepo.save(s);
    }

    @Override
    public List<Speaker> retrieveAllSpeakers() {
        return speakerrepo.findAll();
    }

    @Override
    public Speaker updateSpeaker(Speaker s, String idspeaker) {
        s.setIdspeaker(idspeaker);

        return speakerrepo.save(s);
    }

    @Override
    public void deleteSpeaker(String idspeaker) {
speakerrepo.deleteById(idspeaker);
    }

    @Override
    public Speaker retrieveSpeaker(String idspeaker ) {
        return speakerrepo.findById(idspeaker).get();
    }
}
