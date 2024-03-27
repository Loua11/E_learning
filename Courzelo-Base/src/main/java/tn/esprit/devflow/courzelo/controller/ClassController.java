package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.services.IClassService;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class ClassController {
    @Autowired
    IClassService classService;
    @PostMapping("/addClass")
    public Class addClass(@RequestBody Class c) {
        return classService.addClass(c);
    }

    @GetMapping("/retrieveallclass")
    @ResponseBody
    public List<Class> getClasse() {

        List<Class> listClass = classService.retrieveAllClass();

        return listClass ;

    }

    @PutMapping("/updateclass/{idClass}")

    @ResponseBody
    public Class modifyClasse(@RequestBody Class c) {

        return classService.updateClass(c);

    }

    @DeleteMapping("/DeleteClasse/{idClass}")

    @ResponseBody

    public void deleteClass(@PathVariable String idClass) {

        classService.deleteClass(idClass);

    }

    @GetMapping("/retrieveClass/{classid}")
    @ResponseBody

    public Class retrieveClass (@PathVariable ("classid")String idClass) {
        return classService.retrieveClass(idClass);
    }

}
