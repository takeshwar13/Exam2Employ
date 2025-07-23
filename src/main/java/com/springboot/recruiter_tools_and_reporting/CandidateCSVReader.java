package com.springboot.recruiter_tools_and_reporting;

import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.util.List;

@Component
public class CandidateCSVReader {

    private static final String CSV_FILE_PATH = "dummy_test_data.csv";

    public List<Candidate> readCandidates() {
        try {
            return new CsvToBeanBuilder<Candidate>(new FileReader(CSV_FILE_PATH))
                    .withType(Candidate.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }
}
