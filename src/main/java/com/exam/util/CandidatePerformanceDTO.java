package com.exam.util;
import java.time.LocalDateTime;

public class CandidatePerformanceDTO {
 private String testTitle;
 private int score;
 private LocalDateTime completedAt;
 private int totalMarks;

 public CandidatePerformanceDTO(String testTitle, int score, LocalDateTime completedAt, int totalMarks) {
     this.testTitle = testTitle;
     this.score = score;
     this.completedAt = completedAt;
     this.totalMarks = totalMarks;
 }


 public String getTestTitle() {
     return testTitle;
 }

 public void setTestTitle(String testTitle) {
     this.testTitle = testTitle;
 }

 public int getScore() {
     return score;
 }

 public void setScore(int score) {
     this.score = score;
 }

 public LocalDateTime getCompletedAt() {
     return completedAt;
 }

 public void setCompletedAt(LocalDateTime completedAt) {
     this.completedAt = completedAt;
 }

 public int getTotalMarks() {
     return totalMarks;
 }

 public void setTotalMarks(int totalMarks) {
     this.totalMarks = totalMarks;
 }
}
