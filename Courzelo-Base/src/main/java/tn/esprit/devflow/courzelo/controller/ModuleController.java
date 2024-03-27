package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Module;
import tn.esprit.devflow.courzelo.services.IModuleService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ModuleController {
    @Autowired
    IModuleService moduleService;

    @PostMapping("/addModule")
    public Module addModule(@RequestBody Module l) {
        return moduleService.addModule(l);
    }

    @GetMapping("/retrieveallModule")
    @ResponseBody
    public List<Module> getModule() {

        List<Module> listModule = moduleService.retrieveAllModule();

        return listModule ;

    }
    @PutMapping("/updateModule/{idModule}")

    @ResponseBody
    public Module modifyModule(@RequestBody Module module) {

        return moduleService.updateModule(module);

    }
    @DeleteMapping("/DeleteModule/{idModule}")

    @ResponseBody

    public void deleteModule(@PathVariable String idModule) {

        moduleService.deleteModule(idModule);

    }

    @GetMapping("/retrieveModule/{Moduleid}")
    @ResponseBody

    public Module retrieveModule (@PathVariable ("Moduleid")String idModule) {
        return moduleService.retrieveModule(idModule);
    }

}
