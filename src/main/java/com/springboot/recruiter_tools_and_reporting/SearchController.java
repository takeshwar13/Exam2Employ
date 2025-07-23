package com.springboot.recruiter_tools_and_reporting;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/candidates")
public class SearchController {

    @Autowired
    private CandidateCSVReader csvReader;

    @GetMapping("/search")
    public List<Candidate> searchCandidates(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String testName
    ) {
        return csvReader.readCandidates().stream()
                .filter(c -> name == null || c.getName().toLowerCase().contains(name.toLowerCase()))
                .filter(c -> email == null || c.getEmail().equalsIgnoreCase(email))
                .filter(c -> skill == null || c.getSkills().toLowerCase().contains(skill.toLowerCase()))
                .filter(c -> status == null || c.getStatus().equalsIgnoreCase(status))
                .filter(c -> testName == null || c.getTestName().equalsIgnoreCase(testName))
                .collect(Collectors.toList());
    }
}
