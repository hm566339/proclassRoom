package com.proclassroom.proclassroom.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ComparisonResult {
    private String pdf1;
    private String pdf2;
    private int similarParagraphs;
    private double similarityPercentPdf1;
    private double similarityPercentPdf2;
}
